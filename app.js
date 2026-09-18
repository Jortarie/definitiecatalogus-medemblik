/* ====================================================================
   CSV-PARSER + CEL-DECODE
   Zelfde, eenvoudige aanpak als de vorige stap: \n-letterlijk voor
   meerregelige tekst, enkele-quote-JSON voor structuurvelden.
   ==================================================================== */
function parseCSV(text) {
  if (!text) return [];
  const rows = [];
  let row = [], field = '', inQuotes = false;
  let i = 0;
  const len = text.length;
  while (i < len) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i += 1; continue;
      }
      field += ch; i += 1; continue;
    }
    if (ch === '"') { inQuotes = true; i += 1; continue; }
    if (ch === ',') { row.push(field); field = ''; i += 1; continue; }
    if (ch === '\r') {
      if (text[i + 1] === '\n') i += 1;
      row.push(field); rows.push(row); row = []; field = ''; i += 1; continue;
    }
    if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; i += 1; continue; }
    field += ch; i += 1;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter(r => !(r.length === 1 && r[0] === ''));
}

function parseCSVToRecords(text) {
  const rows = parseCSV(text);
  if (rows.length === 0) return [];
  const header = rows[0];
  const records = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const rec = {};
    for (let c = 0; c < header.length; c++) rec[header[c]] = row[c] !== undefined ? row[c] : '';
    records.push(rec);
  }
  return records;
}

function decodeText(value) {
  if (value == null) return '';
  return String(value).split('\\n').join('\n');
}

