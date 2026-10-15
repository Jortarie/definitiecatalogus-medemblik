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
  gray:   {bg:'#F2F5F7', color:'#3D5A75'},
};
const STATUS_BADGE_CLASS = {
  'Vastgesteld': 'bdg-vastgesteld',
  'Definitie en context controleren': 'bdg-review',
  'Data velden zoeken': 'bdg-concept',
  'Toewijzen': 'bdg-concept', // nog geen datavelden gekoppeld
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

const schoon = s => String(s || '').replace(/\s+/g, ' ').trim(); // losse/dubbele spaties weg

function mapDefinitiesRows(records) {
  const rows = [], rowIssues = [], seen = new Set();
  const VELD_KOLOMMEN = ['Veld1', 'Veld2', 'Veld3', 'Veld4', 'Veld5', 'Veld6', 'Veld7', 'Veld8'];
  for (const r of records) {
    const id = (r.id || '').trim();
    // Lege regels in het Sheet (wel een id, geen term) stil overslaan.
    if (!schoon(r.Term) && !schoon(r.Definitie)) continue;
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
      id, term: schoon(r.Term), def: decodeText(r.Definitie), ctx: decodeText(r.Businesscontext),
      fields: '', cat: schoon(r.Categorie), team: schoon(r.Team),
      // Kolomnamen: zowel de oude (date/Notes) als de nieuwe Nederlandse
      // (Datum vastgesteld/Opmerkingen) worden gelezen.
      status: (r.Status || '').trim(), date: schoon(r['Datum vastgesteld'] || r.date), notes: decodeText(r.Opmerkingen || r.Notes),
      veldIds, fieldChips: [], fieldsFull: decodeText(r['Velden en berekeningen'] || r['Velden en berekenignen']),
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
    if (!schoon(r.Naam) && !schoon(r.Dataveld)) continue; // lege regel
    if (!id) { rowIssues.push(`Rij zonder id overgeslagen (name: "${r.Naam || '?'}")`); continue; }
    if (seen.has(id)) { rowIssues.push(`Dubbele id "${id}" overgeslagen (eerdere rij blijft staan)`); continue; }
    seen.add(id);
    rows.push({
      id, name: schoon(r.Naam), desc: decodeText(r.Beschrijving), type: schoon(r.Type),
      src: r.Tabel || '', col: r.Dataveld || '', values: decodeText(r.values), ext: '',
    });
  }
  return { rows, rowIssues };
}

function mapDashboardsRows(records) {
  const rows = [], rowIssues = [], seen = new Set();
  for (const r of records) {
    const id = (r.id || '').trim();
    if (!schoon(r.Naam)) continue; // lege regel
    if (!id) { rowIssues.push(`Rij zonder id overgeslagen (name: "${r.Naam || '?'}")`); continue; }
    if (seen.has(id)) { rowIssues.push(`Dubbele id "${id}" overgeslagen`); continue; }
    seen.add(id);
    rows.push({
      id, name: schoon(r.Naam), type: (r.type || '').trim(), desc: decodeText(r.Beschrijving),
      loc: r.Locatie || '', team: schoon(r.team), link: r.link || '', updated: r.updated || '',
      // Optionele kolom "Begrippen" (;-gescheiden D-ids, bijv. "D-001;D-014"):
      // welke definities dit dashboard al toont.
      // Namen van definities, zoals een Google Sheets-keuzemenu met
      // meerdere selecties ze opslaat ("Wachttijd, Caseload"). Ook ; of
      // een nieuwe regel als scheiding, en D-nummers, werken. Het opdelen
      // gebeurt pas bij het tonen (zie splitBegrippen), als de definities
      // geladen zijn — zo breekt een term mét komma niet in stukken.
      dekt: String(r.Begrippen || '').trim(),
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
  const [defRes, dvRes, dashRes, procRes] = await Promise.all([
    fetchAndMap(SHEET_URLS.definities, mapDefinitiesRows),
    fetchAndMap(SHEET_URLS.datavelden, mapDataveldenRows),
    fetchAndMap(SHEET_URLS.dashboards, mapDashboardsRows),
    fetchAndMap(SHEET_URLS.processen, mapProcessenRows),
  ]);
  entries = defRes.rows;
  dvEntries = dvRes.rows;
  dashEntries = dashRes.rows;
  procEntries = procRes.rows;

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

/* Maakt van "D-012" in een tekst een klikbare verwijzing met de naam van
   die definitie erachter, zodat je ziet waar het nummer nu naar wijst
   (en een verkeerd nummer meteen opvalt). Een nummer dat niet bestaat
   krijgt een vraagteken. Tekst tussen [vierkante haken] is een
   instelbare waarde (bijv. "[31 dagen]") en krijgt een eigen markering. */
function linkDefRefs(text) {
  const byId = new Map(entries.map(x => [x.id, x]));
  return escHtml(text || '')
    .replace(/\[([^\]\n]{1,40})\]/g, '<span class="param" title="Instelbare waarde">$1</span>')
    .replace(/\bD-\d{3}\b/g, id => {
      const t = byId.get(id);
      return t
        ? `<a class="defref" href="#" data-defref="${id}" title="Open ${escHtml(t.term)}">${id}<span class="defref-term"> · ${escHtml(t.term)}</span></a>`
        : `<span class="defref defref-kapot" title="Deze definitie bestaat niet">${id} (bestaat niet)</span>`;
    });
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
  document.getElementById('dDef').innerHTML = e.def ? linkDefRefs(e.def) : '—';

  toggleSection('dCtxSection', e.ctx, 'dCtx');
  toggleSection('dFieldsFullSection', e.fieldsFull, 'dFieldsFull');
  toggleSection('dNotesSection', e.notes, 'dNotes');
  if (e.ctx) document.getElementById('dCtx').innerHTML = linkDefRefs(e.ctx);
  if (e.fieldsFull) document.getElementById('dFieldsFull').innerHTML = linkDefRefs(e.fieldsFull);
  if (e.notes) document.getElementById('dNotes').innerHTML = linkDefRefs(e.notes);

  // Omgekeerde richting: in welke andere definities wordt dit begrip genoemd?
  const genoemdIn = entries.filter(x => x.id !== e.id && new RegExp(`\\b${e.id}\\b`).test(`${x.def} ${x.ctx} ${x.notes} ${x.fieldsFull}`));
  const refSec = document.getElementById('dRefsSection');
  if (genoemdIn.length) {
    document.getElementById('dRefsLabel').textContent = `Genoemd in ${genoemdIn.length} andere definitie${genoemdIn.length > 1 ? 's' : ''}`;
    document.getElementById('dRefs').innerHTML = genoemdIn.map(x =>
      `<button type="button" class="defref-chip" data-defref="${escHtml(x.id)}">${escHtml(x.id)} · ${escHtml(x.term)}</button>`).join('');
    refSec.style.display = '';
  } else {
    refSec.style.display = 'none';
  }

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

/* Deelt de kolom "Begrippen" op in losse definitienamen. Scheiding: komma
   (zo slaat een Google Sheets-keuzemenu met meerdere selecties het op),
   puntkomma of nieuwe regel. Stukken tussen komma's worden weer aan
   elkaar gezet als ze samen een bestaande term vormen, zodat een term
   met een komma erin heel blijft. */
function splitBegrippen(tekst) {
  const termen = new Set(entries.map(e => e.term.toLowerCase()));
  const uit = [];
  for (const deel of String(tekst || '').split(/[;\n]/)) {
    const stukken = deel.split(',').map(s => s.trim()).filter(Boolean);
    for (let i = 0; i < stukken.length; i++) {
      let kandidaat = stukken[i], j = i;
      for (let k = i + 1; k < stukken.length && !termen.has(kandidaat.toLowerCase()); k++) {
        const langer = stukken.slice(i, k + 1).join(', ');
        if (termen.has(langer.toLowerCase())) { kandidaat = langer; j = k; break; }
      }
      uit.push(kandidaat); i = j;
    }
  }
  return [...new Set(uit)];
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

  // Definities die onder dit dashboard hangen (kolom "Begrippen" in het
  // Sheet). Elke regel opent de definitie op de Definities-tab.
  const defs = splitBegrippen(d.dekt).map(ref => {
    const m = ref.match(/^D-\d+/i);
    const e = m ? entries.find(x => x.id.toUpperCase() === m[0].toUpperCase())
                : entries.find(x => x.term.toLowerCase() === ref.toLowerCase());
    return { ref, e };
  });
  const lijst = document.getElementById('dashModalDefs');
  document.getElementById('dashModalDefsLabel').textContent =
    `Definities in dit dashboard${defs.length ? ` (${defs.length})` : ''}`;
  lijst.innerHTML = defs.length
    ? defs.map(({ ref, e }) => e
        ? `<button type="button" class="dash-def" data-defref="${escHtml(e.id)}" title="Open de definitie">
             <span class="dash-def-term">${escHtml(e.term)}</span>
             <svg class="dash-def-pijl" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
           </button>`
        : `<div class="dash-def dash-def-onbekend"><span class="dash-def-term">${escHtml(ref)} — niet gevonden in de definities</span></div>`
      ).join('')
    : `<div class="dash-nolink">Nog geen definities gekoppeld. Kies ze in het Sheet in de kolom "Begrippen" bij dit dashboard.</div>`;

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

  const filtered = procEntries.filter(p => {
    if (ft && p.team !== ft) return false;
    if (q && !(`${p.naam} ${p.team} ${p.desc}`.toLowerCase().includes(q))) return false;
    return true;
  });

  document.getElementById('procCountLabel').textContent = `${filtered.length} processen`;

  const list = document.getElementById('procList');
  if (filtered.length === 0) {
    list.innerHTML = procEntries.length === 0
      ? `<div class="empty-state">Nog geen processen — voeg rijen toe aan het 'processen'-tabblad in Google Sheets.</div>`
      : `<div class="empty-state">Geen processen gevonden.</div>`;
    return;
  }

  list.innerHTML = filtered.map(p => {
    // Rijbanen tellen we hetzelfde als bij het tekenen van het diagram
    // (computeStepLayers/computeLaneOrder), zodat de tegel exact
    // aansluit op wat je straks in de fullscreen-weergave ziet.
    const layerMap = computeStepLayers(p.steps);
    const laneCount = computeLaneOrder(p.steps, layerMap).length;
    const countLabel = `${p.steps.length} stappen · ${laneCount} rijba${laneCount === 1 ? 'an' : 'nen'}`;
    const typeBadge = '';
    const sel = p.id === currentProcId ? ' proc-tile-active' : '';
    return `
    <div class="proc-tile${sel}" data-id="${escHtml(p.id)}">
      <div class="proc-tile-top">
        <span class="proc-tile-team">${hlHtml(p.team, q) || '—'}</span>
        ${typeBadge}
      </div>
      <div class="proc-tile-naam">${hlHtml(p.naam, q)}</div>
      <div class="proc-tile-desc">${hlHtml(p.desc, q) || 'Geen beschrijving'}</div>
      <div class="proc-tile-meta">
        <span>${countLabel}</span>
        <span class="proc-tile-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
        </span>
      </div>
    </div>`;
  }).join('');
}

/* ── Layout: wijst elke stap een verticale laag toe op basis van de
   langste keten van voorgangers, zodat samenkomende paden (zoals
   stap 4 en 5 die beide naar 6 gaan) na hun laatste voorganger
   komen. ──────────────────────────────────────────────────────── */
function computeStepLayers(steps) {
  // Terugkoppelingen (bijv. "Nee → terug naar onderzoek") eerst
  // opsporen met een diepte-eerst-doorloop vanaf de startstappen. Die
  // tellen niet mee voor de kolomindeling; anders schuift een lus het
  // hele proces terug naar voren en lopen de lijnen door elkaar.
  const nrs = new Set(steps.map(s => s.stapNr));
  const byNr = new Map(steps.map(s => [s.stapNr, s]));
  const backEdges = new Set();
  const state = new Map(); // 1 = op de stapel, 2 = klaar
  function dfs(nr) {
    state.set(nr, 1);
    for (const next of (byNr.get(nr).volgendeStap || [])) {
      if (!nrs.has(next)) continue;
      if (state.get(next) === 1) backEdges.add(`${nr}>${next}`);
      else if (!state.has(next)) dfs(next);
    }
    state.set(nr, 2);
  }
  const hasIncoming = new Set();
  steps.forEach(s => (s.volgendeStap || []).forEach(n => hasIncoming.add(n)));
  steps.filter(s => s.stapType === 'start' || !hasIncoming.has(s.stapNr)).forEach(s => { if (!state.has(s.stapNr)) dfs(s.stapNr); });
  steps.forEach(s => { if (!state.has(s.stapNr)) dfs(s.stapNr); });

  const incoming = new Map(steps.map(s => [s.stapNr, []]));
  for (const s of steps) {
    for (const next of s.volgendeStap) {
      if (incoming.has(next) && !backEdges.has(`${s.stapNr}>${next}`)) incoming.get(next).push(s.stapNr);
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

function wrapToTwoLines(str, maxCharsPerLine, maxLines = 2) {
  const words = String(str || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    } else {
      current = candidate;
    }
  }
  if (lines.length < maxLines && current) lines.push(current);
  const consumedWords = lines.join(' ').split(/\s+/).length;
  if (consumedWords < words.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.length > 3 ? last.slice(0, -1) + '…' : last + '…';
  }
  return lines;
}

function renderProcessFlowSVG(steps, layerMap, lanes, selectedStapNr) {
  // Compacte maten (okt 2026): kleinere kaarten en kieren, zodat een
  // heel proces vaker in één scherm past zonder te hoeven scrollen.
  const boxW = 160, cardH = 60, lineHeight = 14.5, colGap = 44, cellH = 116, padding = 22;
  const laneLabelW = 138;

  const wrapped = new Map();
  for (const s of steps) wrapped.set(s.stapNr, ['start','einde','beslissing','parallel'].includes(s.stapType)
    ? wrapToTwoLines(s.stapNaam, 22)
    : wrapToTwoLines(s.stapNaam, 16, 3));

  const maxLayer = Math.max(...layerMap.values());
  const { subrowByStep, cellCountByLane } = computeSubrows(lanes, layerMap);

  const svgWidth = padding * 2 + laneLabelW + (maxLayer + 1) * boxW + maxLayer * colGap;

  // Y-positie van elke lane-baan (gestapeld, hoogte = aantal sub-rijen × cellH).
  // Geschatte breedte van de geroteerde (verticale) rijbaan-labeltekst
  // (font-size 10.5, bold, uppercase, letter-spacing 0.4) — een lange
  // rolnaam (bijv. "Mdw. of Coördinator Financiën Sociaal Domein") mag
  // niet hoger uitvallen dan de rijbaan zelf, anders prikt de tekst in
  // de rijbaan erboven/eronder als die maar één rij stappen bevat.
  const laneLabelLines = label => wrapToTwoLines(label, 15, 3);
  const laneLabelMinHeight = label => laneLabelLines(label).length * 14 + 24;

  const laneTop = new Map();
  const laneHeight = new Map();
  // Als een label de rijbaan hoger maakt dan de stappen zelf nodig
  // hebben (bijv. één stap in een rijbaan met een lange rolnaam), komt
  // die extra ruimte als gelijke marge boven én onder de stappen —
  // anders zouden ze bovenaan een te hoge band blijven "plakken".
  const laneContentOffset = new Map();
  {
    let cursorY = padding;
    lanes.forEach((lane, laneIdx) => {
      const naturalH = cellCountByLane.get(laneIdx) * cellH;
      const h = Math.max(naturalH, laneLabelMinHeight(lane.label));
      laneTop.set(laneIdx, cursorY);
      laneHeight.set(laneIdx, h);
      laneContentOffset.set(laneIdx, (h - naturalH) / 2);
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
    const cy = laneTop.get(laneIdx) + laneContentOffset.get(laneIdx) + subrow * cellH + cellH / 2;
    pos.set(s.stapNr, { cx, cy, laneIdx });
  }

  // Halve breedte per vorm — bepaalt waar een pijl de vorm raakt.
  function halfW(stapType) {
    if (stapType === 'start' || stapType === 'einde') return 17;
    if (stapType === 'beslissing' || stapType === 'parallel') return 22;
    return boxW / 2; // proces, actie, subproces
  }

  // Ja/nee/kort/langdurig-labels op pijlen krijgen een betekenisvolle kleur.
  function arrowLabelStyle(label) {
    const l = (label || '').trim().toLowerCase();
    if (l === 'ja' || l === 'akkoord')  return { bg: '#E1F1E8', border: '#A6D3BA', text: '#006B3A' };
    if (l === 'nee' || l === 'afwijzen') return { bg: '#F6E6F2', border: '#E2B7D7', text: '#8E1770' };
    return { bg: '#FFFFFF', border: '#9DBEDD', text: '#005496' };
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

  // Halve hoogte per vorm — bepaalt waar een verticale (boven/onder)
  // aansluiting de vorm raakt. Terugkoppel-/luslijnen verlaten en
  // betreden een vakje altijd via boven/onder/rechts i.p.v. via de
  // linkerzijde, zodat een lus nooit met de gewone voortgangsrichting
  // (die altijd via links/rechts loopt) kan worden verward.
  function halfH(stapType) {
    if (stapType === 'start' || stapType === 'einde') return 17;
    if (stapType === 'beslissing' || stapType === 'parallel') return 22;
    return cardH / 2; // proces, actie, subproces (grootste vorm)
  }
  const SHAPE_MAXHALF = cardH / 2; // grootste mogelijke halve hoogte, voor veilige marges

  // Rechthoek van een stap — gebruikt om te controleren dat een
  // terugkoppellijn nooit dwars door een ander vakje heen loopt.
  function stepRect(stp) {
    const p = pos.get(stp.stapNr);
    if (!p) return null;
    return {
      x1: p.cx - halfW(stp.stapType), x2: p.cx + halfW(stp.stapType),
      y1: p.cy - halfH(stp.stapType), y2: p.cy + halfH(stp.stapType),
    };
  }
  const allRects = steps.map(st => ({ nr: st.stapNr, r: stepRect(st) })).filter(x => x.r);

  // Rechterrand van een kolom (layer) — ongeacht de vorm van de stap
  // zelf (die staat altijd gecentreerd in de kolom), zodat een kanaal
  // consistent in het midden van een kolomtussenruimte kan liggen.
  function colRightEdge(layerNr) { return padding + laneLabelW + layerNr * (boxW + colGap) + boxW; }
  const chanUseByTargetLayer = new Map(); // spreidt kanalen die dezelfde doelkolom delen

  // Elke verbinding wordt eerst als rechte, haakse puntenreeks (polylijn)
  // opgebouwd — precies zoals in de officiële procesplaten: nooit
  // diagonaal of gebogen. Pas ná deze stap (zie verderop) worden
  // kruisingen tussen lijnen opgespoord en krijgt de terugkoppellijn op
  // zo'n punt een duidelijke "sprong", zodat nooit onduidelijk is welke
  // lijn doorloopt.
  const edges = [];
  for (const s of steps) {
    const from = pos.get(s.stapNr);
    s.volgendeStap.forEach((nextNr, idx) => {
      const to = pos.get(nextNr);
      if (!from || !to) return;
      const label = (s.volgendeLabel && s.volgendeLabel[idx]) || '';
      const toStep = steps.find(x => x.stapNr === nextNr);
      const toType = toStep ? toStep.stapType : '';
      const fromLayer = layerMap.get(s.stapNr), toLayer = layerMap.get(nextNr);
      const backward = toLayer <= fromLayer;

      let pts, labelX, labelY;

      if (!backward) {
        // ── Vooruit: de normale procesgang, altijd van links naar rechts ──
        const x1 = from.cx + halfW(s.stapType), y1 = from.cy;
        const x2 = to.cx - halfW(toType), y2 = to.cy;
        const layerDist = toLayer - fromLayer;
        const midX = (x1 + x2) / 2;

        if (layerDist > 1) {
          // Slaat een of meer kolommen over: via een recht "plateau"
          // boven (of onder, als er boven geen ruimte is) de
          // tussenliggende vakjes — i.p.v. er dwars doorheen, en zonder
          // boog: enkel rechte stukken, net als de officiële platen.
          const bowUp = Math.min(y1, y2) > padding + cellH * 0.75;
          const bow = 40 + 10 * (layerDist - 1);
          const shelfY = bowUp ? Math.min(y1, y2) - bow : Math.max(y1, y2) + bow;
          pts = [{ x: x1, y: y1 }, { x: x1 + 22, y: y1 }, { x: x1 + 22, y: shelfY },
                 { x: x2 - 22, y: shelfY }, { x: x2 - 22, y: y2 }, { x: x2 - 2, y: y2 }];
          labelX = midX; labelY = shelfY + (bowUp ? -10 : 18);
        } else if (y1 === y2) {
          // Zelfde rijbaan, volgende kolom: kaarsrechte lijn.
          pts = [{ x: x1, y: y1 }, { x: x2 - 2, y: y2 }];
          labelX = midX; labelY = y1 - 16;
        } else {
          // Volgende kolom, andere rijbaan: haakse "elleboog" via het
          // midden van de kolomtussenruimte — geen curve meer.
          pts = [{ x: x1, y: y1 }, { x: midX, y: y1 }, { x: midX, y: y2 }, { x: x2 - 2, y: y2 }];
          labelX = midX; labelY = (y2 > y1 ? y2 - 22 : y2 + 22);
        }
      } else {
        // ── Terugkoppeling ("terug naar…", lus) — eigen kanaal ──────────
        // Verlaat de stap altijd via boven/onder (nooit via de zijkant,
        // die is voor de voortgangsrichting) en komt terug binnen via de
        // rechterrand van het doel, via een verticaal kanaal net na de
        // doelkolom — zo kan een terugkoppellijn nooit dwars door een
        // vakje lopen, en blijft ze meteen herkenbaar als lus.
        const fromType = s.stapType;
        const sameCol = fromLayer === toLayer;
        const blockerBetween = sameCol && allRects.some(({ nr, r }) =>
          nr !== s.stapNr && nr !== nextNr && r.x1 < from.cx + 6 && r.x2 > from.cx - 6 &&
          r.y1 < Math.max(from.cy, to.cy) && r.y2 > Math.min(from.cy, to.cy));

        if (sameCol && !blockerBetween) {
          // Eenvoudigste geval: zelfde kolom, niets ertussen — kaarsrechte
          // verticale lijn (bijv. "opnieuw controleren" rechtstreeks naar
          // het vakje erboven).
          const down = to.cy > from.cy;
          const y1 = from.cy + (down ? halfH(fromType) : -halfH(fromType));
          const y2 = to.cy + (down ? -halfH(toType) - 2 : halfH(toType) + 2);
          pts = [{ x: from.cx, y: y1 }, { x: to.cx, y: y2 }];
          labelX = from.cx + 40; labelY = (y1 + y2) / 2;
        } else {
          const exitTop = to.cy <= from.cy;
          const boundaryY = exitTop ? from.cy - halfH(fromType) : from.cy + halfH(fromType);
          // Reisviveau ligt altijd voorbij de grootst mógelijke vormhoogte
          // in deze rijbaan (niet alleen die van deze stap) plus marge —
          // zo schampt de lijn nooit een ander vakje in dezelfde rij.
          // Vormen met de naam eronder (start/einde/beslissing): de lus
          // vertrekt onder die naam langs, niet er dwars doorheen.
          const nameBelow = ['start', 'einde', 'beslissing', 'parallel'].includes(fromType)
            ? halfH(fromType) + 8 + (wrapped.get(s.stapNr) || []).length * lineHeight : 0;
          const travelY = exitTop
            ? from.cy - SHAPE_MAXHALF - 12
            : from.cy + Math.max(SHAPE_MAXHALF + 12, nameBelow + 6);
          let chX = colRightEdge(toLayer) + colGap / 2;
          const used = chanUseByTargetLayer.get(toLayer) || 0;
          chX += used * 10;
          chanUseByTargetLayer.set(toLayer, used + 1);
          const enterX = to.cx + halfW(toType) + 2;
          // Binnenkomen net boven het midden van de rechterzijde, zodat de
          // lus niet samenvalt met de gewone pijl die daar vertrekt.
          const enterY = to.cy - Math.min(14, halfH(toType) - 6);
          pts = [
            { x: from.cx, y: boundaryY }, { x: from.cx, y: travelY },
            { x: chX, y: travelY }, { x: chX, y: enterY }, { x: enterX, y: enterY },
          ];
          labelX = (from.cx + chX) / 2; labelY = travelY + (exitTop ? -10 : 18);
        }
      }

      edges.push({ backward, pts, label, labelX, labelY });
    });
  }

  // ── Kruisingen: waar een terugkoppellijn een andere lijn kruist krijgt
  // ze een duidelijke "sprong" (halve cirkel, zoals bij bedradings-
  // schema's) — zo is nooit onduidelijk welke lijn doorloopt. Rechte
  // lijnen kruisen elkaar het liefst zo min mogelijk (vandaar de eigen
  // kanalen hierboven); waar het toch gebeurt, is het altijd zichtbaar.
  const segsOf = ptsArr => { const out = []; for (let i = 0; i < ptsArr.length - 1; i++) out.push({ i, a: ptsArr[i], b: ptsArr[i + 1] }); return out; };
  edges.forEach((edge, ei) => {
    if (!edge.backward) return;
    const jumps = [];
    const mySegs = segsOf(edge.pts);
    edges.forEach((other, oi) => {
      if (oi === ei) return;
      if (other.backward && oi < ei) return; // eerder-getekende lus loopt door, latere springt
      const otherSegs = segsOf(other.pts);
      mySegs.forEach(seg => {
        const segHoriz = seg.a.y === seg.b.y;
        otherSegs.forEach(oseg => {
          const osegHoriz = oseg.a.y === oseg.b.y;
          if (segHoriz === osegHoriz) return; // enkel haakse (H×V) kruisingen tellen
          const h = segHoriz ? seg : oseg, v = segHoriz ? oseg : seg;
          const hx1 = Math.min(h.a.x, h.b.x), hx2 = Math.max(h.a.x, h.b.x);
          const vy1 = Math.min(v.a.y, v.b.y), vy2 = Math.max(v.a.y, v.b.y);
          const ix = v.a.x, iy = h.a.y;
          if (ix > hx1 + 3 && ix < hx2 - 3 && iy > vy1 + 3 && iy < vy2 - 3) jumps.push({ segIdx: seg.i, x: ix, y: iy });
        });
      });
    });
    edge.jumps = jumps;
  });

  // Zet een polylijn (met eventuele sprongpunten) om in een SVG-pad.
  function polylineToPath(ptsArr, jumps) {
    let d = `M ${ptsArr[0].x} ${ptsArr[0].y}`;
    for (let i = 0; i < ptsArr.length - 1; i++) {
      const p1 = ptsArr[i], p2 = ptsArr[i + 1];
      const horiz = p1.y === p2.y;
      const dirSign = horiz ? Math.sign(p2.x - p1.x) : Math.sign(p2.y - p1.y);
      const segJumps = (jumps || []).filter(j => j.segIdx === i);
      if (!segJumps.length || dirSign === 0) { d += ` L ${p2.x} ${p2.y}`; continue; }
      segJumps.sort((a, b) => horiz ? (a.x - b.x) * dirSign : (a.y - b.y) * dirSign);
      const r = 7;
      let cur = p1;
      for (const j of segJumps) {
        if (horiz) {
          const bx1 = j.x - r * dirSign, bx2 = j.x + r * dirSign;
          d += ` L ${bx1} ${cur.y} A ${r} ${r} 0 0 ${dirSign > 0 ? 1 : 0} ${bx2} ${cur.y}`;
          cur = { x: bx2, y: cur.y };
        } else {
          const by1 = j.y - r * dirSign, by2 = j.y + r * dirSign;
          d += ` L ${cur.x} ${by1} A ${r} ${r} 0 0 ${dirSign > 0 ? 1 : 0} ${cur.x} ${by2}`;
          cur = { x: cur.x, y: by2 };
        }
      }
      d += ` L ${p2.x} ${p2.y}`;
    }
    return d;
  }

  // Pijllijnen en labels apart bijhouden: labels worden helemaal aan het
  // eind (ná de kaarten/vormen) getekend, zodat een label-chipje nooit
  // onder een kaart of een andere pijl kan wegvallen — SVG tekent later
  // opgegeven elementen bovenop eerdere.
  let arrows = '';
  let arrowLabels = '';
  edges.forEach(edge => {
    const d = polylineToPath(edge.pts, edge.jumps);
    const stroke = edge.backward ? '#B41E8E' : '#7F93AB';
    const marker = edge.backward ? 'proc-arrowhead-terug' : 'proc-arrowhead';
    const dash = edge.backward ? ' stroke-dasharray="5 4"' : '';
    arrows += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.6"${dash} marker-end="url(#${marker})"/>`;
    if (edge.label) {
      const st = arrowLabelStyle(edge.label);
      const lines = wrapLabel(edge.label);
      const w = Math.max(32, Math.max(...lines.map(l => l.length)) * 6.2 + 14);
      const h = lines.length > 1 ? 32 : 20;
      arrowLabels += `<rect x="${edge.labelX - w / 2}" y="${edge.labelY - h / 2}" width="${w}" height="${h}" rx="3" fill="${st.bg}" stroke="${st.border}" stroke-width="1"/>`;
      lines.forEach((line, i) => {
        const ly = lines.length > 1 ? edge.labelY - 4 + i * 12 : edge.labelY + 3.5;
        arrowLabels += `<text x="${edge.labelX}" y="${ly}" text-anchor="middle" font-size="10" font-weight="700" fill="${st.text}">${escHtml(line)}</text>`;
      });
    }
  });

  // Lane-banen: afwisselend lichte achtergrond + rolnaam verticaal
  // links, zoals in de officiële procesplaten (swimlanes per BPMN-
  // modelleerconventies Medemblik).
  let laneBg = '';
  lanes.forEach((lane, laneIdx) => {
    const y = laneTop.get(laneIdx), h = laneHeight.get(laneIdx);
    if (laneIdx % 2 === 1) laneBg += `<rect x="0" y="${y}" width="${svgWidth}" height="${h}" fill="#F2F5F7"/>`;
    laneBg += `<line x1="0" y1="${y}" x2="${svgWidth}" y2="${y}" stroke="#D8DFE6" stroke-width="1"/>`;
    const lblLines = laneLabelLines(lane.label);
    const ly0 = y + h / 2 - (lblLines.length - 1) * 7 + 4;
    lblLines.forEach((line, i) => {
      laneBg += `<text x="${padding - 6}" y="${ly0 + i * 14}" font-size="10.5" font-weight="700" fill="#3D5A75">${escHtml(line)}</text>`;
    });
  });
  laneBg += `<line x1="0" y1="${svgHeight - padding * 0.5}" x2="${svgWidth}" y2="${svgHeight - padding * 0.5}" stroke="#D8DFE6" stroke-width="1"/>`;
  laneBg += `<line x1="${padding + laneLabelW - 14}" y1="${padding}" x2="${padding + laneLabelW - 14}" y2="${svgHeight - padding * 0.5}" stroke="#D8DFE6" stroke-width="1"/>`;

  // Stijl per staptype — kleuren consistent met de rest van de app
  // (huisstijl), vormen sinds de swimlane-overstap wél echte BPMN-
  // notatie: cirkel (event), ruit (gateway), kaart (activiteit),
  // gestippelde kaart (subproces-verwijzing).
  // 'accent' kleurt vormen/randen; 'text' is een net iets donkerdere
  // variant, alleen gebruikt voor kleine tekst (labels, stapnummer) op
  // een lichte ondergrond — zodat die ook bij 9-10px nog voldoende
  // contrast houdt (WCAG AA, ≥4.5:1 op wit).
  const STEP_TYPE_STYLE = {
    start:      { accent: '#008D4D', tint: '#E1F1E8', text: '#006B3A' },
    proces:     { accent: '#005496', tint: '#E3ECF5', text: '#005496', label: 'Processtap' },
    beslissing: { accent: '#002E56', tint: '#FFFFFF', text: '#002E56' },
    parallel:   { accent: '#002E56', tint: '#FFFFFF', text: '#002E56' },
    actie:      { accent: '#9DBEDD', tint: '#F2F5F7', text: '#3D5A75', label: 'Actie / taak' },
    subproces:  { accent: '#5F7387', tint: '#F2F5F7', text: '#3D5A75' },
    einde:      { accent: '#008D4D', tint: '#008D4D', text: '#006B3A' },
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
      const r = 17;
      const sel = isSelected ? `<circle cx="${p.cx}" cy="${p.cy}" r="${r + 5}" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const labelY0 = p.cy + r + 15;
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${labelY0 + i * lineHeight}" text-anchor="middle" font-size="12" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <circle cx="${p.cx}" cy="${p.cy}" r="${r}" fill="${s.stapType === 'einde' ? '#008D4D' : '#FFFFFF'}" stroke="${style.accent}" stroke-width="${s.stapType === 'einde' ? 3 : 2.5}"/>
        ${nameLinesHtml}
      </g>`;
    } else if (s.stapType === 'beslissing' || s.stapType === 'parallel') {
      // Gateway: ruit (diamant), vraag/label eronder. Parallel-gateway
      // krijgt een "+" in het midden (BPMN-conventie).
      const hw = 22;
      const pts = `${p.cx},${p.cy - hw} ${p.cx + hw},${p.cy} ${p.cx},${p.cy + hw} ${p.cx - hw},${p.cy}`;
      const sel = isSelected ? `<polygon points="${p.cx},${p.cy - hw - 5} ${p.cx + hw + 5},${p.cy} ${p.cx},${p.cy + hw + 5} ${p.cx - hw - 5},${p.cy}" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const plus = s.stapType === 'parallel'
        ? `<path d="M ${p.cx - 8} ${p.cy} H ${p.cx + 8} M ${p.cx} ${p.cy - 8} V ${p.cy + 8}" stroke="${style.accent}" stroke-width="2.5" stroke-linecap="round"/>`
        : `<text x="${p.cx}" y="${p.cy + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${style.accent}">?</text>`;
      const labelY0 = p.cy + hw + 15;
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${labelY0 + i * lineHeight}" text-anchor="middle" font-size="12" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <polygon points="${pts}" fill="${style.tint}" stroke="${style.accent}" stroke-width="2"/>
        ${plus}
        ${nameLinesHtml}
      </g>`;
    } else if (s.stapType === 'subproces') {
      // Verwijzing naar een ander proces: gestippeld kader, geen
      // uitgaande pijl (eindpunt van dit pad), optioneel klikbaar.
      const x = p.cx - boxW / 2, y = p.cy - cardH / 2;
      const sel = isSelected ? `<rect x="${x - 5}" y="${y - 5}" width="${boxW + 10}" height="${cardH + 10}" rx="14" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${p.cx}" y="${p.cy - (nameLines.length - 1) * lineHeight / 2 + i * lineHeight + 9}" text-anchor="middle" font-size="12" font-weight="700" fill="${style.text}">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}"${gotoAttr}>
        ${sel}
        <rect x="${x}" y="${y}" width="${boxW}" height="${cardH}" rx="3" fill="${style.tint}" stroke="${style.accent}" stroke-width="1.4" stroke-dasharray="5 4"/>
        <text x="${p.cx}" y="${y + 13}" text-anchor="middle" font-size="9" font-weight="700" letter-spacing=".6" fill="${style.text}">VERVOLGPROCES →</text>
        ${nameLinesHtml}
      </g>`;
    } else {
      // Activiteit: vlakke kaart met gekleurde streep links, stapnummer
      // en de naam over maximaal twee regels — geen typechip meer, het
      // type staat in de kleur van de streep (zie legenda).
      const x = p.cx - boxW / 2, y = p.cy - cardH / 2;
      const sel = isSelected ? `<rect x="${x - 4}" y="${y - 4}" width="${boxW + 8}" height="${cardH + 8}" rx="5" fill="none" stroke="${selColor}" stroke-width="2.5"/>` : '';
      const textY0 = p.cy - (nameLines.length - 1) * lineHeight / 2 + 4.5;
      const nameLinesHtml = nameLines.map((line, i) =>
        `<text x="${x + 34}" y="${textY0 + i * lineHeight}" font-size="12.5" font-weight="700" fill="#002E56">${escHtml(line)}</text>`
      ).join('');
      boxes += `
      <g class="proc-node" data-stapnr="${s.stapNr}">
        ${sel}
        <rect x="${x}" y="${y}" width="${boxW}" height="${cardH}" rx="3" fill="${s.stapType === 'actie' ? '#F2F5F7' : '#FFFFFF'}" stroke="${isSelected ? '#005496' : '#C3CDD7'}" stroke-width="${isSelected ? 1.6 : 1}"/>
        <rect x="${x}" y="${y}" width="5" height="${cardH}" fill="${style.accent}"/>
        <text x="${x + 19}" y="${p.cy + 4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${style.text}">${escHtml(String(s.stapNr))}</text>
        ${nameLinesHtml}
      </g>`;
    }
  }

  return `<svg id="procFlowSvg" viewBox="0 0 ${svgWidth} ${svgHeight}" data-nw="${svgWidth}" style="height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="proc-arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" fill="#7F93AB"/>
      </marker>
      <marker id="proc-arrowhead-terug" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" fill="#B41E8E"/>
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
  <span><i style="background:#fff;border:2.5px solid #008D4D;border-radius:50%;"></i>Start</span>
  <span><i style="background:#005496;width:5px;height:12px;border-radius:0;"></i>Processtap</span>
  <span><i style="background:#9DBEDD;width:5px;height:12px;border-radius:0;"></i>Actie / taak</span>
  <span><i style="background:#fff;border:2px solid #002E56;transform:rotate(45deg);border-radius:0;"></i>Beslissing</span>
  <span><i style="background:transparent;border:1.4px dashed #5F7387;border-radius:0;"></i>Vervolgproces</span>
  <span><i style="background:#008D4D;border-radius:50%;"></i>Einde</span>
  <span><i style="background:none;border-top:2px dashed #B41E8E;border-radius:0;width:16px;height:0;"></i>Terug naar eerdere stap</span>`;


/* ── Zoom voor normale (SVG-)processen ──────────────────────────
   'fit' = passend in het paneel; een getal = vaste schaal. Bij het
   openen van een proces starten we altijd passend (zie openProcFullscreen),
   maar nooit onleesbaar klein: onder 70%% schakelen we naar 100%% met
   scrollen. De zoomknoppen zelf staan sinds de fullscreen-herbouw (18
   sept 2026) niet meer in het canvas maar vast in de witte navbalk
   boven het proces (#procZoomTools), zodat ze nooit meescrollen en
   overeind blijven staan als het diagram opnieuw wordt getekend. */
let procZoom = 'fit';

function pfZoomToolsHtml() {
  return `<div class="pf-zoom-grp">
      <button type="button" class="pf-zbtn" data-zoom="out" title="Uitzoomen">−</button>
      <span class="pf-zval" id="flowZoomLabel"></span>
      <button type="button" class="pf-zbtn" data-zoom="in" title="Inzoomen">+</button>
    </div>
    <button type="button" class="pf-fitbtn" data-zoom="fit" title="Passend in beeld">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"></path></svg>
      Passend
    </button>`;
}

function applyProcZoom() {
  const svg = document.getElementById('procFlowSvg');
  const scroller = document.getElementById('flowScroll');
  if (!svg || !scroller) return;
  const nw = parseFloat(svg.dataset.nw);
  // 'Passend' mag ook licht opschalen (max 118%) als het diagram smaller
  // is dan het paneel — zo blijft het canvas niet nodeloos klein/leeg
  // wanneer een proces weinig stappen/rijbanen heeft.
  let scale = procZoom === 'fit' ? Math.min(1.18, (scroller.clientWidth - 20) / nw) : procZoom;
  // Onder 70% wordt de tekst te klein om te lezen: dan liever 85% en
  // horizontaal scrollen.
  if (procZoom === 'fit' && scale < 0.7) scale = 0.8;
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

/* Bouwt het scrollcanvas + SVG en behoudt bij herbouw (stap aanklikken)
   de scrollpositie en zoomstand. De zoombalk zelf zit niet meer hierin
   (zie pfZoomToolsHtml/#procZoomTools), dus die hoeft niet steeds
   opnieuw opgebouwd te worden. */
function renderNormFlow(p, selectedStapNr) {
  const wrap = document.getElementById('procFlowWrap');
  const prev = document.getElementById('flowScroll');
  const keep = prev ? { l: prev.scrollLeft, t: prev.scrollTop } : null;

  const layerMap = computeStepLayers(p.steps);
  const lanes = computeLaneOrder(p.steps, layerMap);
  wrap.innerHTML = `<div class="flow-scroll" id="flowScroll">${renderProcessFlowSVG(p.steps, layerMap, lanes, selectedStapNr)}</div>`;

  if (procZoom === 'fit') {
    const svg = document.getElementById('procFlowSvg');
    const scroller = document.getElementById('flowScroll');
    /* minimale leesbare zoom zit in applyProcZoom */
  }
  applyProcZoom();
  if (keep) { const s = document.getElementById('flowScroll'); s.scrollLeft = keep.l; s.scrollTop = keep.t; }
}

/* ====================================================================
   PROCESSEN — fullscreen weergave (sinds 18 sept 2026, ronde 4).
   Vervangt de oude vaste lijst+detail-layout: Processen opent nu als
   een doorzoekbare tegelpagina (renderProcList hierboven); een tegel
   aanklikken opent het proces fullscreen, met alleen een dunne navbalk
   erboven (terug + titel/omschrijving + zoom) — de blauwe hoofdbalk
   van de site blijft daarbij altijd staan, dat is de gewone
   view-processen/switchMainTab-laag erboven, die raken we hier niet
   aan. Terug klikken bewaart de zoek/filterstand van de tegelpagina.
   ==================================================================== */
function openProcFullscreen(id) {
  currentProcId = id;
  const p = procEntries.find(x => x.id === id);
  if (!p) return;

  document.getElementById('procTilesView').classList.remove('active');
  document.getElementById('procFullscreenView').classList.add('active');

  document.getElementById('procDetailTitle').textContent = p.naam;
  document.getElementById('procDetailTeamBadge').textContent = p.team || '—';
  document.getElementById('procDetailDesc').textContent = p.desc || '';
  closeProcStepPanel();

  const flowWrap = document.getElementById('procFlowWrap');
  const legend = document.getElementById('procDetailLegend');
  const zoomTools = document.getElementById('procZoomTools');
  {
    zoomTools.innerHTML = pfZoomToolsHtml();
    // "Begin altijd bij passend scherm": elk proces opent op de
    // pas-in-beeld-zoom, nooit op de laatst onthouden stand.
    procZoom = 'fit';
    renderNormFlow(p, null);
    legend.innerHTML = NORMAAL_LEGEND;
  }
}

/* Terug naar de tegelpagina. De tegel van het zojuist bekeken proces
   blijft gemarkeerd (currentProcId blijft staan) zodat je 'm makkelijk
   terugvindt, maar we bouwen de lijst niet opnieuw op — dat zou de
   scrollpositie/zoekstand van de tegelpagina resetten. */
function closeProcFullscreen() {
  document.getElementById('procFullscreenView').classList.remove('active');
  document.getElementById('procTilesView').classList.add('active');
  document.querySelectorAll('#procList .proc-tile').forEach(tile => {
    tile.classList.toggle('proc-tile-active', tile.dataset.id === currentProcId);
  });
}

/* Backwards-compatible alias: de rest van de app (chip-navigatie vanaf
   Home, "Vervolgproces"-kaders in het canvas) roept nog altijd
   selectProcEntry aan om een proces te openen. */
function selectProcEntry(id) {
  openProcFullscreen(id);
}

function selectProcStep(stapNr) {
  const p = procEntries.find(x => x.id === currentProcId);
  if (!p) return;
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
    <div class="meta-item">
      <div class="meta-key">Stap ${step.stapNr} — ${escHtml(step.stapNaam)}</div>
      ${subHtml}
      <div class="meta-val" style="font-weight:400;margin-top:8px;white-space:pre-wrap;">${escHtml(step.stapDesc) || (step.stapVragen.length === 0 ? 'Geen toelichting opgegeven.' : '')}</div>
      ${vragenHtml}
    </div>`;
  document.getElementById('procStepPanel').classList.add('open');
}

function closeProcStepPanel() {
  const panel = document.getElementById('procStepPanel');
  panel.classList.remove('open');
  document.getElementById('procStepDetail').innerHTML = '';
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
    const teams = new Set(procEntries.map(p => p.team).filter(Boolean)).size;
    document.getElementById('homeBreakdownProcessen').innerHTML = chip(teams, teams === 1 ? 'team' : 'teams');
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
    group('Processen', procs, p => `
      <div class="home-result-item" data-home-proc="${escHtml(p.id)}">
        <span class="home-result-term">${hlHtml(p.naam, q)}</span>
        <span class="home-result-sub">${escHtml(p.team)}</span>
      </div>`) +
    group('Dashboards', dashes, d => `
      <div class="home-result-item" data-home-dash="${escHtml(d.id)}">
        <span class="home-result-term">${hlHtml(d.name, q)}</span>
        ${d.type ? `<span class="dash-badge ${dashTypeClass(d.type)}">${escHtml(d.type)}</span>` : ''}
      </div>` +
    group('Datavelden', dvs, d => `
      <div class="home-result-item" data-home-dv="${escHtml(d.id)}">
        <span class="home-result-term">${hlHtml(d.name, q)}</span>
        <span class="home-result-sub">${escHtml(d.src)}</span>
      </div>`));
  wrap.classList.add('show');
}

/* Open een proces vanuit de Home-zoekresultaten: zelfde patroon als
   openDefinitieFromChip/openDataveldFromChip (filters leegmaken,
   naar de juiste tab, item selecteren). */
function openProcFromHome(id) {
  document.getElementById('procSearch').value = '';
  document.getElementById('procFilterTeam').value = '';
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
  document.body.dataset.tab = tab; // lijncirkel alleen op Home (zie style.css)
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
  document.getElementById('dashModalDefs').addEventListener('click', ev => {
    const btn = ev.target.closest('[data-defref]');
    if (!btn) return;
    closeDashModal();
    openDefinitieFromChip(btn.dataset.defref);
  });
  // Klik op een D-nummer in een definitie: open die definitie (filters
  // en zoekterm worden leeggemaakt, zodat hij zeker in de lijst staat).
  document.getElementById('detailPanel').addEventListener('click', ev => {
    const ref = ev.target.closest('[data-defref]');
    if (ref) { ev.preventDefault(); openDefinitieFromChip(ref.dataset.defref); }
  });
  byRow('dvTableBody', selectDvEntry);
  byRow('dashTableBody', selectDashEntry);
  document.getElementById('procList').addEventListener('click', ev => {
    const tile = ev.target.closest('[data-id]');
    if (tile) openProcFullscreen(tile.dataset.id);
  });
  // Eén gedelegeerde listener op de hele fullscreen-view: die dekt zowel
  // de navbalk (terug-knop, zoomknoppen — die zitten buiten #procFlowWrap
  // sinds de zoombalk vast bovenin staat) als het canvas zelf en het
  // stapdetail-paneel, ongeacht hoe vaak #procFlowWrap opnieuw wordt
  // opgebouwd bij het aanklikken van een stap.
  document.getElementById('procFullscreenView').addEventListener('click', ev => {
    if (ev.target.closest('#procBackBtn')) { closeProcFullscreen(); return; }
    if (ev.target.closest('#procStepPanelClose')) { closeProcStepPanel(); return; }
    const zoomBtn = ev.target.closest('[data-zoom]');
    if (zoomBtn) { setProcZoom(zoomBtn.dataset.zoom); return; }
    // Vervolgproces-kader (subproces-type) met een geldige verwijzing:
    // springt naar dat proces i.p.v. alleen de stap te selecteren.
    const gotoBox = ev.target.closest('[data-goto-proc]');
    if (gotoBox) {
      const targetId = gotoBox.dataset.gotoProc;
      if (procEntries.some(pr => pr.id === targetId)) {
        renderProcList();
        openProcFullscreen(targetId);
      }
      return;
    }
    const g = ev.target.closest('[data-stapnr]');
    if (g) selectProcStep(parseInt(g.dataset.stapnr, 10));
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