function decodeJsonField(value, fallback) {
  const v = (value || '').trim();
  if (!v) return fallback;
  try { return JSON.parse(v.replace(/'/g, '"')); }
  catch (err) { console.warn('JSON-veld kon niet gelezen worden:', value, err.message); return fallback; }
}

/* ====================================================================
   SHEETS-URLS — vul hier de gepubliceerde CSV-links van de 3 tabs in.
   ==================================================================== */
const SHEET_URLS = {
  definities: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqtLb8sAkrRePaCRjZSMVrqvC_lB3CEkUJ6S1MnfIFdzH-L7ABkSNAPuOaglIzR3mMVgABiAoBjIej/pub?gid=1044637075&single=true&output=csv',
  datavelden: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqtLb8sAkrRePaCRjZSMVrqvC_lB3CEkUJ6S1MnfIFdzH-L7ABkSNAPuOaglIzR3mMVgABiAoBjIej/pub?gid=1189154651&single=true&output=csv',
  dashboards: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqtLb8sAkrRePaCRjZSMVrqvC_lB3CEkUJ6S1MnfIFdzH-L7ABkSNAPuOaglIzR3mMVgABiAoBjIej/pub?gid=1394577148&single=true&output=csv',
  processen: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqtLb8sAkrRePaCRjZSMVrqvC_lB3CEkUJ6S1MnfIFdzH-L7ABkSNAPuOaglIzR3mMVgABiAoBjIej/pub?gid=269674294&single=true&output=csv',
  // Nieuw tabblad "processen_mc" — MensCentraal-processen (één rij per vraag).
  // Publiceer het tabblad als CSV (Bestand → Delen → Publiceren op web) en
  // plak hier de URL met de juiste gid. Leeg = tab wordt stil overgeslagen.
  processen_mc: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqtLb8sAkrRePaCRjZSMVrqvC_lB3CEkUJ6S1MnfIFdzH-L7ABkSNAPuOaglIzR3mMVgABiAoBjIej/pub?gid=182487918&single=true&output=csv',
};

/* ====================================================================
   STATE
   ==================================================================== */
let entries = [];     // definities
let dvEntries = [];   // datavelden
let dashEntries = []; // dashboards
let procEntries = []; // processen: [{ id, naam, team, desc, steps: [{stapNr, stapNaam, stapDesc, volgendeStap, volgendeLabel}] }]
let currentId = null;
let currentDvId = null;
let currentDashId = null;
let currentProcId = null;
const issues = []; // {dataset, message}

/* ====================================================================
   KLEUREN — overgenomen uit de oorspronkelijke app.js COLOR_MAP /
   DEFAULT_CATS / DEFAULT_STATUSES, zodat dezelfde visuele taal
   behouden blijft.
   ==================================================================== */
const COLOR_MAP = {
  blue:   {bg:'#E6F1FB', color:'#185FA5'},
  green:  {bg:'#E1F5EE', color:'#0B6E49'},
  purple: {bg:'#EDE9FC', color:'#534AB7'},
  orange: {bg:'#FFF0E6', color:'#993C1D'},
  teal:   {bg:'#E0F7F9', color:'#0C6E78'},
  red:    {bg:'#FAECE7', color:'#993C1D'},
  gray:   {bg:'#F2F5F9', color:'#4A6180'},
};
const STATUS_BADGE_CLASS = {
  'Vastgesteld': 'bdg-vastgesteld',
  'Definitie en context controleren': 'bdg-review',
  'Data velden zoeken': 'bdg-concept',
  'Vervallen': 'bdg-vervallen',
};

/* Categorie krijgt bewust geen eigen kleur per categorie meer (dat was
   voorbehouden aan Status) — één neutrale grijze pill voor elke
   categorie, puur als label. */
function catPillHtml(cat) {
  if (!cat) return '<span class="bdg bdg-leeg">—</span>';
  const c = COLOR_MAP.gray;
  return `<span class="cat-pill" style="background:${c.bg};color:${c.color};">${escHtml(cat)}</span>`;
}
function statusBadgeHtml(status) {
  if (!status) return '<span class="bdg bdg-leeg">—</span>';
  const cls = STATUS_BADGE_CLASS[status] || 'bdg-leeg';
  return `<span class="bdg ${cls}">${escHtml(status)}</span>`;
}
function escHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

/* Escapet de tekst en markeert alle voorkomens van de zoekterm met
   <mark class="hl"> (lichtblauwe arcering). Escaping gebeurt per
   tekstdeel, dus de zoekterm kan nooit HTML injecteren. */
function hlHtml(str, q) {
  const s = String(str || '');
  q = (q || '').trim();
  if (!q) return escHtml(s);
  const lower = s.toLowerCase(), ql = q.toLowerCase();
  let out = '', i = 0;
  while (true) {
    const idx = lower.indexOf(ql, i);
    if (idx < 0) { out += escHtml(s.slice(i)); break; }
    out += escHtml(s.slice(i, idx)) + '<mark class="hl">' + escHtml(s.slice(idx, idx + q.length)) + '</mark>';
    i = idx + q.length;
  }
  return out;
}

/* ====================================================================
   DATA LADEN — fetch per dataset, valideren/decoderen, fallback bij
   falen. Eén centrale notifyDataLoaded() na alle 3 (voorkomt de oude
   render-timing-bug).
   ==================================================================== */
async function fetchAndMap(url, mapFn) {
  if (!url) return { rows: [], rowIssues: ['Geen Sheets-URL geconfigureerd.'] };
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const records = parseCSVToRecords(text);
    return mapFn(records);
  } catch (err) {
    console.error('Laden mislukt:', url, err);
    return { rows: [], rowIssues: [`Kon niet laden uit Sheets: ${err.message}`] };
  }
}

function mapDefinitiesRows(records) {
  const rows = [], rowIssues = [], seen = new Set();
  const VELD_KOLOMMEN = ['Veld1', 'Veld2', 'Veld3', 'Veld4', 'Veld5', 'Veld6', 'Veld7', 'Veld8'];
  for (const r of records) {
    const id = (r.id || '').trim();
    if (!id) { rowIssues.push(`Rij zonder id overgeslagen (term: "${r.Term || '?'}")`); continue; }
    if (seen.has(id)) { rowIssues.push(`Dubbele id "${id}" overgeslagen`); continue; }
    seen.add(id);

    // Veld1...Veld8: elke cel bevat "DF-xxx" of "DF-xxx — leesbare naam".
    // We bewaren hier alleen het ruwe DF-id; de daadwerkelijke naam/tabel
    // wordt later (na het laden van Datavelden) opgezocht in resolveFieldChips,
    // zodat de weergave altijd de actuele Datavelden-naam toont, ook als
    // iemand die later wijzigt zonder de definitie-rij aan te passen.
    const veldIds = VELD_KOLOMMEN
      .map(k => (r[k] || '').trim())
      .filter(Boolean)
      .map(v => v.split('—')[0].split('-').slice(0, 2).join('-').trim()) // pak "DF-123" uit "DF-123 — naam" of gewoon "DF-123"
      .filter(v => /^DF-\d+$/i.test(v));

    rows.push({
      id, term: r.Term || '', def: decodeText(r.Definitie), ctx: decodeText(r.Businesscontext),
      fields: '', cat: (r.Categorie || '').trim(), team: (r.Team || '').trim(),
      status: (r.Status || '').trim(), date: r.date || '', notes: decodeText(r.Notes),
      veldIds, fieldChips: [], fieldsFull: decodeText(r['Velden en berekenignen']),
      source: r.Source || '', changelog: decodeJsonField(r.Wijzigingshistorie, []),
      image: (r.Afbeelding || '').trim(),
      // Optionele kolom "Uitsplitsingen" (;-gescheiden, bijv. "team;wet"):
      // nog niet gebruikt in de huidige weergave, maar blijft
      // meegelezen zodat een toekomstige uitsplitsing er zo bij kan.
      dimensies: (r.Uitsplitsingen || '').split(';').map(s => s.trim().toLowerCase()).filter(Boolean),
    });
  }
  return { rows, rowIssues };
}

/* Zet de ruwe veldIds (DF-nummers) van elke definitie om naar volledige
   chip-objecten ({type, label}) door ze op te zoeken in de geladen
   Datavelden-lijst. Wordt aangeroepen NA het laden van beide datasets
   (zie loadAllData), zodat de naam/tabel altijd de actuele Datavelden-
   waarde toont. Een DF-id dat niet (meer) bestaat in Datavelden wordt
   overgeslagen en gelogd -- net als overal elders: nooit de hele rij
   laten verdwijnen om één kapotte verwijzing. */
function resolveFieldChips(defRows, dvRows, rowIssuesOut) {
  const dvById = new Map(dvRows.map(d => [d.id, d]));
  for (const def of defRows) {
    const chips = [];
    for (const veldId of def.veldIds || []) {
      const dv = dvById.get(veldId);
      if (!dv) {
        rowIssuesOut.push(`Definitie "${def.id}" verwijst naar "${veldId}", maar dat bestaat niet (meer) in Datavelden.`);
        continue;
      }
      chips.push({ type: 'catalog', id: dv.id, label: `${dv.src ? dv.src + '.' : ''}${dv.col || dv.name}` });
    }
    def.fieldChips = chips;
  }
}

function mapDataveldenRows(records) {
  const rows = [], rowIssues = [], seen = new Set();
  for (const r of records) {
    const id = (r.id || '').trim();
    if (!id) { rowIssues.push(`Rij zonder id overgeslagen (name: "${r.Naam || '?'}")`); continue; }
    if (seen.has(id)) { rowIssues.push(`Dubbele id "${id}" overgeslagen (eerdere rij blijft staan)`); continue; }
    seen.add(id);
    rows.push({
      id, name: r.Naam || '', desc: decodeText(r.Beschrijving), type: (r.Type || '').trim(),
      src: r.Tabel || '', col: r.Dataveld || '', values: decodeText(r.values), ext: '',
    });
  }
  return { rows, rowIssues };
}

function mapDashboardsRows(records) {
  const rows = [], rowIssues = [], seen = new Set();
  for (const r of records) {
    const id = (r.id || '').trim();
    if (!id) { rowIssues.push(`Rij zonder id overgeslagen (name: "${r.Naam || '?'}")`); continue; }
    if (seen.has(id)) { rowIssues.push(`Dubbele id "${id}" overgeslagen`); continue; }
    seen.add(id);
    rows.push({
      id, name: r.Naam || '', type: (r.type || '').trim(), desc: decodeText(r.Beschrijving),
      loc: r.Locatie || '', team: (r.team || '').trim(), link: r.link || '', updated: r.updated || '',
      // Optionele kolom "Begrippen" (;-gescheiden D-ids, bijv. "D-001;D-014"):
      // welke definities dit dashboard al toont.
      dekt: (r.Begrippen || '').split(';').map(s => s.trim().toUpperCase()).filter(Boolean),
    });
  }
  return { rows, rowIssues };
}

/* processen: elke CSV-rij is ÉÉN STAP, niet één proces. Rijen met
   hetzelfde procId worden hier samengevoegd tot één proces-object
   met een steps-array. Dit houdt het Sheets-format plat (gewone
   rijen, geen geneste JSON nodig) terwijl de HTML er zelf een figuur
   uit tekent (zie layout/render-functies hieronder). */
function mapProcessenRows(records) {
  const rowIssues = [];
  const byProc = new Map(); // procId -> { id, naam, team, desc, steps: [] }

  records.forEach((r, idx) => {
    const procId = (r.procId || '').trim();
    const stapNrRaw = (r.stapNr || '').trim();
    if (!procId) { rowIssues.push(`Rij ${idx + 1} zonder procId overgeslagen`); return; }
    const stapNr = parseInt(stapNrRaw, 10);
    if (!stapNrRaw || Number.isNaN(stapNr)) {
      rowIssues.push(`Rij ${idx + 1} (proces "${procId}") heeft geen geldig stapNr, overgeslagen`);
      return;
    }

    if (!byProc.has(procId)) {
      byProc.set(procId, {
        id: procId,
        naam: r.procNaam || procId,
        team: (r.procTeam || '').trim(),
        desc: decodeText(r.procDesc),
        type: 'normaal',
        steps: [],
      });
    }
    const proc = byProc.get(procId);

    const volgendeStap = (r.volgendeStap || '').trim()
      ? r.volgendeStap.trim().split(';').map(s => parseInt(s.trim(), 10)).filter(n => !Number.isNaN(n))
      : [];
    const volgendeLabel = (r.volgendeLabel || '').trim()
      ? r.volgendeLabel.trim().split(';').map(s => s.trim())
      : [];

    // Dubbele stapNr binnen hetzelfde proces is een datafout (net als
    // dubbele id's bij de andere datasets) — eerste blijft staan.
    if (proc.steps.some(s => s.stapNr === stapNr)) {
      rowIssues.push(`Proces "${procId}" heeft stapNr ${stapNr} dubbel, tweede voorkomen overgeslagen`);
      return;
    }

    // stapType bepaalt de vorm/kleur in de figuur. Onbekende of lege
    // waarde valt terug op 'proces' (neutraal blauw, gewone activiteit-
    // kaart) zodat een typefout in Sheets niet de hele rij laat
    // verdwijnen — wel gelogd, zodat het opvalt.
    // Sinds de overstap naar BPMN-achtige swimlanes (modelleerconventies
    // Medemblik) zijn 'subproces' (verwijzing naar een ander proces,
    // gestippeld kader) en 'parallel' (parallel-gateway, "+"-diamant)
    // toegevoegd naast de bestaande typen.
    const VALID_STEP_TYPES = ['start', 'proces', 'beslissing', 'parallel', 'actie', 'subproces', 'einde'];
    let stapType = (r.stapType || '').trim().toLowerCase();
    if (stapType && !VALID_STEP_TYPES.includes(stapType)) {
      rowIssues.push(`Proces "${procId}" stap ${stapNr}: onbekend stapType "${stapType}", gebruik 'proces' als fallback.`);
      stapType = 'proces';
    } else if (!stapType) {
      stapType = 'proces';
    }

    proc.steps.push({
      stapNr,
      stapNaam: r.stapNaam || `Stap ${stapNr}`,
      stapDesc: decodeText(r.stapDesc),
      stapSub: decodeText(r.stapSub),       // optioneel: korte ondertitel onder de stapnaam
      stapVragen: decodeText(r.stapVragen)  // optioneel: vragen/datapunten, één per regel (\n-gescheiden)
        .split('\n').map(v => v.trim()).filter(Boolean),
      stapType,
      // stapRol: wie voert de stap uit (afdeling/rol/systeem) — bepaalt
      // de swimlane (BPMN-lane) waarin de stap getekend wordt. Leeg
      // toegestaan (oudere, nog niet gemigreerde processen): die
      // stappen komen dan samen in één naamloze lane, zodat een proces
      // zonder deze kolom nog steeds gewoon rendert.
      stapRol: (r.stapRol || '').trim(),
      // stapVerwijstNaarProces: alleen bij stapType 'subproces' — het
      // procId van het proces waarnaar dit kader verwijst. Optioneel;
      // indien ingevuld en het proces bestaat, is het kader klikbaar en
      // springt de gebruiker naar dat proces.
      stapVerwijstNaarProces: (r.stapVerwijstNaarProces || '').trim(),
      volgendeStap,
      volgendeLabel,
    });
  });

  const rows = [];
  for (const proc of byProc.values()) {
    if (proc.steps.length === 0) {
      rowIssues.push(`Proces "${proc.id}" heeft geen geldige stappen, overgeslagen`);
      continue;
    }
    proc.steps.sort((a, b) => a.stapNr - b.stapNr);
    rows.push(proc);
  }

  return { rows, rowIssues };
}

/* MensCentraal-processen: het tabblad "processen_mc" heeft ÉÉN RIJ PER
   VRAAG. Proces- en fase-informatie hoeft alleen op de EERSTE rij van
   een fase ingevuld te worden; de parser neemt de laatst geziene waarde
   mee naar volgende rijen (carry-forward). Zo kun je een MensCentraal-
   export bijna 1-op-1 in het tabblad plakken en alleen de fase-rijen
   aanvullen. Kolommen:
     procId, procNaam, procTeam, procDesc,
     faseNr, faseNaam, faseCategorie, faseOptioneel, faseVervolg,
     vraag, vraagType
   Optionele extra kolom:
   - faseSpoor: label van een parallel pad (bijv. "PGB" of "Incidentele
     maatwerkovereenkomst"). Opeenvolgende fases met een spoor-label
     worden naast het reguliere pad getekend; fases met hetzelfde label
     staan onder elkaar in één kolom, verschillende labels komen naast
     elkaar. Leeg = gewoon in het hoofdpad.
   - faseCategorie: toegang | toeleiden | besluitvorming | kwaliteit |
     leveren | afsluiting  (bepaalt de kleur; onbekend → toegang + log)
   - faseOptioneel: "ja" = gestippelde rand + optioneel-badge
   - faseVervolg: ;-gescheiden labels van mogelijke vervolgpaden
   - vraagType: datum | keuze | getal — of de ruwe MensCentraal-waarden
     DATE / PROCESS_PROPERTY_OPTION / NUMBER. TEXT-rijen worden
     automatisch overgeslagen (vrije tekst is niet analyseerbaar).   */
const MC_CATEGORIES = ['toegang', 'toeleiden', 'besluitvorming', 'kwaliteit', 'leveren', 'afsluiting'];
const MC_TYPE_MAP = { 'date': 'datum', 'process_property_option': 'keuze', 'boolean': 'keuze', 'number': 'getal', 'decimal': 'getal', 'datum': 'datum', 'keuze': 'keuze', 'getal': 'getal' };

function mapMcProcessenRows(records) {
  const rowIssues = [];
  const byProc = new Map(); // procId -> proces-object
  let curProcId = '', curFaseNr = null;

  records.forEach((r, idx) => {
    // Carry-forward: lege procId/faseNr = zelfde als de rij erboven.
    const rowProcId = (r.procId || '').trim();
    if (rowProcId) { curProcId = rowProcId; curFaseNr = null; }
    if (!curProcId) { rowIssues.push(`MC-rij ${idx + 1} zonder procId (ook niet erboven), overgeslagen`); return; }

    if (!byProc.has(curProcId)) {
      byProc.set(curProcId, { id: curProcId, naam: curProcId, team: '', desc: '', type: 'menscentraal', fases: [] });
    }
    const proc = byProc.get(curProcId);
    if ((r.procNaam || '').trim()) proc.naam = r.procNaam.trim();
    if ((r.procTeam || '').trim()) proc.team = r.procTeam.trim();
    if ((r.procDesc || '').trim()) proc.desc = decodeText(r.procDesc);

    const faseNrRaw = (r.faseNr || '').trim();
    if (faseNrRaw) {
      const nr = parseInt(faseNrRaw, 10);
      if (Number.isNaN(nr)) { rowIssues.push(`MC-rij ${idx + 1} (proces "${curProcId}"): faseNr "${faseNrRaw}" is geen getal, rij overgeslagen`); return; }
      curFaseNr = nr;
    }
    if (curFaseNr === null) { rowIssues.push(`MC-rij ${idx + 1} (proces "${curProcId}") zonder faseNr (ook niet erboven), overgeslagen`); return; }

    let fase = proc.fases.find(f => f.nr === curFaseNr);
    if (!fase) {
      fase = { nr: curFaseNr, naam: `Fase ${curFaseNr}`, cat: 'toegang', optioneel: false, spoor: '', vervolg: [], vragen: [] };
      proc.fases.push(fase);
    }
    if ((r.faseNaam || '').trim()) fase.naam = r.faseNaam.trim();
    if ((r.faseSpoor || '').trim()) fase.spoor = r.faseSpoor.trim();
    const catRaw = (r.faseCategorie || '').trim().toLowerCase();
    if (catRaw) {
      if (MC_CATEGORIES.includes(catRaw)) fase.cat = catRaw;
      else rowIssues.push(`Proces "${curProcId}" fase ${curFaseNr}: onbekende categorie "${catRaw}", gebruik 'toegang' als fallback.`);
    }
    if ((r.faseOptioneel || '').trim()) fase.optioneel = (r.faseOptioneel || '').trim().toLowerCase() === 'ja';
    if ((r.faseVervolg || '').trim()) fase.vervolg = r.faseVervolg.split(';').map(s => s.trim()).filter(Boolean);

    const vraag = (r.vraag || '').trim();
    if (!vraag) return; // fase-rij zonder vraag is prima (bijv. "Start zaak")
    const typeRaw = (r.vraagType || '').trim().toLowerCase();
    if (typeRaw === 'text' || typeRaw === 'tekst') return; // vrije tekst: niet analyseerbaar, stil overslaan
    const vtype = MC_TYPE_MAP[typeRaw] || 'keuze';
    if (typeRaw && !MC_TYPE_MAP[typeRaw]) rowIssues.push(`Proces "${curProcId}" fase ${curFaseNr}: onbekend vraagType "${typeRaw}" bij "${vraag}", gebruik 'keuze'.`);
    fase.vragen.push({ naam: vraag, type: vtype });
  });

  const rows = [];
  for (const proc of byProc.values()) {
    if (proc.fases.length === 0) { rowIssues.push(`MC-proces "${proc.id}" heeft geen fases, overgeslagen`); continue; }
    proc.fases.sort((a, b) => a.nr - b.nr);
    rows.push(proc);
  }
  return { rows, rowIssues };
}

/* ====================================================================
   HARDCODED PROCESSEN
   Naast (of zonder) een Sheets-koppeling kunnen hier processen direct
   in de code worden vastgelegd — handig voor een proces dat nog niet
   in Sheets staat, of dat je liever niet door iedereen wilt laten
   bewerken. Zelfde vorm als een proces dat uit Sheets komt: een
   object met id/naam/team/desc/steps. Bij een procId-botsing met een
   Sheets-rij wint de Sheets-versie (zie samenvoegLogica in
   loadAllData) en wordt het hardcoded duplicaat overgeslagen + gelogd.
   Laat de array leeg ([]) als je geen hardcoded processen wilt.
   ==================================================================== */
const HARDCODED_PROCESSEN = [
  // Voorbeeld — verwijder of vervang dit door een eigen proces:
  // {
  //   id: 'HC-001',
  //   naam: 'Voorbeeld hardcoded proces',
  //   team: 'WMO & Backoffice',
  //   desc: 'Dit proces staat niet in Sheets maar direct in de code.',
  //   steps: [
  //     { stapNr: 1, stapNaam: 'Eerste stap', stapDesc: 'Toelichting...', stapSub: '', stapVragen: [], volgendeStap: [2], volgendeLabel: [] },
  //     { stapNr: 2, stapNaam: 'Tweede stap', stapDesc: 'Toelichting...', stapSub: '', stapVragen: [], volgendeStap: [], volgendeLabel: [] },
  //   ],
  // },
];

async function loadAllData() {
  // Visuele feedback op de vernieuw-knop zolang de fetches lopen
  const btn = document.getElementById('btnRefreshSheets');
  const btnHtml = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.style.opacity = '.55'; btn.innerHTML = 'Laden…'; }

  issues.length = 0;
  const [defRes, dvRes, dashRes, procRes, mcRes] = await Promise.all([
    fetchAndMap(SHEET_URLS.definities, mapDefinitiesRows),
    fetchAndMap(SHEET_URLS.datavelden, mapDataveldenRows),
    fetchAndMap(SHEET_URLS.dashboards, mapDashboardsRows),
    fetchAndMap(SHEET_URLS.processen, mapProcessenRows),
    // mc-tab is optioneel: geen URL geconfigureerd = stil overslaan.
    SHEET_URLS.processen_mc
      ? fetchAndMap(SHEET_URLS.processen_mc, mapMcProcessenRows)
      : Promise.resolve({ rows: [], rowIssues: [] }),
  ]);
  entries = defRes.rows;
  dvEntries = dvRes.rows;
  dashEntries = dashRes.rows;
  procEntries = procRes.rows;

  // MensCentraal-processen toevoegen; bij een procId-botsing wint de
  // gewone processen-tab (zelfde principe als bij hardcoded).
  const normProcIds = new Set(procEntries.map(p => p.id));
  for (const mc of mcRes.rows) {
    if (normProcIds.has(mc.id)) {
      issues.push({ dataset: 'processen', message: `MC-proces "${mc.id}" overgeslagen — id bestaat al in het gewone processen-tabblad.` });
      continue;
    }
    procEntries.push(mc);
  }
  mcRes.rowIssues.forEach(m => issues.push({ dataset: 'processen_mc', message: m }));

  // Veld1-Veld8 (DF-ids) omzetten naar volledige chip-info, nu beide
  // datasets geladen zijn. Issues hierbij gaan in dezelfde issues-array
  // als de rest, zodat ze ook in de banner verschijnen.
  const fieldChipIssues = [];
  resolveFieldChips(entries, dvEntries, fieldChipIssues);
  fieldChipIssues.forEach(m => issues.push({ dataset: 'definities', message: m }));

  // Hardcoded processen toevoegen, met voorrang voor Sheets bij een
  // procId-botsing (zo blijft Sheets de "bron van waarheid" als
  // iemand per ongeluk hetzelfde id hardcoded én in Sheets gebruikt).
  const sheetsProcIds = new Set(procEntries.map(p => p.id));
  for (const hc of HARDCODED_PROCESSEN) {
    if (sheetsProcIds.has(hc.id)) {
      issues.push({ dataset: 'processen', message: `Hardcoded proces "${hc.id}" overgeslagen — bestaat al in Sheets, Sheets-versie wint.` });
      continue;
    }
    procEntries.push(hc);
  }

  defRes.rowIssues.forEach(m => issues.push({ dataset: 'definities', message: m }));
  dvRes.rowIssues.forEach(m => issues.push({ dataset: 'datavelden', message: m }));
  dashRes.rowIssues.forEach(m => issues.push({ dataset: 'dashboards', message: m }));
  procRes.rowIssues.forEach(m => issues.push({ dataset: 'processen', message: m }));

  populateFilterOptions();
  notifyDataLoaded(); // één centrale hook, update alle 3 tabs + header + footer

  if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.innerHTML = btnHtml; }
}

function populateFilterOptions() {
  const cats = [...new Set(entries.map(e => e.cat).filter(Boolean))].sort();
  const statuses = [...new Set(entries.map(e => e.status).filter(Boolean))].sort();
  const teams = [...new Set(entries.map(e => e.team).filter(Boolean))].sort();
  const types = [...new Set(dvEntries.map(d => d.type).filter(Boolean))].sort();
  const srcs = [...new Set(dvEntries.map(d => d.src).filter(Boolean))].sort();
  const dashTeams = [...new Set(dashEntries.map(d => d.team).filter(Boolean))].sort();
  const procTeams = [...new Set(procEntries.map(p => p.team).filter(Boolean))].sort();

  fillSelect('filterCat', cats, 'Alle categorieën');
  fillSelect('filterStatus', statuses, 'Alle statussen');
  fillSelect('filterTeam', teams, 'Alle teams');
  fillSelect('dvFilterType', types, 'Alle typen');
  fillSelect('dvFilterSrc', srcs, 'Alle bronnen');
  fillSelect('dashFilterTeam', dashTeams, 'Alle teams');
  fillSelect('procFilterTeam', procTeams, 'Alle teams');
}
function fillSelect(id, values, placeholder) {
  const sel = document.getElementById(id);
  const current = sel.value;
  sel.innerHTML = `<option value="">${placeholder}</option>` +
    values.map(v => `<option value="${escHtml(v)}">${escHtml(v)}</option>`).join('');
  if (values.includes(current)) sel.value = current;
}

/* ====================================================================
   RENDER-HOOK — centrale "data is binnen"-aanroep (Stap 3 uit het
   herbouwplan). Voorkomt dat de ene tab een oude stand toont terwijl
   de andere al bijgewerkt is.
   ==================================================================== */
function notifyDataLoaded() {
  renderHeaderCounts();
  renderIssueBanner();
  renderTable();
  renderDvTable();
  renderDashTable();
  renderProcList();
  renderHome();
}

let activeMainTab = 'home'; // gesynchroniseerd met switchMainTab

function renderHeaderCounts() {
  document.getElementById('ftrDate').textContent = 'Live uit Google Sheets · ' + new Date().toLocaleDateString('nl-NL', {day:'numeric', month:'long', year:'numeric'});
}

function renderIssueBanner() {
  const banner = document.getElementById('dataIssueBanner');
  if (issues.length === 0) { banner.style.display = 'none'; return; }
  banner.style.display = 'block';
  banner.innerHTML = `${issues.length} rij(en) konden niet (volledig) geladen worden — <a onclick="console.table(issues)">zie console voor details</a>.`;
  console.warn('Data-issues:', issues);
}

/* ====================================================================
   DEFINITIES — tabel + detail
   ==================================================================== */
function renderTable() {
  const q = (document.getElementById('searchInput').value || '').toLowerCase();
  const fc = document.getElementById('filterCat').value;
  const fs = document.getElementById('filterStatus').value;
  const ft = document.getElementById('filterTeam').value;

  let filtered = entries.filter(e => {
    if (fc && e.cat !== fc) return false;
    if (fs && e.status !== fs) return false;
    if (ft && e.team !== ft) return false;
    const chipText = (e.fieldChips || []).map(c => c.label).join(' ');
    if (q && !(`${e.term} ${e.def} ${e.fields} ${chipText} ${e.fieldsFull}`.toLowerCase().includes(q))) return false;
    return true;
  });

  document.getElementById('countLabel').textContent = `${filtered.length} begrippen`;

  const tbody = document.getElementById('tableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr class="loading-row"><td colspan="4">Geen begrippen gevonden.</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(e => {
    return `<tr data-id="${escHtml(e.id)}" class="${e.id===currentId?'selected':''}">
      <td>
        <div class="term-cell">${hlHtml(e.term, q)}</div>
        <div class="def-preview">${hlHtml(e.def, q)}</div>
      </td>
      <td class="cat-cell">${catPillHtml(e.cat)}</td>
      <td style="font-size:.63rem;color:var(--sub);white-space:nowrap;max-width:100px;overflow:hidden;text-overflow:ellipsis;">${escHtml(e.team)}</td>
      <td>${statusBadgeHtml(e.status)}</td>
    </tr>`;
  }).join('');
}

function selectEntry(id) {
  currentId = id;
  const e = entries.find(x => x.id === id);
  if (!e) return;

  document.getElementById('detailEmpty').style.display = 'none';
  document.getElementById('detailContent').style.display = 'flex';

  document.getElementById('dTerm').textContent = e.term;
  document.getElementById('dCatBadge').innerHTML = catPillHtml(e.cat);
  document.getElementById('dStatusBadge').innerHTML = statusBadgeHtml(e.status);
  document.getElementById('dDef').textContent = e.def || '—';

  toggleSection('dCtxSection', e.ctx, 'dCtx');
  toggleSection('dFieldsFullSection', e.fieldsFull, 'dFieldsFull');
  toggleSection('dNotesSection', e.notes, 'dNotes');

  const fieldsWrap = document.getElementById('dFields');
  const chips = (e.fieldChips || []);
  if (chips.length) {
    fieldsWrap.innerHTML = chips.map(c =>
      c.id
        ? `<span class="df-chip catalog df-chip-link" data-dfid="${escHtml(c.id)}" title="Open dit dataveld op de Datavelden-tab">${escHtml(c.label || c.id)}</span>`
        : `<span class="df-chip ${c.type === 'custom' ? 'custom' : 'catalog'}">${escHtml(c.label || '')}</span>`
    ).join('');
    document.getElementById('dFieldsSection').style.display = '';
  } else if (e.fields) {
    fieldsWrap.innerHTML = `<span class="df-chip catalog">${escHtml(e.fields)}</span>`;
    document.getElementById('dFieldsSection').style.display = '';
  } else {
    document.getElementById('dFieldsSection').style.display = 'none';
  }

  document.getElementById('dTeam').textContent = e.team || '—';
  document.getElementById('dDate').textContent = e.date || '—';
  document.getElementById('dCat').textContent = e.cat || '—';
  document.getElementById('dStatus').textContent = e.status || '—';

  const imgSection = document.getElementById('dImageSection');
  const imgEl = document.getElementById('dImage');
  if (e.image && /^https?:\/\//i.test(e.image)) {
    imgEl.src = e.image;
    imgEl.alt = e.term || '';
    imgSection.style.display = '';
  } else {
    imgEl.removeAttribute('src');
    imgSection.style.display = 'none';
  }

  const cl = document.getElementById('dChangelog');
  const entries_cl = e.changelog || [];
  if (entries_cl.length) {
    cl.innerHTML = entries_cl.map(c =>
      `<div class="changelog-item"><span class="changelog-dot"></span><span class="changelog-date">${escHtml(c.date || '')}</span><span class="changelog-action">${escHtml(c.action || '')}</span></div>`
    ).join('');
  } else {
    cl.innerHTML = `<div class="changelog-item"><span class="changelog-dot"></span><span class="changelog-action" style="font-style:italic;">Nog geen wijzigingen geregistreerd</span></div>`;
  }

  renderTable(); // her-render voor 'selected'-highlight
}

function toggleSection(sectionId, value, contentId) {
  const has = value && String(value).trim();
  document.getElementById(sectionId).style.display = has ? '' : 'none';
  if (has) document.getElementById(contentId).textContent = value;
}

/* ====================================================================
   DATAVELDEN — tabel + detail
   ==================================================================== */
function dtypeClass(type) {
  const t = (type || '').toLowerCase();
  if (t === 'date') return 'date';
  if (t === 'datetime') return 'datetime';
  if (['varchar', 'longtext', 'text'].includes(t)) return 'varchar';
  if (['decimal', 'bigint', 'int', 'tinyint', 'bit', 'smallint', 'boolean'].includes(t)) return 'decimal';
  return '';
}

function renderDvTable() {
  const q = (document.getElementById('dvSearch').value || '').toLowerCase();
  const ft = document.getElementById('dvFilterType').value;
  const fs = document.getElementById('dvFilterSrc').value;

  let filtered = dvEntries.filter(d => {
    if (ft && d.type !== ft) return false;
    if (fs && d.src !== fs) return false;
    if (q && !(`${d.name} ${d.desc} ${d.src} ${d.col}`.toLowerCase().includes(q))) return false;
    return true;
  });

  document.getElementById('dvCountLabel').textContent = `${filtered.length} velden`;

  const tbody = document.getElementById('dvTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr class="loading-row"><td colspan="4">Geen datavelden gevonden.</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(d => `
    <tr data-id="${escHtml(d.id)}" class="${d.id===currentDvId?'selected':''}">
      <td><span class="dv-name">${hlHtml(d.name, q)}</span></td>
      <td><span class="dtype-badge ${dtypeClass(d.type)}">${escHtml(d.type)}</span></td>
      <td class="dv-src">${hlHtml(d.src, q)}</td>
      <td style="font-size:.7rem;color:var(--sub);max-width:340px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${hlHtml((d.desc||'').split('\n')[0], q)}</td>
    </tr>
  `).join('');
}

function selectDvEntry(id) {
  currentDvId = id;
  const d = dvEntries.find(x => x.id === id);
  if (!d) return;

  document.getElementById('dvDetailEmpty').style.display = 'none';
  document.getElementById('dvDetailContent').style.display = 'flex';

  document.getElementById('dvName').textContent = d.name;
  const badge = document.getElementById('dvTypeBadge');
  badge.className = `dtype-badge ${dtypeClass(d.type)}`;
  badge.textContent = d.type;
  document.getElementById('dvDesc').textContent = d.desc || '—';
  document.getElementById('dvSrc').textContent = d.src || '—';
  document.getElementById('dvCol').textContent = d.col || '—';

  // Reverse lookup: welke definities gebruiken dit dataveld?
  const usedIn = entries.filter(e => (e.veldIds || []).includes(d.id));
  const usedInSection = document.getElementById('dvUsedInSection');
  const usedInList = document.getElementById('dvUsedInList');
  if (usedIn.length) {
    usedInList.innerHTML = usedIn.map(e =>
      `<span class="df-chip catalog df-chip-link" data-defid="${escHtml(e.id)}" title="Open deze definitie op de Definities-tab">${escHtml(e.id)} · ${escHtml(e.term)}</span>`
    ).join('');
    usedInSection.style.display = '';
  } else {
    usedInList.innerHTML = '';
    usedInSection.style.display = 'none';
  }

  const valuesSection = document.getElementById('dvValuesSection');
  const valuesList = document.getElementById('dvValuesList');
  if (d.values && d.values.trim()) {
    const lines = d.values.split('\n').filter(l => l.trim());
    valuesList.innerHTML = lines.map(line => {
      const [code, ...rest] = line.split('—');
      const desc = rest.join('—').trim();
      return `<div class="dv-value-row"><span class="dv-value-code">${escHtml(code.trim())}</span>${desc ? `<span class="dv-value-desc">${escHtml(desc)}</span>` : ''}</div>`;
    }).join('');
    valuesSection.style.display = '';
  } else {
    valuesSection.style.display = 'none';
  }

  renderDvTable();
}

/* ====================================================================
   DASHBOARDS — tabel + detail
   ==================================================================== */
/* Alleen bekende type-waarden als CSS-klasse doorlaten (voorkomt
   class-injectie vanuit het Sheet) + hoofdletterongevoelig. */
function dashTypeClass(type) {
  const t = (type || '').trim().toLowerCase();
  return (t === 'intern' || t === 'extern') ? t : '';
}
/* Alleen echte http(s)-links accepteren — zelfde check als bij de
   Afbeelding-kolom. Voorkomt javascript:-links vanuit het Sheet. */
function safeLink(url) {
  const u = (url || '').trim();
  return /^https?:\/\//i.test(u) ? u : '';
}

function renderDashTable() {
  const q = (document.getElementById('dashSearch').value || '').toLowerCase();
  const ftype = document.getElementById('dashFilterType').value;
  const fteam = document.getElementById('dashFilterTeam').value;

  let filtered = dashEntries.filter(d => {
    if (ftype && (d.type || '').trim().toLowerCase() !== ftype) return false;
    if (fteam && d.team !== fteam) return false;
    if (q && !(`${d.name} ${d.team} ${d.desc} ${d.loc}`.toLowerCase().includes(q))) return false;
    return true;
  });

  document.getElementById('dashCountLabel').textContent = `${filtered.length} dashboards`;

  const tbody = document.getElementById('dashTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr class="loading-row"><td colspan="6">Geen dashboards gevonden.</td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map(d => `
    <tr data-id="${escHtml(d.id)}" class="${d.id===currentDashId?'selected':''}">
      <td class="dash-name">${hlHtml(d.name, q)}</td>
      <td><span class="dash-badge ${dashTypeClass(d.type)}">${escHtml(d.type)}</span></td>
      <td class="dash-team">${hlHtml(d.team, q)}</td>
      <td style="font-size:.7rem;color:var(--sub);">${hlHtml(d.loc, q)}</td>
      <td style="font-size:.68rem;color:var(--sub);">${escHtml(d.updated)}</td>
      <td style="text-align:center;">${safeLink(d.link) ? `<a class="dash-row-open" href="${escHtml(safeLink(d.link))}" target="_blank" rel="noopener" title="Open dit dashboard direct in een nieuw tabblad">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>` : ''}</td>
    </tr>
  `).join('');
}

function selectDashEntry(id) {
  currentDashId = id;
  const d = dashEntries.find(x => x.id === id);
  if (!d) return;
  renderDashTable(); // 'selected'-highlight bijwerken
  openDashModal(d);
}

function openDashModal(d) {
  document.getElementById('dashModalTitle').textContent = d.name;
  const badge = document.getElementById('dashModalTypeBadge');
  badge.className = `dash-badge ${dashTypeClass(d.type)}`;
  badge.textContent = d.type;
  document.getElementById('dashModalDesc').textContent = d.desc || '—';
  document.getElementById('dashModalTeam').textContent = d.team || '—';
  document.getElementById('dashModalLoc').textContent = d.loc || '—';
  document.getElementById('dashModalUpdated').textContent = d.updated || '—';

  const linkWrap = document.getElementById('dashModalLinkWrap');
  linkWrap.innerHTML = safeLink(d.link) ? `<a class="dash-cta" href="${escHtml(safeLink(d.link))}" target="_blank" rel="noopener">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    Open dashboard
  </a>` : `<div class="dash-nolink">Geen link beschikbaar voor dit dashboard — vul de kolom "link" in het Sheet in.</div>`;

  document.getElementById('dashModalOverlay').classList.add('open');
}

function closeDashModal() {
  document.getElementById('dashModalOverlay').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeDashModal(); }
});

/* ====================================================================
   PROCESSEN — lijst + automatisch getekende flow-figuur.
   Layout-/render-logica hieronder is apart getest (zie gesprek) tegen
   een synthetisch voorbeeldproces met vertakkingen/samenkomsten
   voordat dit hier werd geïntegreerd.
   ==================================================================== */
function renderProcList() {
  const q = (document.getElementById('procSearch').value || '').toLowerCase();
  const ft = document.getElementById('procFilterTeam').value;
  const ftype = document.getElementById('procFilterType').value;

  const filtered = procEntries.filter(p => {
    if (ftype && (p.type || 'normaal') !== ftype) return false;
    if (ft && p.team !== ft) return false;
    if (q && !(`${p.naam} ${p.team} ${p.desc}`.toLowerCase().includes(q))) return false;
    return true;
  });

  document.getElementById('procCountLabel').textContent = `${filtered.length} processen`;

  const list = document.getElementById('procList');
  if (filtered.length === 0) {
    list.innerHTML = procEntries.length === 0
      ? `<div class="empty-state" style="color:#fff;">Nog geen processen — voeg rijen toe aan het 'processen'-tabblad in Google Sheets.</div>`
      : `<div class="empty-state" style="color:#fff;">Geen processen gevonden.</div>`;
    return;
  }

  list.innerHTML = filtered.map(p => {
    const isMc = p.type === 'menscentraal';
    const countLabel = isMc
      ? `${p.fases.length} fases · ${p.fases.reduce((n, f) => n + f.vragen.length, 0)} vragen`
      : `${p.steps.length} stappen`;
    const typeBadge = isMc
      ? `<span class="proc-type-badge mc">MensCentraal</span>`
      : `<span class="proc-type-badge">Normaal</span>`;
    const sel = p.id === currentProcId ? ' selected' : '';
    return `
    <div class="proc-card${sel}" data-id="${escHtml(p.id)}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
        <div class="proc-card-name">${hlHtml(p.naam, q)}</div>
        ${typeBadge}
      </div>
      <div class="proc-card-desc">${hlHtml(p.desc, q) || 'Geen beschrijving'}</div>
      <div class="proc-card-foot">
        <span>${hlHtml(p.team, q) || '—'}</span>
        <span class="proc-card-steps">${countLabel}</span>
      </div>
    </div>`;
  }).join('');
}

/* ── Layout: wijst elke stap een verticale laag toe op basis van de
   langste keten van voorgangers, zodat samenkomende paden (zoals
   stap 4 en 5 die beide naar 6 gaan) na hun laatste voorganger
   komen. ──────────────────────────────────────────────────────── */
function computeStepLayers(steps) {
  const incoming = new Map(steps.map(s => [s.stapNr, []]));
  for (const s of steps) {
    for (const next of s.volgendeStap) {
      if (incoming.has(next)) incoming.get(next).push(s.stapNr);
    }
  }
  const layer = new Map();
  const visiting = new Set();
  function computeLayer(nr) {
    if (layer.has(nr)) return layer.get(nr);
    if (visiting.has(nr)) { console.warn(`Cyclus bij stap ${nr}, layout kan afwijken.`); return 0; }
    visiting.add(nr);
    const preds = incoming.get(nr) || [];
    const result = preds.length === 0 ? 0 : Math.max(...preds.map(p => computeLayer(p))) + 1;
    visiting.delete(nr);
    layer.set(nr, result);
    return result;
  }
  for (const s of steps) computeLayer(s.stapNr);
  return layer;
}

/* ── Swimlanes (sinds de overstap op de Medemblik-modelleerconventies,
   17 sept 2026): een proces wordt niet langer als vrije kaartenwolk
   getekend, maar als een BPMN-achtig swimlane-diagram. X = voortgang
   door het proces (de bestaande layer-berekening hierboven, ongemoeid
   gelaten). Y = wie de stap uitvoert (stapRol). Elke unieke stapRol-
   waarde wordt een eigen horizontale baan (lane), van boven naar
   beneden in volgorde van eerste voorkomen in het proces — behalve
   lanes die uitsluitend 'subproces'-verwijzingen bevatten (zoals
   "Vervolgproces"): die komen altijd als laatste, ongeacht waar ze in
   het proces voorkomen, zodat vervolgprocessen visueel los blijven
   staan van de uitvoerende rollen. Een proces zonder stapRol-kolom
   (nog niet gemigreerd) valt terug op één naamloze lane — zo blijft
   oude data gewoon werken totdat iemand de rollen aanvult. ────────── */
function computeLaneOrder(steps, layerMap) {
  const byLane = new Map(); // laneKey -> steps[]
  for (const s of steps) {
    const key = s.stapRol || '';
    if (!byLane.has(key)) byLane.set(key, []);
    byLane.get(key).push(s);
  }
  const lanes = [...byLane.entries()].map(([key, laneSteps]) => ({
    key,
    label: key || 'Proces',
    steps: laneSteps,
    minLayer: Math.min(...laneSteps.map(s => layerMap.get(s.stapNr))),
    allSubproces: laneSteps.every(s => s.stapType === 'subproces'),
  }));
  lanes.sort((a, b) => {
    if (a.allSubproces !== b.allSubproces) return a.allSubproces ? 1 : -1;
    return a.minLayer - b.minLayer;
  });
  return lanes;
}

/* Binnen één (lane, laag)-cel staan normaal maar 1 stap. Komt dat toch
   vaker voor (bijv. twee acties van dezelfde rol die toevallig in
   dezelfde laag vallen), dan stapelen we ze als sub-rij binnen de
   lane-baan, in CSV-volgorde — zeldzaam genoeg om geen zwaardere
   kruisingsheuristiek voor nodig te hebben. */
function computeSubrows(lanes, layerMap) {
  const subrowByStep = new Map();
  const cellCountByLane = new Map(); // laneIdx -> max aantal sub-rijen
  lanes.forEach((lane, laneIdx) => {
    const byLayer = new Map();
    for (const s of lane.steps) {
      const l = layerMap.get(s.stapNr);
      if (!byLayer.has(l)) byLayer.set(l, []);
      byLayer.get(l).push(s);
    }
    let maxCell = 1;
    for (const cellSteps of byLayer.values()) {
      cellSteps.forEach((s, i) => subrowByStep.set(s.stapNr, i));
      maxCell = Math.max(maxCell, cellSteps.length);
    }
    cellCountByLane.set(laneIdx, maxCell);
  });
  return { subrowByStep, cellCountByLane };
}

function wrapToTwoLines(str, maxCharsPerLine) {
  const words = String(str || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === 2) break;
    } else {
      current = candidate;
    }
  }
  if (lines.length < 2 && current) lines.push(current);
  const consumedWords = lines.join(' ').split(/\s+/).length;
  if (consumedWords < words.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.length > 3 ? last.slice(0, -1) + '…' : last + '…';
  }
  return lines;
}

function renderProcessFlowSVG(steps, layerMap, lanes, selectedStapNr) {
  const boxW = 212, cardH = 80, lineHeight = 16, colGap = 112, cellH = 176, padding = 46;
  const laneLabelW = 42;

  const wrapped = new Map();
  for (const s of steps) wrapped.set(s.stapNr, wrapToTwoLines(s.stapNaam, 19));

  const maxLayer = Math.max(...layerMap.values());
  const { subrowByStep, cellCountByLane } = computeSubrows(lanes, layerMap);

  const svgWidth = padding * 2 + laneLabelW + (maxLayer + 1) * boxW + maxLayer * colGap;

  // Y-positie van elke lane-baan (gestapeld, hoogte = aantal sub-rijen × cellH).
  const laneTop = new Map();
  const laneHeight = new Map();
  {
    let cursorY = padding;
    lanes.forEach((lane, laneIdx) => {
      const h = cellCountByLane.get(laneIdx) * cellH;
      laneTop.set(laneIdx, cursorY);
      laneHeight.set(laneIdx, h);
      cursorY += h;
    });
    var svgHeight = cursorY + padding * 0.5;
  }

  const laneIdxByStep = new Map();
  lanes.forEach((lane, laneIdx) => { for (const s of lane.steps) laneIdxByStep.set(s.stapNr, laneIdx); });

  // Elke stap krijgt een centerpunt (cx, cy) — de vorm (cirkel/ruit/
  // kaart) wordt daaromheen getekend, zodat pijlen altijd gewoon op
  // hoogte cy aan de rand van de vorm kunnen aansluiten.
  const pos = new Map();
  for (const s of steps) {
    const layerNr = layerMap.get(s.stapNr);
    const laneIdx = laneIdxByStep.get(s.stapNr);
    const subrow = subrowByStep.get(s.stapNr) || 0;
    const cx = padding + laneLabelW + layerNr * (boxW + colGap) + boxW / 2;
    const cy = laneTop.get(laneIdx) + subrow * cellH + cellH / 2;
    pos.set(s.stapNr, { cx, cy, laneIdx });
  }

  // Halve breedte per vorm — bepaalt waar een pijl de vorm raakt.
  function halfW(stapType) {
    if (stapType === 'start' || stapType === 'einde') return 26;
    if (stapType === 'beslissing' || stapType === 'parallel') return 32;
    return boxW / 2; // proces, actie, subproces
  }

  // Ja/nee/kort/langdurig-labels op pijlen krijgen een betekenisvolle kleur.
  function arrowLabelStyle(label) {
    const l = (label || '').trim().toLowerCase();
    if (l === 'ja' || l === 'akkoord')  return { bg: '#E1F5EE', border: '#9FE1CB', text: '#0B6E49' };
    if (l === 'nee' || l === 'afwijzen') return { bg: '#FAECE7', border: '#F2B49B', text: '#993C1D' };
    return { bg: '#E6F1FB', border: '#B5D4F4', text: '#185FA5' };
  }

  // Lange vertakkingslabels (bijv. "Maatwerkovereenkomst") over twee
  // regels breken i.p.v. één brede chip die in de buurbaan/-kolom
  // steekt — voorkomt overlap met kaarten links/rechts van de kier.
  // Eén lang los woord (geen spatie) wordt zo nodig met een koppelteken
  // doormidden geknipt, anders zou de chip zelf te breed blijven.
  function wrapLabel(label) {
    if (label.length <= 13) return [label];
    const words = label.split(/\s+/);
    if (words.length === 1) {
      const mid = Math.ceil(label.length / 2);
      return [label.slice(0, mid) + '-', label.slice(mid)];
    }
    let l1 = '', i = 0;
    for (; i < words.length; i++) {
      const cand = l1 ? `${l1} ${words[i]}` : words[i];
      if (cand.length > 13 && l1) break;
      l1 = cand;
    }
    const l2 = words.slice(i).join(' ');
    return l2 ? [l1, l2] : [l1];
  }

  // Pijllijnen en labels apart bijhouden: labels worden helemaal aan het
  // eind (ná de kaarten/vormen) getekend, zodat een label-chipje nooit
  // onder een kaart of een andere pijl kan wegvallen — SVG tekent later
  // opgegeven elementen bovenop eerdere.
  let arrows = '';
  let arrowLabels = '';
  for (const s of steps) {
    const from = pos.get(s.stapNr);
    s.volgendeStap.forEach((nextNr, idx) => {
      const to = pos.get(nextNr);
      if (!from || !to) return;
      const label = (s.volgendeLabel && s.volgendeLabel[idx]) || '';
      const x1 = from.cx + halfW(s.stapType), y1 = from.cy;
      const toStep = steps.find(x => x.stapNr === nextNr);
      const x2 = to.cx - halfW(toStep ? toStep.stapType : ''), y2 = to.cy;
      const layerDist = Math.abs(layerMap.get(nextNr) - layerMap.get(s.stapNr));
      const midX = (x1 + x2) / 2;

      let path, labelX, labelY;
      if (layerDist > 1) {
        // Pad slaat één of meer kolommen over: boog het pad omhoog (of
        // omlaag als er boven geen ruimte is) zodat het NIET dwars door
        // de tussenliggende kaarten heen loopt, en zet het label op de
        // top van de boog — daar staat nooit een kaart.
        const bowUp = Math.min(y1, y2) > padding + cellH * 0.6;
        const bow = 54 + 16 * (layerDist - 1);
        const bowY = bowUp ? Math.min(y1, y2) - bow : Math.max(y1, y2) + bow;
        path = `M ${x1} ${y1} C ${x1 + 50} ${bowY}, ${x2 - 50} ${bowY}, ${x2 - 2} ${y2}`;
        labelX = midX;
        // Het label hoort op het werkelijke midden van de kromme (t=0.5),
        // niet op bowY zelf: als bron en doel ver uit elkaar liggen in
        // hoogte (bv. een boog die twee rijbanen overslaat) ligt de curve
        // bij x=midX helemaal niet op bowY maar veel dichter bij het
        // gemiddelde van y1 en y2 — anders zweeft het labelchipje los van
        // de lijn. Cubic bezier op t=0.5: (y1 + 6*bowY + y2) / 8.
        const bowMidY = (y1 + 6 * bowY + y2) / 8;
        labelY = bowMidY + (bowUp ? 4 : -4);
      } else if (y1 === y2) {
        path = `M ${x1} ${y1} L ${x2 - 2} ${y2}`;
        labelX = midX;
        labelY = y1 - 16;
      } else {
        // Rijbaan-wissel binnen één kolomsprong: vloeiende S-curve, label
        // dicht bij de bestemming (t=0.78) zodat vertakkingen vanuit
        // dezelfde gateway — die allemaal bij hetzelfde punt vertrekken —
        // al voldoende verticaal uit elkaar liggen om niet te overlappen, én
        // zodat een label voor een ver/laag doel niet binnen de verticale
        // ruimte van een dichterbij/hoger gelegen kaart terechtkomt die de
        // boog toevallig onderweg passeert.
        path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2 - 2} ${y2}`;
        const t = 0.78;
        labelX = x1 + (x2 - x1) * t;
        labelY = y1 + (y2 - y1) * t + (y2 > y1 ? 13 : -13);
      }

      arrows += `<path d="${path}" fill="none" stroke="#8CA0BC" stroke-width="2" marker-end="url(#proc-arrowhead)"/>`;
      if (label) {
        const st = arrowLabelStyle(label);
        const lines = wrapLabel(label);
        const w = Math.max(40, Math.max(...lines.map(l => l.length)) * 7 + 20);
        const h = lines.length > 1 ? 38 : 25;
        arrowLabels += `<rect x="${labelX - w / 2}" y="${labelY - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${st.bg}" stroke="${st.border}" stroke-width="1.2"/>`;
        lines.forEach((line, i) => {
          const ly = lines.length > 1 ? labelY - 6 + i * 13 : labelY + 4;
          arrowLabels += `<text x="${labelX}" y="${ly}" text-anchor="middle" font-size="10.5" font-weight="700" fill="${st.text}">${escHtml(line)}</text>`;
        });
      }
    });
  }

  // Lane-banen: afwisselend lichte achtergrond + rolnaam verticaal
  // links, zoals in de officiële procesplaten (swimlanes per BPMN-
  // modelleerconventies Medemblik).
  let laneBg = '';
  lanes.forEach((lane, laneIdx) => {
    const y = laneTop.get(laneIdx), h = laneHeight.get(laneIdx);
    if (laneIdx % 2 === 1) laneBg += `<rect x="0" y="${y}" width="${svgWidth}" height="${h}" fill="#F7FAFC"/>`;
    if (laneIdx > 0) laneBg += `<line x1="0" y1="${y}" x2="${svgWidth}" y2="${y}" stroke="#DDE3EC" stroke-width="1"/>`;
    laneBg += `<text x="${padding / 2 + 6}" y="${y + h / 2}" text-anchor="middle" font-size="10.5" font-weight="700" letter-spacing="0.4" fill="#5C7A93" transform="rotate(-90 ${padding / 2 + 6} ${y + h / 2})">${escHtml(lane.label.toUpperCase())}</text>`;
  });

  // Stijl per staptype — kleuren consistent met de rest van de app
  // (huisstijl), vormen sinds de swimlane-overstap wél echte BPMN-
  // notatie: cirkel (event), ruit (gateway), kaart (activiteit),
  // gestippelde kaart (subproces-verwijzing).
  // 'accent' kleurt vormen/randen; 'text' is een net iets donkerdere
  // variant, alleen gebruikt voor kleine tekst (labels, stapnummer) op
  // een lichte ondergrond — zodat die ook bij 9-10px nog voldoende
  // contrast houdt (WCAG AA, ≥4.5:1 op wit).
  const STEP_TYPE_STYLE = {
    start:      { accent: '#1D9E75', tint: '#E1F5EE', text: '#0B6E49' },
    proces:     { accent: '#005496', tint: '#E6F1FB', text: '#004178', label: 'Processtap' },
    beslissing: { accent: '#F26722', tint: '#FFF0E6', text: '#B1490F' },
    parallel:   { accent: '#F26722', tint: '#FFF0E6', text: '#B1490F' },
    actie:      { accent: '#7F77DD', tint: '#EDE9FC', text: '#4C3FC9', label: 'Actie / taak' },
    subproces:  { accent: '#4A6180', tint: '#F2F5F9', text: '#334A63' },
    einde:      { accent: '#0B6E49', tint: '#E1F5EE', text: '#0B6E49' },
  };

  let boxes = '';
  for (const s of steps) {
    const p = pos.get(s.stapNr);
    const isSelected = s.stapNr === selectedStapNr;
    const style = STEP_TYPE_STYLE[s.stapType] || STEP_TYPE_STYLE.proces;
    const nameLines = wrapped.get(s.stapNr);
    const selColor = isSelected ? '#005496' : null;
    const gotoAttr = (s.stapType === 'subproces' && s.stapVerwijstNaarProces)
      ? ` data-goto-proc="${escHtml(s.stapVerwijstNaarProces)}" style="cursor:pointer;"` : '';

    if (s.stapType === 'start' || s.stapType === 'einde') {
      // Event: cirkel, naam eronder (klassieke BPMN-weergave).
      const r = 26;
      const sel = isSelected ? `<circle cx="${p.cx}" cy="${p.cy}" r="${r + 5}" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const labelY0 = p.cy + r + 18;
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${labelY0 + i * lineHeight}" text-anchor="middle" font-size="12" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <circle cx="${p.cx}" cy="${p.cy}" r="${r}" fill="${style.tint}" stroke="${style.accent}" stroke-width="${s.stapType === 'einde' ? 3 : 2}" filter="url(#proc-shadow)"/>
        ${nameLinesHtml}
      </g>`;
    } else if (s.stapType === 'beslissing' || s.stapType === 'parallel') {
      // Gateway: ruit (diamant), vraag/label eronder. Parallel-gateway
      // krijgt een "+" in het midden (BPMN-conventie).
      const hw = 32;
      const pts = `${p.cx},${p.cy - hw} ${p.cx + hw},${p.cy} ${p.cx},${p.cy + hw} ${p.cx - hw},${p.cy}`;
      const sel = isSelected ? `<polygon points="${p.cx},${p.cy - hw - 5} ${p.cx + hw + 5},${p.cy} ${p.cx},${p.cy + hw + 5} ${p.cx - hw - 5},${p.cy}" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const plus = s.stapType === 'parallel'
        ? `<path d="M ${p.cx - 10} ${p.cy} H ${p.cx + 10} M ${p.cx} ${p.cy - 10} V ${p.cy + 10}" stroke="${style.accent}" stroke-width="3" stroke-linecap="round"/>` : '';
      const labelY0 = p.cy + hw + 18;
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${labelY0 + i * lineHeight}" text-anchor="middle" font-size="12" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <polygon points="${pts}" fill="${style.tint}" stroke="${style.accent}" stroke-width="1.8" filter="url(#proc-shadow)"/>
        ${plus}
        ${nameLinesHtml}
      </g>`;
    } else if (s.stapType === 'subproces') {
      // Verwijzing naar een ander proces: gestippeld kader, geen
      // uitgaande pijl (eindpunt van dit pad), optioneel klikbaar.
      const x = p.cx - boxW / 2, y = p.cy - cardH / 2;
      const sel = isSelected ? `<rect x="${x - 5}" y="${y - 5}" width="${boxW + 10}" height="${cardH + 10}" rx="14" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${p.cy - (nameLines.length - 1) * lineHeight / 2 + i * lineHeight + 5}" text-anchor="middle" font-size="12.5" font-weight="700" fill="${style.text}">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}"${gotoAttr}>
        ${sel}
        <rect x="${x}" y="${y}" width="${boxW}" height="${cardH}" rx="10" fill="${style.tint}" stroke="${style.accent}" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="${p.cx}" y="${y + 18}" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="1" fill="${style.text}">VERVOLGPROCES →</text>
        ${nameLinesHtml}
      </g>`;
    } else {
      // Activiteit: witte kaart, gekleurde accentbalk boven, type-chip + stapnummer.
      const label = STEP_TYPE_STYLE[s.stapType]?.label || style.label || 'Processtap';
      const x = p.cx - boxW / 2, y = p.cy - cardH / 2;
      const sel = isSelected ? `<rect x="${x - 5}" y="${y - 5}" width="${boxW + 10}" height="${cardH + 10}" rx="17" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${x + 16}" y="${y + 50 + i * lineHeight}" font-size="13" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <rect x="${x}" y="${y}" width="${boxW}" height="${cardH}" rx="12" fill="#FFFFFF" stroke="${isSelected ? '#005496' : '#DDE3EC'}" stroke-width="${isSelected ? 2 : 1.3}" filter="url(#proc-shadow)"/>
        <path d="M ${x + 12} ${y} H ${x + boxW - 12} A 12 12 0 0 1 ${x + boxW} ${y + 12} V ${y + 4.5} H ${x} V ${y + 12} A 12 12 0 0 1 ${x + 12} ${y} Z" fill="${style.accent}"/>
        <text x="${x + 16}" y="${y + 26}" font-size="9" font-weight="700" letter-spacing="1" fill="${style.text}">${escHtml(label.toUpperCase())}</text>
        <circle cx="${x + boxW - 22}" cy="${y + 24}" r="11" fill="${style.tint}" stroke="${style.accent}" stroke-width="1.2"/>
        <text x="${x + boxW - 22}" y="${y + 28}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${style.text}">${escHtml(String(s.stapNr))}</text>
        ${nameLinesHtml}
      </g>`;
    }
  }

  return `<svg id="procFlowSvg" viewBox="0 0 ${svgWidth} ${svgHeight}" data-nw="${svgWidth}" style="height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="proc-arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" fill="#A7B8CE"/>
      </marker>
      <filter id="proc-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#002E56" flood-opacity="0.12"/>
      </filter>
    </defs>
    ${laneBg}
    ${arrows}
    ${boxes}
    ${arrowLabels}
  </svg>`;
}

const NORMAAL_LEGEND = `
  <span><i style="background:#1D9E75;border-radius:50%;"></i>Start (event)</span>
  <span><i style="background:#005496;"></i>Processtap</span>
  <span><i style="background:#7F77DD;"></i>Actie / taak</span>
  <span><i style="background:#F26722;transform:rotate(45deg);"></i>Gateway (beslissing)</span>
  <span><i style="background:#4A6180;border:1px dashed #4A6180;background:transparent;"></i>Vervolgproces</span>
  <span><i style="background:#0B6E49;border-radius:50%;"></i>Einde (event)</span>`;

/* Kleuren per fase-categorie (MensCentraal) — zelfde huisstijlpalet
   als de rest van de app. 'header' is de donkere fase-balk (witte
   tekst), 'tag'/'text' voor lichte accenten. */
const MC_CAT_STYLE = {
  toegang:        { header: '#005496', label: 'Toegang' },
  toeleiden:      { header: '#1D9E75', label: 'Toeleiden / regie' },
  besluitvorming: { header: '#F26722', label: 'Besluitvorming' },
  kwaliteit:      { header: '#7F77DD', label: 'Kwaliteit / controle' },
  leveren:        { header: '#0C8FA0', label: 'Leveren / administratie' },
  afsluiting:     { header: '#4A6180', label: 'Afsluiting' },
};
const MC_VRAAGTYPE_STYLE = {
  datum: { cls: 'mc-tag-datum', label: 'Datumveld' },
  keuze: { cls: 'mc-tag-keuze', label: 'Keuzeveld' },
  getal: { cls: 'mc-tag-getal', label: 'Getalveld' },
};
let mcSelectedFase = null; // geselecteerde fase (nr) — detail verschijnt onder de tijdlijn
let mcSearchQuery = '';        // zoekterm binnen het geopende MC-proces

function mcLegendHtml(proc) {
  const usedCats = [...new Set(proc.fases.map(f => f.cat))];
  const catPart = usedCats.map(c => {
    const st = MC_CAT_STYLE[c] || MC_CAT_STYLE.toegang;
    return `<span><i style="background:${st.header};"></i>${escHtml(st.label)}</span>`;
  }).join('');
  const typePart = Object.values(MC_VRAAGTYPE_STYLE).map(t =>
    `<span><i class="${t.cls}" style="border-radius:3px;"></i>${t.label}</span>`).join('');
  return catPart + `<span style="width:1px;background:var(--bd);align-self:stretch;"></span>` + typePart;
}

function mcVraagTagHtml(v, q) {
  const st = MC_VRAAGTYPE_STYLE[v.type] || MC_VRAAGTYPE_STYLE.keuze;
  return `<span class="mc-tag ${st.cls}">${hlHtml(v.naam, q)}</span>`;
}

/* ── Secties bouwen: opeenvolgende fases met een spoor-label vormen
   samen één parallel blok; daarbinnen wordt per spoor-label een kolom
   gemaakt. Fases zonder spoor zijn gewone hoofdpad-stappen. ───────── */
function buildMcSections(fases) {
  const sections = [];
  let cur = null;
  for (const f of fases) {
    if (f.spoor) {
      if (!cur || cur.type !== 'parallel') { cur = { type: 'parallel', lanes: new Map() }; sections.push(cur); }
      if (!cur.lanes.has(f.spoor)) cur.lanes.set(f.spoor, []);
      cur.lanes.get(f.spoor).push(f);
    } else {
      if (!cur || cur.type !== 'seq') { cur = { type: 'seq', fases: [] }; sections.push(cur); }
      cur.fases.push(f);
    }
  }
  return sections;
}

/* Vaste toolbar (jumpbalk + zoekveld + alles-knoppen): wordt maar één
   keer gerenderd bij het openen, zodat het zoekveld focus houdt terwijl
   de flow eronder opnieuw getekend wordt. */
function mcToolbarHtml(proc) {
  const pills = proc.fases.map(f => {
    const st = MC_CAT_STYLE[f.cat] || MC_CAT_STYLE.toegang;
    return `<span class="mc-jump-pill" data-mcjump="${f.nr}" title="${escHtml(f.naam)} — ${f.vragen.length} vragen${f.spoor ? ' · pad: ' + escHtml(f.spoor) : ''}${f.optioneel ? ' (optioneel)' : ''}">
      <i style="background:${st.header};"></i>${f.nr}. ${escHtml(f.naam)}${f.optioneel ? ' *' : ''}
    </span>`;
  }).join('');
  return `<div class="mc-toolbar">
    <div class="mc-jumpbar">${pills}</div>
    <div class="mc-toolbar-row2">
      <div class="mc-search-wrap">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="mcSearchInput" placeholder="Zoek een vraag in dit proces…">
        <span class="mc-search-count" id="mcSearchCount"></span>
      </div>
    </div>
  </div>`;
}

/* Eén fase-kaart in de horizontale tijdlijn. Compact: gekleurde
   categoriebalk, stapnummer, naam en vraagtelling. Klikken selecteert
   de fase; de bijbehorende vragen verschijnen in het detailblok onder
   de tijdlijn. Bij een actieve zoekterm dimmen fases zonder treffer. */
function mcCardHtml(f, q) {
  const st = MC_CAT_STYLE[f.cat] || MC_CAT_STYLE.toegang;
  const matched = q ? f.vragen.filter(v => v.naam.toLowerCase().includes(q)) : f.vragen;
  const nameMatch = q && f.naam.toLowerCase().includes(q);
  const hasMatch = !q || matched.length > 0 || nameMatch;
  const sel = f.nr === mcSelectedFase;

  const counts = {};
  f.vragen.forEach(v => { counts[v.type] = (counts[v.type] || 0) + 1; });
  const miniHtml = Object.entries(counts).map(([type, n]) => {
    const ts = MC_VRAAGTYPE_STYLE[type] || MC_VRAAGTYPE_STYLE.keuze;
    return `<span class="mc-mini ${ts.cls}" title="${n} ${ts.label.toLowerCase()}en">${n}</span>`;
  }).join('');

  const optStripe = f.optioneel
    ? 'background-image:repeating-linear-gradient(135deg, rgba(255,255,255,.09) 0 8px, transparent 8px 16px);'
    : '';

  return `
    <div class="mc-card ${sel ? 'mc-card-sel' : ''} ${q && !hasMatch ? 'mc-fase-dim' : ''}"
         id="mcfase-${f.nr}" data-mcfase="${f.nr}" style="--fase-c:${st.header};">
      <div class="mc-card-hdr" style="background:${st.header};${optStripe}">
        <span class="mc-card-cat">${escHtml(st.label)}</span>
        <span class="mc-card-nr">${f.nr}</span>
      </div>
      <div class="mc-card-naam">${q ? hlHtml(f.naam, q) : escHtml(f.naam)}</div>
      <div class="mc-card-meta">
        ${miniHtml}
        <span class="mc-card-count">${q ? `${matched.length}/${f.vragen.length}` : f.vragen.length} vragen</span>
        ${f.optioneel ? '<span class="mc-card-opt">optioneel</span>' : ''}
      </div>
    </div>`;
}

/* Detailblok onder de tijdlijn: de vragen (tags) en vervolgpaden van
   de geselecteerde fase. Tijdens zoeken worden alleen treffers getoond. */
function mcDetailHtml(proc, q) {
  const f = proc.fases.find(x => x.nr === mcSelectedFase);
  if (!f) return '';
  const st = MC_CAT_STYLE[f.cat] || MC_CAT_STYLE.toegang;
  const shown = q ? f.vragen.filter(v => v.naam.toLowerCase().includes(q)) : f.vragen;
  const tagsHtml = f.vragen.length
    ? `<div class="mc-tags">${shown.map(v => mcVraagTagHtml(v, q)).join('')}</div>`
    : `<div class="mc-geen-vragen">Geen analyseerbare velden in deze fase</div>`;
  const vervolgHtml = f.vervolg.length
    ? `<div class="mc-paden">${f.vervolg.map(v => `<span class="mc-pad-pill">→ ${escHtml(v)}</span>`).join('')}</div>`
    : '';
  return `
    <div class="mc-detail" style="border-top-color:${st.header};">
      <div class="mc-detail-hdr">
        <span class="mc-detail-dot" style="background:${st.header};"></span>
        <span class="mc-detail-title">Stap ${f.nr} · ${escHtml(f.naam)}</span>
        <span class="mc-detail-cat" style="color:${st.header};border-color:${st.header};">${escHtml(st.label)}</span>
        ${f.optioneel ? '<span class="mc-card-opt">optioneel</span>' : ''}
        ${q ? `<span class="mc-card-count">${shown.length} van ${f.vragen.length} vragen zichtbaar</span>` : ''}
      </div>
      ${tagsHtml}
      ${vervolgHtml}
    </div>`;
}

/* Horizontale tijdlijn: fases van links naar rechts, parallelle sporen
   als rijen boven elkaar. Onder de tijdlijn het detailblok. */
function renderMcFlowHtml(proc) {
  const q = mcSearchQuery.trim().toLowerCase();
  const sections = buildMcSections(proc.fases);
  const conn = `<div class="mc-conn-h"><span class="mc-arr-h"></span></div>`;
  const parts = [];

  sections.forEach((sec, si) => {
    if (si > 0) parts.push(conn);

    if (sec.type === 'seq') {
      sec.fases.forEach((f, i) => {
        if (i > 0) parts.push(conn);
        parts.push(mcCardHtml(f, q));
      });
      return;
    }

    // Parallel blok: rij per spoor, boven elkaar. Bij één spoor komt er
    // een "regulier pad"-doorlooprij bij zodat zichtbaar blijft dat het
    // hoofdpad gewoon doorloopt.
    const lanes = [...sec.lanes.entries()];
    const laneHtml = lanes.map(([label, fases]) => {
      const inner = fases.map((f, i) => (i > 0 ? conn : '') + mcCardHtml(f, q)).join('');
      return `<div class="mc-par-lane"><span class="mc-lane-tag">${escHtml(label)}</span>${inner}</div>`;
    });
    if (lanes.length === 1) {
      laneHtml.unshift(`<div class="mc-par-lane mc-ghost-h">
        <span class="mc-lane-tag">Regulier pad</span>
        <span class="mc-ghost-line"></span><span>loopt direct door</span>
      </div>`);
    }
    parts.push(`<div class="mc-par">${laneHtml.join('')}</div>`);
  });

  return `<div class="mc-track">${parts.join('')}</div>${mcDetailHtml(proc, q)}`;
}

function renderMcFlow(proc) {
  const inner = document.getElementById('mcFlowInner');
  if (!inner) return;

  // Tijdens zoeken: als de geselecteerde fase geen treffer heeft,
  // automatisch doorspringen naar de eerste fase mét treffer.
  const q = mcSearchQuery.trim().toLowerCase();
  if (q) {
    const match = f => f.naam.toLowerCase().includes(q) || f.vragen.some(v => v.naam.toLowerCase().includes(q));
    const sel = proc.fases.find(f => f.nr === mcSelectedFase);
    if (!sel || !match(sel)) {
      const first = proc.fases.find(match);
      if (first) mcSelectedFase = first.nr;
    }
  }

  inner.innerHTML = renderMcFlowHtml(proc);
  const countEl = document.getElementById('mcSearchCount');
  if (countEl) {
    if (!q) { countEl.textContent = ''; }
    else {
      const n = proc.fases.reduce((acc, f) => acc + f.vragen.filter(v => v.naam.toLowerCase().includes(q)).length, 0);
      countEl.textContent = `${n} treffer${n === 1 ? '' : 's'}`;
    }
  }
}

/* Fase selecteren: kaart markeren, detail tonen en de kaart in beeld
   scrollen (ook gebruikt door de spring-navigatiebalk). */
function selectMcFase(faseNr) {
  const p = procEntries.find(x => x.id === currentProcId);
  if (!p || p.type !== 'menscentraal') return;
  mcSelectedFase = faseNr;
  renderMcFlow(p);
  const target = document.getElementById('mcfase-' + faseNr);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function onMcSearchInput(value) {
  const p = procEntries.find(x => x.id === currentProcId);
  if (!p || p.type !== 'menscentraal') return;
  mcSearchQuery = value || '';
  renderMcFlow(p);
}

/* ── Zoom voor normale (SVG-)processen ──────────────────────────
   'fit' = passend in het paneel; een getal = vaste schaal. Bij het
   openen van een proces starten we passend, maar nooit onleesbaar
   klein: onder 70%% schakelen we naar 100%% met scrollen. */
let procZoom = 'fit';

function flowToolbarHtml() {
  return `<div class="flow-toolbar">
    <button type="button" class="flow-zbtn" data-zoom="out" title="Uitzoomen">−</button>
    <span class="flow-zlabel" id="flowZoomLabel"></span>
    <button type="button" class="flow-zbtn" data-zoom="in" title="Inzoomen">+</button>
    <button type="button" class="flow-zbtn flow-zbtn-txt" data-zoom="100" title="Ware grootte">100%</button>
    <button type="button" class="flow-zbtn flow-zbtn-txt" data-zoom="fit" title="Passend in beeld">Passend</button>
  </div>`;
}

function applyProcZoom() {
  const svg = document.getElementById('procFlowSvg');
  const scroller = document.getElementById('flowScroll');
  if (!svg || !scroller) return;
  const nw = parseFloat(svg.dataset.nw);
  // 'Passend' mag ook licht opschalen (max 118%) als het diagram smaller
  // is dan het paneel — zo blijft het canvas niet nodeloos klein/leeg
  // wanneer een proces weinig stappen/rijbanen heeft.
  const scale = procZoom === 'fit' ? Math.min(1.18, (scroller.clientWidth - 20) / nw) : procZoom;
  svg.style.width = Math.round(nw * scale) + 'px';
  const label = document.getElementById('flowZoomLabel');
  if (label) label.textContent = Math.round(scale * 100) + '%';
}

function setProcZoom(action) {
  const svg = document.getElementById('procFlowSvg');
  if (!svg) return;
  const cur = svg.getBoundingClientRect().width / parseFloat(svg.dataset.nw);
  if (action === 'in') procZoom = Math.min(2, cur + 0.15);
  else if (action === 'out') procZoom = Math.max(0.4, cur - 0.15);
  else if (action === '100') procZoom = 1;
  else procZoom = 'fit';
  applyProcZoom();
}

/* Bouwt zoombalk + scrollcanvas + SVG en behoudt bij herbouw (stap
   aanklikken) de scrollpositie en zoomstand. */
function renderNormFlow(p, selectedStapNr) {
  const wrap = document.getElementById('procFlowWrap');
  const prev = document.getElementById('flowScroll');
  const keep = prev ? { l: prev.scrollLeft, t: prev.scrollTop } : null;

  const layerMap = computeStepLayers(p.steps);
  const lanes = computeLaneOrder(p.steps, layerMap);
  wrap.innerHTML = flowToolbarHtml() +
    `<div class="flow-scroll" id="flowScroll">${renderProcessFlowSVG(p.steps, layerMap, lanes, selectedStapNr)}</div>`;

  if (procZoom === 'fit') {
    const svg = document.getElementById('procFlowSvg');
    const scroller = document.getElementById('flowScroll');
    if (svg && scroller && (scroller.clientWidth - 20) / parseFloat(svg.dataset.nw) < 0.7) procZoom = 1;
  }
  applyProcZoom();
  if (keep) { const s = document.getElementById('flowScroll'); s.scrollLeft = keep.l; s.scrollTop = keep.t; }
}

/* Toont een proces in het vaste detailpaneel naast de lijst (geen
   popup meer). Dubbelklik-bestendig: opnieuw klikken op hetzelfde
   proces bouwt het gewoon opnieuw op, dat is goedkoop genoeg. */
function selectProcEntry(id) {
  currentProcId = id;
  const p = procEntries.find(x => x.id === id);
  if (!p) return;

  document.getElementById('procDetailEmpty').style.display = 'none';
  const content = document.getElementById('procDetailContent');
  content.style.display = 'flex';

  document.getElementById('procDetailTitle').textContent = p.naam;
  document.getElementById('procDetailTeamBadge').textContent = p.team || '—';
  document.getElementById('procDetailDesc').textContent = p.desc || '';
  document.getElementById('procStepDetail').innerHTML = '';

  const flowWrap = document.getElementById('procFlowWrap');
  const legend = document.getElementById('procDetailLegend');
  const sub = document.getElementById('procDetailSub');
  if (p.type === 'menscentraal') {
    mcSelectedFase = p.fases.length ? p.fases[0].nr : null;
    mcSearchQuery = '';
    flowWrap.innerHTML = `<div class="mc-container">${mcToolbarHtml(p)}<div id="mcFlowInner"></div></div>`;
    renderMcFlow(p);
    legend.innerHTML = mcLegendHtml(p);
    const totalVragen = p.fases.reduce((n, f) => n + f.vragen.length, 0);
    sub.textContent = `${p.fases.length} zaakstappen · ${totalVragen} vragen — klik op een stap voor de bijbehorende vragen`;
  } else {
    procZoom = 'fit';
    renderNormFlow(p, null);
    legend.innerHTML = NORMAAL_LEGEND;
    sub.textContent = `${p.steps.length} stappen — klik op een stap voor detail, zoom met + en −`;
  }

  // Selectie in de lijst zelf ook bijwerken zonder alles opnieuw te
  // filteren/renderen (voorkomt dat het zoekveld/scrollpositie springt).
  document.querySelectorAll('#procList .proc-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.id === id);
  });
}

function selectProcStep(stapNr) {
  const p = procEntries.find(x => x.id === currentProcId);
  if (!p || p.type === 'menscentraal') return;
  const step = p.steps.find(s => s.stapNr === stapNr);
  if (!step) return;

  renderNormFlow(p, stapNr);

  const subHtml = step.stapSub
    ? `<div style="font-size:.78rem;color:var(--sub);margin-top:2px;">${escHtml(step.stapSub)}</div>`
    : '';

  const vragenHtml = (step.stapVragen && step.stapVragen.length > 0)
    ? `<ul style="margin:10px 0 0;padding-left:18px;font-size:.82rem;color:var(--n);line-height:1.7;">
        ${step.stapVragen.map(v => `<li>${escHtml(v)}</li>`).join('')}
      </ul>`
    : '';

  document.getElementById('procStepDetail').innerHTML = `
    <div class="dash-modal-meta-grid" style="grid-template-columns:1fr;">
      <div class="meta-item">
        <div class="meta-key">Stap ${step.stapNr} — ${escHtml(step.stapNaam)}</div>
        ${subHtml}
        <div class="meta-val" style="font-weight:400;margin-top:8px;white-space:pre-wrap;">${escHtml(step.stapDesc) || (step.stapVragen.length === 0 ? 'Geen toelichting opgegeven.' : '')}</div>
        ${vragenHtml}
      </div>
    </div>`;
}

/* ====================================================================
   HOME — startpagina van de catalogus.
   Doel: één plek van waaruit je meteen naar Definities, Processen,
   Datavelden of Dashboards kunt, met een catalogusbrede zoekbalk die
   over alle vier datasets zoekt en direct doorlinkt naar het juiste
   resultaat (zelfde open-functies als de kruisverwijzingen elders in
   de app: openDefinitieFromChip, openDataveldFromChip, enz.).
   ==================================================================== */
function renderHome() {
  renderHomeTiles();
  renderHomeSearch();
}

/* Telt en breekt per sectie uit tot een korte, feitelijke samenvatting
   (geen decoratieve tekst — alles hieronder is een echt getal uit de
   geladen data). Vóór het laden staan de tegels op '—'. */
function renderHomeTiles() {
  const numDef = document.getElementById('homeCountDefinities');
  const numProc = document.getElementById('homeCountProcessen');
  const numDv = document.getElementById('homeCountDatavelden');
  const numDash = document.getElementById('homeCountDashboards');
  if (!numDef) return; // Home-view nog niet in de DOM (kan niet gebeuren, maar defensief)

  numDef.textContent = entries.length || '—';
  numProc.textContent = procEntries.length || '—';
  numDv.textContent = dvEntries.length || '—';
  numDash.textContent = dashEntries.length || '—';

  const chip = (n, label) => `<span>${n} ${escHtml(label)}</span>`;

  if (entries.length) {
    const vastgesteld = entries.filter(e => e.status === 'Vastgesteld').length;
    document.getElementById('homeBreakdownDefinities').innerHTML =
      chip(vastgesteld, 'vastgesteld') + chip(entries.length - vastgesteld, 'in behandeling');
  }

  if (procEntries.length) {
    const mc = procEntries.filter(p => p.type === 'menscentraal').length;
    document.getElementById('homeBreakdownProcessen').innerHTML =
      chip(procEntries.length - mc, 'normaal') + (mc ? chip(mc, 'MensCentraal') : '');
  }

  if (dvEntries.length) {
    const bronnen = new Set(dvEntries.map(d => d.src).filter(Boolean)).size;
    document.getElementById('homeBreakdownDatavelden').innerHTML = chip(bronnen, 'brontabellen');
  }

  if (dashEntries.length) {
    const extern = dashEntries.filter(d => (d.type || '').trim().toLowerCase() === 'extern').length;
    document.getElementById('homeBreakdownDashboards').innerHTML =
      chip(dashEntries.length - extern, 'intern') + chip(extern, 'extern');
  }
}

/* Catalogusbrede zoekfunctie: doorzoekt alle vier datasets tegelijk en
   toont per sectie de eerste paar treffers, met dezelfde badges/pills
   als de betreffende tab zelf (zodat een resultaat er niet als een
   nieuw, apart onderdeel uitziet). Leeg zoekveld = resultaten dicht. */
function renderHomeSearch() {
  const wrap = document.getElementById('homeSearchResults');
  const input = document.getElementById('homeSearch');
  if (!wrap || !input) return;
  const q = (input.value || '').trim().toLowerCase();
  if (!q) { wrap.classList.remove('show'); wrap.innerHTML = ''; return; }

  const MAX = 6;
  const defs = entries.filter(e => `${e.term} ${e.def}`.toLowerCase().includes(q)).slice(0, MAX);
  const dvs = dvEntries.filter(d => `${d.name} ${d.src} ${d.desc}`.toLowerCase().includes(q)).slice(0, MAX);
  const procs = procEntries.filter(p => `${p.naam} ${p.team} ${p.desc}`.toLowerCase().includes(q)).slice(0, MAX);
  const dashes = dashEntries.filter(d => `${d.name} ${d.team} ${d.desc}`.toLowerCase().includes(q)).slice(0, MAX);

  if (!defs.length && !dvs.length && !procs.length && !dashes.length) {
    wrap.innerHTML = `<div class="home-result-empty">Niets gevonden voor "${escHtml(q)}".</div>`;
    wrap.classList.add('show');
    return;
  }

  const group = (label, items, render) => items.length
    ? `<div class="home-result-group-label">${escHtml(label)}</div>` + items.map(render).join('')
    : '';

  wrap.innerHTML =
    group('Definities', defs, e => `
      <div class="home-result-item" data-home-def="${escHtml(e.id)}">
        <span class="home-result-term">${hlHtml(e.term, q)}</span>
        ${statusBadgeHtml(e.status)}
      </div>`) +
    group('Datavelden', dvs, d => `
      <div class="home-result-item" data-home-dv="${escHtml(d.id)}">
        <span class="home-result-term">${hlHtml(d.name, q)}</span>
        <span class="home-result-sub">${escHtml(d.src)}</span>
      </div>`) +
    group('Processen', procs, p => `
      <div class="home-result-item" data-home-proc="${escHtml(p.id)}">
        <span class="home-result-term">${hlHtml(p.naam, q)}</span>
        <span class="home-result-sub">${escHtml(p.team)}</span>
      </div>`) +
    group('Dashboards', dashes, d => `
      <div class="home-result-item" data-home-dash="${escHtml(d.id)}">
        <span class="home-result-term">${hlHtml(d.name, q)}</span>
        ${d.type ? `<span class="dash-badge ${dashTypeClass(d.type)}">${escHtml(d.type)}</span>` : ''}
      </div>`);
  wrap.classList.add('show');
}

/* Open een proces vanuit de Home-zoekresultaten: zelfde patroon als
   openDefinitieFromChip/openDataveldFromChip (filters leegmaken,
   naar de juiste tab, item selecteren). */
function openProcFromHome(id) {
  document.getElementById('procSearch').value = '';
  document.getElementById('procFilterTeam').value = '';
  document.getElementById('procFilterType').value = '';
  switchMainTab('processen');
  renderProcList();
  selectProcEntry(id);
}

/* Open een dashboard vanuit de Home-zoekresultaten. */
function openDashFromHome(id) {
  document.getElementById('dashSearch').value = '';
  document.getElementById('dashFilterType').value = '';
  document.getElementById('dashFilterTeam').value = '';
  switchMainTab('dashboards');
  renderDashTable();
  selectDashEntry(id);
  scrollRowIntoView('dashTableBody', id);
}

/* ====================================================================
   URL-ROUTING — elk tabblad krijgt een eigen pad (bijv. /definities) in
   de adresbalk, zodat verversen op dat pad je niet terugstuurt naar
   Home. GitHub Pages is een statische host: een directe request naar
   /definities bestaat niet als bestand, dus 404.html vangt dat op en
   stuurt door naar index.html met het gevraagde pad bewaard — zie de
   inline restore-script bovenaan index.html die dat pad weer terugzet
   vóórdat deze code draait.
   ==================================================================== */
const BASE_PATH = '/definitiecatalogus-medemblik';
const TAB_SLUGS = { home: '', definities: 'definities', processen: 'processen', datavelden: 'datavelden', dashboards: 'dashboards' };
const SLUG_TABS = Object.fromEntries(Object.entries(TAB_SLUGS).filter(([k]) => k !== 'home').map(([k, v]) => [v, k]));

function urlForTab(tab) {
  return BASE_PATH + '/' + (TAB_SLUGS[tab] || '');
}
function tabFromLocation() {
  let path = location.pathname;
  if (path.indexOf(BASE_PATH) === 0) path = path.slice(BASE_PATH.length);
  path = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  return SLUG_TABS[path] || 'home';
}

/* ====================================================================
   TABS
   ==================================================================== */
function switchMainTab(tab) {
  activeMainTab = tab;
  const views = {
    home: 'view-home',
    definities: 'view-definities',
    processen: 'view-processen',
    datavelden: 'view-datavelden',
    dashboards: 'view-dashboards',
  };
  Object.entries(views).forEach(([key, viewId]) => {
    const el = document.getElementById(viewId);
    if (!el) return;
    const isActive = key === tab;
    if (el.classList.contains('placeholder-view')) {
      el.classList.toggle('active', isActive);
    } else if (el.classList.contains('dv-view') || el.classList.contains('dash-view') || el.classList.contains('proc-view')) {
      el.classList.toggle('active', isActive);
    } else {
      el.style.display = isActive ? 'flex' : 'none';
    }
  });
  ['navHome','navDefinities','navProcessen','navDatavelden','navDashboards'].forEach(navId => {
    document.getElementById(navId).classList.remove('active');
  });
  const navMap = { home:'navHome', definities:'navDefinities', processen:'navProcessen', datavelden:'navDatavelden', dashboards:'navDashboards' };
  document.getElementById(navMap[tab]).classList.add('active');
  renderHeaderCounts();
  const newUrl = urlForTab(tab);
  if (location.pathname !== newUrl) {
    history.pushState({ tab }, '', newUrl);
  }
}

/* ====================================================================
   CHIP-NAVIGATIE — van definitie naar dataveld en terug
   ==================================================================== */
function openDataveldFromChip(dfId) {
  // Filters/zoek leegmaken zodat het veld gegarandeerd zichtbaar is
  document.getElementById('dvSearch').value = '';
  document.getElementById('dvFilterType').value = '';
  document.getElementById('dvFilterSrc').value = '';
  switchMainTab('datavelden');
  renderDvTable();
  selectDvEntry(dfId);
  scrollRowIntoView('dvTableBody', dfId);
}

function openDefinitieFromChip(defId) {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterCat').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterTeam').value = '';
  switchMainTab('definities');
  renderTable();
  selectEntry(defId);
  scrollRowIntoView('tableBody', defId);
}

function scrollRowIntoView(tbodyId, id) {
  const row = document.querySelector(`#${tbodyId} tr[data-id="${(window.CSS && CSS.escape) ? CSS.escape(id) : id}"]`);
  if (row) row.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

/* ====================================================================
   EVENT-DELEGATIE — één listener per container in plaats van inline
   onclick met string-interpolatie. Dit maakt rij-klikken ongevoelig
   voor rare tekens (aanhalingstekens e.d.) in id's uit het Sheet.
   ==================================================================== */
function initInteractions() {
  const byRow = (tbodyId, fn) => {
    document.getElementById(tbodyId).addEventListener('click', ev => {
      if (ev.target.closest('a')) return; // directe links (bijv. dashboard openen) niet als rij-klik behandelen
      const tr = ev.target.closest('tr[data-id]');
      if (tr) fn(tr.dataset.id);
    });
  };
  byRow('tableBody', selectEntry);
  byRow('dvTableBody', selectDvEntry);
  byRow('dashTableBody', selectDashEntry);
  document.getElementById('procList').addEventListener('click', ev => {
    const card = ev.target.closest('[data-id]');
    if (card) selectProcEntry(card.dataset.id);
  });
  document.getElementById('procFlowWrap').addEventListener('click', ev => {
    const zoomBtn = ev.target.closest('[data-zoom]');
    if (zoomBtn) { setProcZoom(zoomBtn.dataset.zoom); return; }
    const mcJump = ev.target.closest('[data-mcjump]');
    if (mcJump) { selectMcFase(parseInt(mcJump.dataset.mcjump, 10)); return; }
    const mcFase = ev.target.closest('[data-mcfase]');
    if (mcFase) { selectMcFase(parseInt(mcFase.dataset.mcfase, 10)); return; }
    // Vervolgproces-kader (subproces-type) met een geldige verwijzing:
    // springt naar dat proces i.p.v. alleen de stap te selecteren.
    const gotoBox = ev.target.closest('[data-goto-proc]');
    if (gotoBox) {
      const targetId = gotoBox.dataset.gotoProc;
      if (procEntries.some(pr => pr.id === targetId)) {
        renderProcList();
        selectProcEntry(targetId);
      }
      return;
    }
    const g = ev.target.closest('[data-stapnr]');
    if (g) selectProcStep(parseInt(g.dataset.stapnr, 10));
  });
  // Zoeken binnen een MensCentraal-proces: input-delegatie zodat de
  // listener ook werkt nadat het detailpaneel opnieuw is opgebouwd.
  document.getElementById('procFlowWrap').addEventListener('input', ev => {
    if (ev.target && ev.target.id === 'mcSearchInput') onMcSearchInput(ev.target.value);
  });
  document.getElementById('dFields').addEventListener('click', ev => {
    const chip = ev.target.closest('[data-dfid]');
    if (chip) openDataveldFromChip(chip.dataset.dfid);
  });
  document.getElementById('dvUsedInList').addEventListener('click', ev => {
    const chip = ev.target.closest('[data-defid]');
    if (chip) openDefinitieFromChip(chip.dataset.defid);
  });
  // Home: navigatietegels + catalogusbrede zoekresultaten
  document.getElementById('view-home').addEventListener('click', ev => {
    const t = ev.target;
    const tile = t.closest('[data-home-tile]');
    if (tile) { switchMainTab(tile.dataset.homeTile); return; }
    const def = t.closest('[data-home-def]');
    if (def) { openDefinitieFromChip(def.dataset.homeDef); return; }
    const dv = t.closest('[data-home-dv]');
    if (dv) { openDataveldFromChip(dv.dataset.homeDv); return; }
    const proc = t.closest('[data-home-proc]');
    if (proc) { openProcFromHome(proc.dataset.homeProc); return; }
    const dash = t.closest('[data-home-dash]');
    if (dash) { openDashFromHome(dash.dataset.homeDash); return; }
  });
}

/* ====================================================================
   OPSTARTEN
   ==================================================================== */
window.addEventListener('resize', () => { if (procZoom === 'fit') applyProcZoom(); });

// Terug/vooruit-knop van de browser: tabblad volgen zonder een nieuwe
// history-entry te pushen (die staat er al, dat deed pushState eerder).
window.addEventListener('popstate', () => {
  switchMainTab(tabFromLocation());
});

// Open bij het laden meteen het tabblad dat bij de URL hoort (bijv. na
// een refresh op /definities, of via de 404.html-doorstuurtruc).
switchMainTab(tabFromLocation());

initInteractions();
loadAllData();
