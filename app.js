const STORAGE_KEY = 'medemblik_definitiecatalogus_v9';

const DEFAULT_DATA = [
  {
    "id": "D-002",
    "term": "Uitstroom",
    "def": "Het aantal cliënten dat in de geselecteerde periode geen actief zorgtraject meer heeft. Een cliënt is uitgestroomd als hij niet actief was aan het eind van de periode, maar gedurende de periode op tenminste één moment een actief zorgtraject heeft gehad. Uitstroom is een stroomvariabele: meet altijd over een periode.",
    "ctx": "Kerncijfer voor effectiviteits- en capaciteitsmonitoring. Saldo-formule: cliënten begin + instroom − uitstroom = cliënten eind. Onderscheid met D-015 (uitstroom traject): D-002 telt cliënten, D-015 telt trajecten.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd ≤ peildatum + Pdc_Orders.orderStatus = CANCELLED/WITHDRAWN/DELIVERED\n• Pdc_Orders.originalDeliveryDateEnd (einddatum toewijzing zoals afgegeven)\n\nALT",
    "cat": "In/Uitstroom",
    "team": "WMO & Backoffice",
    "status": "Vastgesteld",
    "date": "01-01-2024",
    "notes": "Conform MSD-definitiedocument v1.0 (2022). Stroom-variabele.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderStatus"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.originalDeliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.endDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.reasonCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.endDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processEndDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      },
      {
        "type": "catalog",
        "label": "Pdc_Client.bsn"
      },
      {
        "type": "catalog",
        "label": "Persoon.Klant_BSN"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd ≤ peildatum + Pdc_Orders.orderStatus = CANCELLED/WITHDRAWN/DELIVERED\n• Pdc_Orders.originalDeliveryDateEnd (einddatum toewijzing zoals afgegeven)\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_CareMessage.type = 'stop care message' → Pdc_CareMessage.endDate (feitelijk stopzorgbericht)\n• Pdc_CareMessage.reasonCode + reasonDescription (reden beëindiging levering)\n\nALTERNATIEF – PDC Declarations:\n• Pdc_Declaration.endDate van laatste declaratie per client_id/productCode (op basis van werkelijke levering)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processEndDate (functionele einddatum zaak)\n• ZaakOverzicht.processResult (reden beëindiging)\n\nPRIMAIRE SLEUTEL cliënt: Pdc_Client.bsn / Persoon.Klant_BSN"
  },
  {
    "id": "D-003",
    "term": "Doorlooptijd",
    "def": "De periode in kalenderdagen tussen de functionele startdatum van een zaak (processStartDate) en de functionele einddatum (processEndDate). Voor de beslistermijn jeugd geldt specifiek de periode tussen ontvangst van de aanvraag en het besluit, met een wettelijke norm van maximaal 8 weken (art. 4:13 Awb).",
    "ctx": "Kwaliteitsindicator voor het werkproces. In MensCentraal: processEndDate − processStartDate in dagen. Onderscheid: doorlooptijd zaak vs. doorlooptijd traject (start eerste toewijzing → eind laatste toewijzing).",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processEndDate − ZaakOverzicht.processStartDate (in kalenderdagen)\n\nALTERNATIEF – PDC Orders (leveringsdoorlooptijd):\n• Pdc_Orders.deliveryDateEnd − Pdc_Orders.d",
    "cat": "Toegang",
    "team": "Contractbeheer & Inkoop",
    "status": "Vastgesteld",
    "date": "15-03-2024",
    "notes": "Wettelijke norm jeugd: ≤ 42 dagen (8 weken). Zie D-060 (beslistermijn).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processEndDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.originalDeliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Term.startDate"
      },
      {
        "type": "catalog",
        "label": "Term.experationDate"
      },
      {
        "type": "catalog",
        "label": "Term.status"
      },
      {
        "type": "catalog",
        "label": "Pdc_DeliveryPeriod.startDate"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processEndDate − ZaakOverzicht.processStartDate (in kalenderdagen)\n\nALTERNATIEF – PDC Orders (leveringsdoorlooptijd):\n• Pdc_Orders.deliveryDateEnd − Pdc_Orders.deliveryDateStart (totale leveringsperiode)\n• Pdc_Orders.originalDeliveryDateStart t/m originalDeliveryDateEnd (initieel geplande looptijd)\n\nALTERNATIEF – Termijntabel (beslistermijn):\n• Term.startDate t/m Term.experationDate (wettelijke termijn)\n• Term.status (PENDING/COMPLETED = op tijd of niet)\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_DeliveryPeriod.startDate t/m endDate (feitelijke leveringsperiode per order)"
  },
  {
    "id": "D-004",
    "term": "Uitstroommoment",
    "def": "Het tijdstip waarop een cliënt definitief uitstroomt uit het sociaal domein: de datum waarop het laatste actieve zorgtraject eindigt en er geen nieuwe toewijzing meer volgt binnen [31 dagen]. Het uitstroommoment is pas definitief vast te stellen nadat de wachttijd van 31 dagen verstreken is.",
    "ctx": "Relevant voor in- en uitstroomrapportages. Uitstroommoment = einddatum laatste toewijzing (status 'definitief' conform MSD). Cliënten die uitstromen maar binnen 31 dagen herinstromen, tellen als 'inactief' in die periode.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd (einddatum toewijzing)\n• Pdc_Orders.orderStatus = CANCELLED/DELIVERED/WITHDRAWN (definitief gestopt)\n• 31-dagentermijn: peildatum > deliveryDateEnd +",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Vastgesteld",
    "date": "15-06-2026",
    "notes": "31-dagengrens is configureerbare parameter (MSD v1.0). Was leeg — nu ingevuld o.b.v. MSD.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderStatus"
      },
      {
        "type": "catalog",
        "label": "Pdc_DeliveryPeriod.permanentStopCareMessage_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.endDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.stopDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processEndDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd (einddatum toewijzing)\n• Pdc_Orders.orderStatus = CANCELLED/DELIVERED/WITHDRAWN (definitief gestopt)\n• 31-dagentermijn: peildatum > deliveryDateEnd + 31 dgn → status definitief\n\nALTERNATIEF – PDC Delivery Period / Care Messages:\n• Pdc_DeliveryPeriod.permanentStopCareMessage_id gevuld → Pdc_CareMessage.endDate (feitelijk stopbericht ontvangen)\n• Pdc_CareMessage.type = 'stop care message' + reasonCode\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration: laatste declaratieregel per order/BSN met status ACCEPTED\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.stopDate (systeemeinddatum zaak)\n• ZaakOverzicht.processEndDate (functionele einddatum)"
  },
  {
    "id": "D-007",
    "term": "Enkelvoudige hulpvraag",
    "def": "Een hulpvraag die betrekking heeft op één specifiek leefdomein en waarvoor één type voorziening of interventie volstaat. Er is geen sprake van problemen op meerdere leefgebieden tegelijk.",
    "ctx": "Gebruikt bij triage in het toegangsproces om te bepalen welk loket of team de vraag oppakt. Tegenovergesteld aan meervoudige problematiek (D-008). Bij enkelvoudige hulpvraag is regiecoördinatie doorgaans niet nodig.",
    "fields": "ZaakOverzicht.processType_code, GmLeefgebied, vraagtype",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Data velden zoeken",
    "date": "15-02-2024",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      }
    ],
    "fieldsFull": "ZaakOverzicht.processType_code, GmLeefgebied, vraagtype"
  },
  {
    "id": "D-008",
    "term": "Meervoudige problematiek",
    "def": "Een situatie waarbij een cliënt of gezin op twee of meer levensdomeinen tegelijk problemen ervaart. Triggert inzet van een casemanager of regisseur en een multidisciplinaire aanpak. Zie ook profiel 8 (meervoudige gezinsproblematiek, D-073).",
    "ctx": "Trigger voor MDA++ en zorgcoördinatie. In MensCentraal te afleiden uit het aantal actieve leefgebieden (GmLeefgebied) per cliënt/gezin. Relevant voor de monitor multiprobleemgezinnen en voor D-054 (gezinsgericht).",
    "fields": "GmLeefgebied (meerdere actief), GmDoelstelling, ZaakOverzicht (meerdere actieve zaken)",
    "fieldChips": [
      {
        "type": "custom",
        "label": "GmLeefgebied (meerdere actief)"
      },
      {
        "type": "custom",
        "label": "GmDoelstelling"
      },
      {
        "type": "custom",
        "label": "ZaakOverzicht (meerdere actieve zaken)"
      }
    ],
    "cat": "Trajecten/Producten",
    "team": "Sociaal & Welzijn",
    "status": "Data velden zoeken",
    "date": "—",
    "notes": "Afstemming nodig met WMO-team. Zie D-073 voor profiel 8.",
    "source": "",
    "changelog": [
      {
        "date": "12-06-2026",
        "action": "Gewijzigd: categorie"
      }
    ]
  },
  {
    "id": "D-009",
    "term": "Verwijzer",
    "def": "Een persoon of organisatie die een burger doorverwijst naar jeugdhulp of WMO-ondersteuning. De verwijzer bepaalt de ingangsroute en heeft gevolgen voor het registratieproces en de beschikkingsbevoegdheid. Typen: huisarts/medisch specialist/jeugdarts (medische route), gecertificeerde instelling (GI-route), rechter, wijkteam/lokale toegang (gemeentelijke route).",
    "ctx": "referrerTypeCode in iJw/iWmo-berichten. Bij medische verwijsroute (D-059) geeft gemeente géén beschikking maar is wel financieel verantwoordelijk. Verwijzertype bepaalt zaaktype en werkproces in MensCentraal.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.referrerType (type verwijzer)\n• Pdc_Orders.referrerCode (code verwijzer)\n• Pdc_Orders.referrerName (naam verwijzer)\n\nALTERNATIEF – PDC CareRequestProduct (315-berich",
    "cat": "In/Uitstroom",
    "team": "Sociaal & Welzijn",
    "status": "Vastgesteld",
    "date": "01-01-2024",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerType"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerName"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerTypeCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerAGBCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerName"
      },
      {
        "type": "catalog",
        "label": "Zaakstap.antwoord"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "BelanghebbendenOrganisatie.stakeHolderRole"
      },
      {
        "type": "catalog",
        "label": "BelanghebbendenOrganisatie.stakeHolderInstitutionName"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.referrerType (type verwijzer)\n• Pdc_Orders.referrerCode (code verwijzer)\n• Pdc_Orders.referrerName (naam verwijzer)\n\nALTERNATIEF – PDC CareRequestProduct (315-bericht):\n• Pdc_CareRequestProduct.referrerTypeCode\n• Pdc_CareRequestProduct.referrerAGBCode\n• Pdc_CareRequestProduct.referrerName\n\nALTERNATIEF – Zaaksysteem:\n• Zaakstap.antwoord op zaakvraag 'Verwijzer' (processPropertyType_code = verwijzer)\n• ZaakOverzicht.processType_code (zaaktype bepaalt verwijzerroute)\n\nALTERNATIEF – BelanghebbendenOrganisatie:\n• BelanghebbendenOrganisatie.stakeHolderRole = 'Verwijzer'\n• BelanghebbendenOrganisatie.stakeHolderInstitutionName"
  },
  {
    "id": "D-010",
    "term": "Verwijzer GI",
    "def": "Een gecertificeerde instelling (GI) is een organisatie die conform de Jeugdwet maatregelen van jeugdbescherming en jeugdreclassering uitvoert en daarvoor gecertificeerd moet zijn. Bij een GI-verwijzing bepaalt de GI de noodzaak tot jeugdhulp; de gemeente verleent géén beschikking maar financiert wel. De GI-toewijzing verloopt via het JW315-bericht.",
    "ctx": "Gemeente mag noodzaak jeugdhulp niet zelf beoordelen bij GI-route. Zaaktype in MensCentraal verschilt van gemeentelijke aanvraag. GI-codes zijn opgenomen in referrerTypeCode. Zie ook D-079 (jeugdbescherming).",
    "fields": "Pdc_CareRequestProduct.referrerTypeCode (waarde GI), JW315 toewijzingsbericht",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Vastgesteld",
    "date": "01-03-2023",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerTypeCode"
      }
    ],
    "fieldsFull": "Pdc_CareRequestProduct.referrerTypeCode (waarde GI), JW315 toewijzingsbericht"
  },
  {
    "id": "D-011",
    "term": "Zorg in natura (ZIN)",
    "def": "Leveringsvorm waarbij de gemeente zorg of ondersteuning rechtstreeks inkoopt bij een gecontracteerde aanbieder en de aanbieder direct door de gemeente betaald wordt. De cliënt ontvangt de zorg in natura, niet als geldbedrag. Tegenovergesteld aan PGB (D-038).",
    "ctx": "Meest voorkomende leveringsvorm; aansturing via productcodes en iJw/iWmo-berichten. In Pdc_ProductType: paymentToCitizen = 0. Relevant voor onderscheid ZIN vs PGB in uitnutting (D-052) en declaratiemonitoring.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderSoort = 'ZIN' (vs. 'PGB')\n\nALTERNATIEF – PDC ProductType:\n• Pdc_ProductType.paymentToCitizen = 0 (ZIN)\n• Pdc_ProductType.paymentToCreditor = 0 (ZIN; bij PGB = 1",
    "cat": "Toegang",
    "team": "Contractbeheer & Inkoop",
    "status": "Vastgesteld",
    "date": "01-01-2024",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderSoort"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.paymentToCitizen"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.paymentToCreditor"
      },
      {
        "type": "catalog",
        "label": "Pdc_Budget.law"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderSoort = 'ZIN' (vs. 'PGB')\n\nALTERNATIEF – PDC ProductType:\n• Pdc_ProductType.paymentToCitizen = 0 (ZIN)\n• Pdc_ProductType.paymentToCreditor = 0 (ZIN; bij PGB = 1)\n\nALTERNATIEF – PDC Budget:\n• Pdc_Budget.law = 'J'/'W'/'B' → PGB\n• Afwezigheid budget_id op order → ZIN\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCode aanwezig + geen PGB-budget → ZIN"
  },
  {
    "id": "D-012",
    "term": "Keukentafelgesprek",
    "def": "Een gesprek tussen een gemeentelijke consulent en de hulpvragende burger (en eventueel diens netwerk) om de ondersteuningsbehoefte integraal in kaart te brengen en te bepalen wat de burger zelf of met hulp van het netwerk kan oplossen. Het gesprekverslag vormt de inhoudelijke basis voor het indicatiebesluit (beschikking).",
    "ctx": "Startpunt formele WMO-procedure; wettelijk verankerd in Wmo 2015. In MensCentraal geregistreerd als zaakstap (type INTAKE_ANALYSIS of INTERROGATION). Gespreksdatum vastgelegd in Annotation.conversationDate.",
    "fields": "ZaakOverzicht.processStartDate, ZaakStap.startDate, Annotation.conversationDate",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Vastgesteld",
    "date": "01-01-2024",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      }
    ],
    "fieldsFull": "ZaakOverzicht.processStartDate, ZaakStap.startDate, Annotation.conversationDate"
  },
  {
    "id": "D-014",
    "term": "Sociale basis / voorveld (segment A)",
    "def": "Het geheel van vrij toegankelijke, algemene voorzieningen en activiteiten in de buurt die bijdragen aan participatie, zelfredzaamheid en preventie — zonder beschikking. Voorbeelden: buurt- en clubhuizen, jongerenwerk, schuldhulpverlening laagdrempelig, opvoedondersteuning licht. Valt buiten de gecontracteerde zorg (geen productcode vereist). Zie ook D-021 (algemene voorzieningen).",
    "ctx": "Relevant voor de monitor preventie en verschuiving naar het voorveld. Westfriese gemeenten ambiëren laag complexe jeugdhulp (profielen 1-4) tijdens contractduur door te ontwikkelen naar segment A. Geen iJw/iWmo-declaratie.",
    "fields": "Geen productcode — buiten PDC; wel registreerbaar als activiteit of zaak in MensCentraal",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Vervangt 'Sociale basis'. Toegevoegd: relatie met segment A (jeugd) en link naar D-021.",
    "fieldsFull": "Geen productcode — buiten PDC; wel registreerbaar als activiteit of zaak in MensCentraal"
  },
  {
    "id": "D-015",
    "term": "Uitstroom traject",
    "def": "Het beëindigen van een zorgtraject: het moment waarop de einddatum van de laatste toewijzing binnen een traject definitief is (status 'definitief', d.w.z. meer dan 31 dagen verstreken na afronding). Een traject is uitgestroomd als de einddatum definitief in de geselecteerde periode valt. Reden van uitstroom wordt vastgelegd conform iStandaard (bijv. 'Volgens plan beëindigd', 'Eenzijdig door cliënt', 'Verhuizing').",
    "ctx": "Kernmaat voor effectiviteitsmeting. Reden uitstroom (ZaakOverzicht.processResult) bepaalt kwalificatie positief/negatief. Onderscheid: D-002 telt cliënten, D-015 telt trajecten. Conform MSD v1.0 (slides 9-13).",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd binnen periode EN orderStatus = CANCELLED/WITHDRAWN/DELIVERED\n• Pdc_Orders.changeReason (reden beëindiging order)\n• Pdc_ChangeReason.description (lok",
    "cat": "Beslistermijn",
    "team": "Sociaal & Welzijn",
    "status": "Vastgesteld",
    "date": "15-05-2024",
    "notes": "Reden beëindiging conform iStandaard (D-013 in iJw). Zie MSD-slide 13 voor volledige lijst.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.changeReason"
      },
      {
        "type": "catalog",
        "label": "Pdc_ChangeReason.description"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.reasonCode"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      },
      {
        "type": "catalog",
        "label": "Plan.planResult"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.endDate"
      },
      {
        "type": "catalog",
        "label": "Disposition.issueDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateEnd binnen periode EN orderStatus = CANCELLED/WITHDRAWN/DELIVERED\n• Pdc_Orders.changeReason (reden beëindiging order)\n• Pdc_ChangeReason.description (lokale omschrijving reden)\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_CareMessage.type = 'stop care message' → stopzorgbericht ontvangen\n• Pdc_CareMessage.reasonCode + reasonDescription (iStandaard-reden)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processResult + processEndDate (reden en datum zaakafronding)\n• Plan.planResult (SUCCESS/CANCELLED/UNSUCCESSFUL etc.)\n\nALTERNATIEF – PDC Declarations (werkelijke levering):\n• Laatste Pdc_Declaration.endDate per order (op basis van feitelijk gedeclareerde levering)\n\nALTERNATIEF – Disposition:\n• Disposition.issueDate + number (beschikkingsdatum afloop als proxy)"
  },
  {
    "id": "D-016",
    "term": "Wachttijd",
    "def": "De periode in kalenderdagen tussen de datum waarop de gemeente een product toewijst (allocationDate) en de datum waarop de daadwerkelijke zorglevering start (startDate van de toewijzing). Voor jeugdhulp geldt een wettelijke norm van maximaal 42 werkdagen. Onderscheid: (1) wachttijd bij de gemeentelijke toegang (D-062/D-063) en (2) wachttijd bij de zorgaanbieder (tussen toewijzing en start levering).",
    "ctx": "Kwaliteitsindicator contractbeheer. In Pdc_CareAllocationProduct: startDate − allocationDate in dagen. Norm: max. 42 dagen. Overschrijding triggert escalatie conform inkoopafspraken.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderDate (besteldatum) t/m Pdc_Orders.deliveryDateStart (start levering)\n• Of: Pdc_CareAllocationProduct.allocationDate t/m startDate\n\nALTERNATIEF – PDC Care Messag",
    "cat": "In/Uitstroom",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "01-04-2024",
    "notes": "Norm max. 42 dagen (jeugd). Twee soorten wachttijd (toegang vs. aanbieder) nu expliciet onderscheiden.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.allocationDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_DeliveryPeriod.startDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.startDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processEndDate"
      },
      {
        "type": "catalog",
        "label": "Term.startDate"
      },
      {
        "type": "catalog",
        "label": "Term.experationDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderDate (besteldatum) t/m Pdc_Orders.deliveryDateStart (start levering)\n• Of: Pdc_CareAllocationProduct.allocationDate t/m startDate\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_DeliveryPeriod.startDate (datum eerste startzorgbericht ontvangen van aanbieder)\n• Pdc_CareMessage.type = 'start care message' → Pdc_CareMessage.startDate\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processEndDate (datum besluit) t/m Pdc_Orders.deliveryDateStart\n  (wachttijd na beschikking tot start levering)\n\nALTERNATIEF – Term-tabel:\n• Term.startDate t/m Term.experationDate (beslistermijn; andere wachttijddefinitie)"
  },
  {
    "id": "D-017",
    "term": "Beschikkingsduur",
    "def": "De periode in kalenderdagen of maanden waarvoor een indicatiebesluit (beschikking) geldig is en waarbinnen de toegekende voorziening geleverd mag worden: van allocationDate (ingangsdatum beschikking) tot endDate (einddatum beschikking). Voor duurzame intensiteiten (D-070) kan de beschikkingsduur meerjarig zijn.",
    "ctx": "Stuurt op tijdige herindicatie (D-048). In Pdc_CareAllocationProduct: endDate − allocationDate. Beschikkingnummer (disposalNr) is de unieke sleutel. Maximale duur per producttype configureerbaar via Pdc_ProductType.maximumDurationPeriodType/Count.",
    "fields": "Pdc_Orders.deliveryDateEnd, Pdc_Orders.deliveryDateStart, Pdc_Orders.originalDeliveryDateStart, Pdc_ProductType.maximumDurationPeriodType, Pdc_CareAllocationProduct.endDate, Term.amount, Term.unit, Disposition.issueDate, Pdc_ContractAgreement.endDate",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateEnd"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.originalDeliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.maximumDurationPeriodType"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.endDate"
      },
      {
        "type": "catalog",
        "label": "Term.amount"
      },
      {
        "type": "catalog",
        "label": "Term.unit"
      },
      {
        "type": "catalog",
        "label": "Disposition.issueDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_ContractAgreement.endDate"
      }
    ],
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Data velden zoeken",
    "date": "01-01-2024",
    "notes": "",
    "source": "",
    "changelog": [
      {
        "date": "11-06-2026",
        "action": "Gewijzigd: datavelden, team, status"
      }
    ]
  },
  {
    "id": "D-018",
    "term": "Mantelzorger",
    "def": "Een persoon uit de sociale omgeving van een cliënt die onbetaald langdurige of intensieve zorg of ondersteuning biedt als gevolg van ziekte, beperking of ouderdom. De gemeente heeft een wettelijke taak om mantelzorgers te ondersteunen (Wmo 2015 art. 2.2.3). Overbelaste mantelzorger kan aanleiding zijn voor respijtzorg (kortdurend verblijf).",
    "ctx": "Relevant bij de beoordeling van eigen kracht en het netwerk (keukentafelgesprek). Mantelzorgbelasting in MensCentraal registreerbaar via GmDoelstelling of zaakstapvraag. Overbelastingssignaal is input voor D-030 (kortdurend verblijf).",
    "fields": "Relatie tot cliënt, leeftijd mantelzorger, uren zorg per week, overbelastingssignaal (J/N), GmClientGroepPersoon",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Vastgesteld",
    "date": "01-06-2023",
    "notes": "",
    "fieldsFull": "Relatie tot cliënt, leeftijd mantelzorger, uren zorg per week, overbelastingssignaal (J/N), GmClientGroepPersoon"
  },
  {
    "id": "D-019",
    "term": "Resultaatgebied",
    "def": "Een afgebakend domein van het dagelijks leven waarop ondersteuning gericht is, conform het gemeentelijke resultatenmodel. Westfriesland hanteert leefgebieden als structurerende eenheid: wonen, financiën, dagbesteding, gezin/opvoeding, veiligheid, participatie, gezondheid. Elk zorgdoel (GmDoelstelling) is gekoppeld aan één of meer leefgebieden.",
    "ctx": "Structureert rapportage over outcome en doelbereik. In MensCentraal: GmLeefgebied en GmDoelstelling. Koppelt aan RegionProcessType.standaardLeefDomein. Relevant voor monitor preventie en effectiviteit.",
    "fields": "GmLeefgebied.id, GmDoel_GmLeefgebied, GmDoelstelling, RegionProcessType.standaardLeefDomein",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Data velden zoeken",
    "date": "—",
    "notes": "Afstemming met beleid vereist over exacte leefgebiedenindeling Medemblik.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "GmLeefgebied.id"
      }
    ],
    "fieldsFull": "GmLeefgebied.id, GmDoel_GmLeefgebied, GmDoelstelling, RegionProcessType.standaardLeefDomein"
  },
  {
    "id": "D-020",
    "term": "Productcode (aanbodcode)",
    "def": "Een unieke code die een specifiek zorg- of ondersteuningsproduct identificeert binnen de gemeentelijke productencatalogus (PDC). Combineert productcategoriecode en productspecifieke code (bijv. '44GHL' = Gezinshuis Laag). Productcodes zijn de basis voor de iJw/iWmo-declaratiestandaard. Zie D-078 voor een overzicht van categorienummers.",
    "ctx": "Basis voor iStandaard-berichtenverkeer. In PDC: Pdc_ProductType.communityProductCode. Koppelt aan Pdc_CareAllocationProduct.productCode (leveringsniveau) en Pdc_CareRequestProduct.productCode (aanvraagniveau). Voorheen 'Aanbodcode' — hernoemd naar gangbare term.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.communityProductCode\n• Pdc_Orders.productName (naam product op moment bestelling)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_Ca",
    "cat": "Beslistermijn",
    "team": "Contractbeheer & Inkoop",
    "status": "Vastgesteld",
    "date": "01-01-2024",
    "notes": "Hernoemd van 'Aanbodcode' naar 'Productcode'. Conform iStandaarden iJw/iWmo.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.communityProductCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.productName"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.productCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.productCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.communityProductCode\n• Pdc_Orders.productName (naam product op moment bestelling)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCode\n\nALTERNATIEF – PDC CareRequestProduct (315-bericht):\n• Pdc_CareRequestProduct.productCode\n• Pdc_CareRequestProduct.productCategoryCode\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCode (productcode op declaratieregel)\n• Pdc_Declaration.productCategoryCode\n\nALTERNATIEF – PDC CareMessage:\n• Pdc_CareMessage.productCode (productcode in zorgbericht)"
  },
  {
    "id": "D-021",
    "term": "Algemene voorzieningen (Wmo)",
    "def": "Voorzieningen en diensten binnen de Wmo die voor iedere inwoner zonder beschikking toegankelijk zijn. Voorbeelden: buurthuizen, sociaal cultureel werk, welzijnsactiviteiten, gemeentelijke informatie- en advieslokketen. Worden gefinancierd via subsidie of inkoopcontract, niet via productcodes/beschikkingen. Zie D-014 voor de bredere categorie 'sociale basis/voorveld'.",
    "ctx": "Relevant bij het bepalen of een maatwerkvoorziening nodig is of dat een algemene voorziening volstaat (lichtste oplossing-principe Wmo). Geen iWmo-declaratie. Financiering via subsidiemodule of inkoopcontract buiten PDC.",
    "fields": "Geen productcode; eventueel geregistreerd als activiteit of subsidie",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Scope: alleen Wmo. Zie D-014 voor segment A (jeugd voorveld).",
    "fieldsFull": "Geen productcode; eventueel geregistreerd als activiteit of subsidie"
  },
  {
    "id": "D-022",
    "term": "Beëindigde arrangementen",
    "def": "Het aantal zorg- of ondersteuningsarrangementen (combinatie van productcode + cliënt) waarvan de einddatum definitief in de geselecteerde periode valt. Een arrangement is beëindigd als de einddatum status 'definitief' heeft (meer dan 31 dagen na afronding laatste toewijzing, conform D-004). Telt op trajectniveau; één cliënt kan meerdere beëindigde arrangementen hebben.",
    "ctx": "Sturingsindicator voor contractbeheer en capaciteitsplanning. Berekend uit Pdc_CareAllocationProduct.endDate met status definitief. Onderscheid van D-015 (uitstroom traject op cliëntniveau) en D-052 (uitnutting).",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderStatus = CANCELLED/WITHDRAWN + deliveryDateEnd binnen periode\n• Pdc_Orders.changeReason (reden beëindiging)\n• COUNT per productType_id / community_id\n\nALTERNATI",
    "cat": "In/Uitstroom",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld o.b.v. MSD v1.0 en PDC-tabelstructuur.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderStatus"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.changeReason"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderStatus = CANCELLED/WITHDRAWN + deliveryDateEnd binnen periode\n• Pdc_Orders.changeReason (reden beëindiging)\n• COUNT per productType_id / community_id\n\nALTERNATIEF – PDC Care Messages:\n• COUNT Pdc_CareMessage.type = 'stop care message' + endDate binnen periode\n\nALTERNATIEF – PDC Declarations:\n• Laatste Pdc_Declaration per order met status ACCEPTED + endDate binnen periode\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processResult + processEndDate (afgeronde zaken)"
  },
  {
    "id": "D-023",
    "term": "Cliënten met voorzieningen (actieve cliënten)",
    "def": "Het aantal unieke personen (BSN/clientID) met minimaal één actieve toewijzing/beschikking op een peildatum of in een periode binnen het sociaal domein (Wmo, Jeugdwet of Participatiewet). Standvariabele op peildatum: telt toewijzingen waarvan startDate ≤ peildatum en endDate ≥ peildatum.",
    "ctx": "Kerncijfer voor capaciteits- en kostenbewaking. In PDC: Pdc_CareAllocationProduct actief op peildatum. Onderscheid met D-041 (actieve cliënten op procesniveau in MensCentraal). Combineerbaar met D-002/D-053 voor stromenoverzicht.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders: deliveryDateStart ≤ peildatum ≤ deliveryDateEnd + orderStatus actief\n• COUNT DISTINCT Pdc_Client.bsn gekoppeld aan actieve orders\n\nALTERNATIEF – PDC CareAllocationP",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Hernoemd: 'met voorzieningen' toegevoegd aan D-041 samengevoegd. Standvariabele — zie MSD.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Client.bsn"
      },
      {
        "type": "catalog",
        "label": "Pdc_Client.id"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "Persoon.Klant_BSN"
      },
      {
        "type": "catalog",
        "label": "BelanghebbendenPersoon.BSN"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders: deliveryDateStart ≤ peildatum ≤ deliveryDateEnd + orderStatus actief\n• COUNT DISTINCT Pdc_Client.bsn gekoppeld aan actieve orders\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct: startDate ≤ peildatum ≤ endDate\n• Pdc_Client.id als unieke cliëntsleutel\n\nALTERNATIEF – PDC Delivery Period:\n• Pdc_DeliveryPeriod: startDate ≤ peildatum ≤ endDate (op basis feitelijke levering)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + beneficiary_id (op procesniveau, ruimer dan toewijzingen)\n\nPRIMAIRE SLEUTEL: Pdc_Client.bsn = Persoon.Klant_BSN = BelanghebbendenPersoon.BSN"
  },
  {
    "id": "D-024",
    "term": "Generieke toewijzing",
    "def": "Een toewijzing waarbij zowel de productcategorie als de productcode leeg zijn (beide null). De aanbieder mag alle gecontracteerde producten leveren. Een generieke toewijzing heeft altijd een maximumbudget; omvang (volume/eenheid) mag niet worden ingevuld. Onderscheid: A-specifiek (D-083) heeft wél een categorie; generiek heeft niets.",
    "ctx": "Gebruikt bij maatwerkcontracten (D-047) waarbij de zorgvraag nog niet precies bepaald is. In PDC: specificity = GENERIC (productcategorie en productcode beide leeg). Controle: stackingCheck deactivateStackingCheck.",
    "fields": "Pdc_CareAllocationProduct.productCode = null, productCategoryCode = null, externalOrderIdentifier, maximumbudget",
    "cat": "Toegang",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Verduidelijkt onderscheid met D-083 (A-specifiek). Zie ook D-036 (toewijzing).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCode"
      }
    ],
    "fieldsFull": "Pdc_CareAllocationProduct.productCode = null, productCategoryCode = null, externalOrderIdentifier, maximumbudget"
  },
  {
    "id": "D-025",
    "term": "Jeugdzorg",
    "def": "Het geheel van jeugdhulp (D-026), jeugdbescherming (D-079) en jeugdreclassering (D-028) dat onder verantwoordelijkheid van de gemeente wordt uitgevoerd conform de Jeugdwet. Omvat zowel vrijwillig als gedwongen kader en zowel ambulante als residentiële zorg.",
    "ctx": "Overkoepelende term voor alle gemeentelijke taken op grond van de Jeugdwet. Wet-code in PDC: IJZ. CBS-term in de Gemeentelijke Monitor Sociaal Domein. Relevant voor totaalbudget en verantwoording.",
    "fields": "Pdc_ProductType.Wet = 'IJZ', alle categorieën 41-55 in productenlijst",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_ProductType.Wet"
      }
    ],
    "fieldsFull": "Pdc_ProductType.Wet = 'IJZ', alle categorieën 41-55 in productenlijst"
  },
  {
    "id": "D-026",
    "term": "Jeugdhulp",
    "def": "Hulp en zorg conform de Jeugdwet aan jeugdigen tot 18 jaar (en in bepaalde gevallen tot 23 jaar) en hun ouders bij psychische, psychosociale of gedragsproblemen, een verstandelijke beperking, of opvoedingsproblemen. Onderscheid: jeugdhulp met verblijf (D-068/segment V) en jeugdhulp zonder verblijf (segment B en C ambulant).",
    "ctx": "Operationele definitie voor inkoop en rapportage. In PDC: wet = IJZ en categorieën 41 (dagbesteding), 43-46 (verblijf/crisis), 45 (ambulant), 50 (maatwerk), 55 (landelijk). Dagbehandeling is jeugdhulp zónder verblijf.",
    "fields": "Pdc_ProductType.Wet = 'IJZ', categorieën 41-55 excl. 47-49 (reclassering/bescherming)",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_ProductType.Wet"
      }
    ],
    "fieldsFull": "Pdc_ProductType.Wet = 'IJZ', categorieën 41-55 excl. 47-49 (reclassering/bescherming)"
  },
  {
    "id": "D-027",
    "term": "Jeugdhulp zonder verblijf",
    "def": "Jeugdhulp waarbij de jeugdige niet overnacht buiten het eigen gezin. Omvat: ambulante begeleiding/behandeling (segment B/C), dagbesteding, dagbehandeling en ambulante crisishulp. Zie D-068 voor het complement (jeugdhulp mét verblijf).",
    "ctx": "CBS-definitie GMSD: 'ambulante jeugdhulp' (zonder verblijf). Productcategorieën: 41 (dagbesteding), 45 (ambulant), 46 (crisishulp ambulant), 50 (maatwerkarrangementen). Dagbehandeling valt onder 'zonder verblijf', ook al is het meerdaags.",
    "fields": "Pdc_ProductType categorie 41, 45, 46, 50 (ambulante vormen)",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Hernoemd van 'Jeugdhulp met verblijf' (D-027 was fout gelabeld). Correctie: D-027 = zónder verblijf, D-068 = mét verblijf.",
    "fieldsFull": "Pdc_ProductType categorie 41, 45, 46, 50 (ambulante vormen)"
  },
  {
    "id": "D-028",
    "term": "Jeugdreclassering",
    "def": "Begeleiding en controle voor jongeren van 12 tot 18 jaar (en in sommige gevallen jongvolwassenen tot 23 jaar) die met politie en justitie in aanraking zijn geweest. Uitgevoerd door gecertificeerde instellingen (GI). Productcodes in categorie 47 (bijv. 47B00 Toezicht & Begeleiding, 47B01 GBM Advies).",
    "ctx": "GI voert uit; gemeente financiert. Geen gemeentelijke beschikking. Verwijzertype = GI of rechter. Wet = IJZ, categorie 47. Zie D-079 (jeugdbescherming) voor OTS/voogdij.",
    "fields": "Pdc_ProductType categorie 47 (47B00-47B06), Wet = IJZ, referrerTypeCode GI/rechter",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldsFull": "Pdc_ProductType categorie 47 (47B00-47B06), Wet = IJZ, referrerTypeCode GI/rechter"
  },
  {
    "id": "D-029",
    "term": "Kinderen in uitkeringsgezinnen",
    "def": "Kinderen tot 18 jaar die woonachtig zijn in een huishouden waarvan minimaal één lid een bijstandsuitkering (WWB/Participatiewet) ontvangt. Gebruikte definitie conform CBS. Indicator voor armoede-gerelateerde risicofactoren en preventiebeleid.",
    "ctx": "CBS-indicator GMSD. Niet direct afleidbaar uit MensCentraal maar via koppeling met Participatiewet-data (StatistiekCodeType 01 bijstand). Relevant voor monitor armoede en doelgroepenbeleid.",
    "fields": "Persoon.Geboortedatum (< 18 jr), bijstandshuishouden via statisticsCodeType = 01",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Data velden zoeken",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Persoon.Geboortedatum"
      }
    ],
    "fieldsFull": "Persoon.Geboortedatum (< 18 jr), bijstandshuishouden via statisticsCodeType = 01"
  },
  {
    "id": "D-030",
    "term": "Kortdurend verblijf (WMO)",
    "def": "Een WMO-maatwerkvoorziening waarbij een cliënt tijdelijk elders verblijft om de mantelzorger te ontlasten (respijtzorg). Wmo-variant (categorie 04 Kortdurend Verblijf). Niet te verwarren met Jeugdhulp met verblijf — kortdurend verblijf (segment V; D-068).",
    "ctx": "In PDC: productcategorie 04 (Kortdurend Verblijf WMO). Wet = WMO. Aanleiding: overbelasting mantelzorger (D-018). Combineerbaar met D-014 (sociale basis) voor preventie-monitoring.",
    "fields": "Pdc_ProductType categorie 2297 (04 Kortdurend Verblijf), Wet = WMO, Persoon.clientID",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Verduidelijkt: WMO-variant (categorie 04). Jeugdhulp kortdurend verblijf valt onder D-068 (segment V).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Persoon.clientID"
      }
    ],
    "fieldsFull": "Pdc_ProductType categorie 2297 (04 Kortdurend Verblijf), Wet = WMO, Persoon.clientID"
  },
  {
    "id": "D-031",
    "term": "WMO-maatwerkarrangement (GMSD-categorieën)",
    "def": "Een Wmo-maatwerkarrangement is individuele ondersteuning afgestemd op de persoonlijke situatie van een cliënt, waarvoor een beschikking nodig is. Binnen de Gemeentelijke Monitor Sociaal Domein (CBS) worden vijf typen onderscheiden: (1) hulp bij het huishouden, (2) ondersteuning thuis, (3) hulpmiddelen en diensten, (4) verblijf en opvang, (5) overig.",
    "ctx": "CBS-categorie-indeling voor jaarlijkse GMSD-aanlevering. Koppelt aan Pdc_ProductCategory.productMainCategory. Relevant voor benchmarking met andere gemeenten.",
    "fields": "Pdc_ProductCategory.productMainCategory, Pdc_ProductType.Wet = WMO, Persoon.clientID",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Vastgesteld",
    "date": "—",
    "notes": "Titelnaam ingekort. 'Landelijk niveau' verwijderd — niet relevant voor lokale definitie.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_ProductCategory.productMainCategory"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.Wet"
      },
      {
        "type": "catalog",
        "label": "Persoon.clientID"
      }
    ],
    "fieldsFull": "Pdc_ProductCategory.productMainCategory, Pdc_ProductType.Wet = WMO, Persoon.clientID"
  },
  {
    "id": "D-032",
    "term": "Zorginstelling (Wlz)",
    "def": "Een instelling die zorg levert op grond van de Wet langdurige zorg (Wlz) voor mensen die 24 uur per dag zorg en toezicht in de nabijheid nodig hebben (verpleeg- of verzorgingshuis, gehandicaptenzorg). Wlz-zorg valt buiten de gemeentelijke verantwoordelijkheid maar is relevant voor doorstroombewaking: cliënten die vanuit gemeentelijke zorg naar Wlz doorstromen zijn een uitstroomreden.",
    "ctx": "Uitstroomreden: 'Overgang naar nieuwe bekostigingssystematiek' of 'Uitstroom naar ander domein'. In MensCentraal te registreren als reden beëindiging toewijzing. Niet declareerbaar via iJw/iWmo.",
    "fields": "ZaakOverzicht.processResult (reden beëindiging = Wlz-overgang), Pdc_ProductType categorie 55 (evt. bij overgang)",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Vastgesteld",
    "date": "—",
    "notes": "Context toegevoegd: relevant als uitstroomreden, niet als gemeentelijke inkoopcategorie.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      }
    ],
    "fieldsFull": "ZaakOverzicht.processResult (reden beëindiging = Wlz-overgang), Pdc_ProductType categorie 55 (evt. bij overgang)"
  },
  {
    "id": "D-033",
    "term": "Zelfstandig wonend",
    "def": "Een jeugdige of (jong)volwassene die zelfstandig woont en niet langer in een gezinssituatie of instelling verblijft. Relevant als uitstroombestemming na begeleid wonen/kamertraining (D-077) of als contextfactor bij het beoordelen van ondersteuningsbehoefte. Leeftijdsgrens jeugd: 18 jaar (of 23 bij verlengde jeugdhulp).",
    "ctx": "Doeluitkomst voor producten kamertraining/zelfstandigheidstraject (44ZHT). In MensCentraal: GmDoelstelling 'zelfstandig wonen' als resultaatgebied. Ook input voor de ZRM-score (zelfredzaamheidsmatrix, wonen-schaal).",
    "fields": "GmDoelstelling, ZaakOverzicht.processResult (zelfstandig wonen), ZRM-schaal wonen",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Data velden zoeken",
    "date": "—",
    "notes": "Was leeg — nu ingevuld. Koppeling met kamertraining (44ZHT) en ZRM toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      }
    ],
    "fieldsFull": "GmDoelstelling, ZaakOverzicht.processResult (zelfstandig wonen), ZRM-schaal wonen"
  },
  {
    "id": "D-034",
    "term": "Voorziening",
    "def": "De feitelijke ondersteuning of dienst die aan een cliënt wordt geleverd op basis van een beschikking of toewijzing. Een voorziening is een concreet product (productcode) geleverd door een aanbieder gedurende een bepaalde periode. Voorzieningen zijn maatwerkgericht (beschikking nodig) of vrij toegankelijk (geen beschikking). Zie D-020 voor productcode en D-035 voor beschikking.",
    "ctx": "In PDC: Pdc_ProductType. Elke actieve toewijzing (Pdc_CareAllocationProduct) vertegenwoordigt één geleverde voorziening. Relevant voor tellingen cliënten met voorzieningen (D-023) en beschikte voorzieningen (D-037).",
    "fields": "Pdc_CareAllocationProduct, Pdc_ProductType, productCode, startDate, endDate",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldsFull": "Pdc_CareAllocationProduct, Pdc_ProductType, productCode, startDate, endDate"
  },
  {
    "id": "D-035",
    "term": "Beschikking",
    "def": "Het juridische besluit (Awb-beschikking) van de gemeente waaruit blijkt of en welke maatwerkvoorziening aan een cliënt wordt toegekend. Een beschikking heeft een uniek beschikkingnummer (disposalNr), een ingangsdatum (allocationDate) en een einddatum. De beschikking is de grondslag voor de toewijzing aan de aanbieder. Onderscheid: beschikking (juridisch besluit gemeente) ≠ toewijzing (operationele opdracht aan aanbieder).",
    "ctx": "In PDC: Pdc_CareAllocationProduct.disposalNr en allocationDate. In MensCentraal: zaakstap type DISPOSITION. Beschikkingsduur = D-017. Beslistermijn = D-060.",
    "fields": "PRIMAIR – Zaaksysteem:\n• Disposition.number (beschikkingsnummer)\n• Disposition.issueDate (afgiftedatum)\n• Disposition.kind = DISPOSITION of INDICATION\n• Disposition.objectionDeadline (bezwaartermijn)\n",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Verduidelijkt: onderscheid beschikking vs. toewijzing expliciet gemaakt.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Disposition.number"
      },
      {
        "type": "catalog",
        "label": "Disposition.issueDate"
      },
      {
        "type": "catalog",
        "label": "Disposition.kind"
      },
      {
        "type": "catalog",
        "label": "Disposition.objectionDeadline"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.processId"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.disposalNr"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.disposalNr"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.disposalNr"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• Disposition.number (beschikkingsnummer)\n• Disposition.issueDate (afgiftedatum)\n• Disposition.kind = DISPOSITION of INDICATION\n• Disposition.objectionDeadline (bezwaartermijn)\n\nALTERNATIEF – PDC Orders:\n• Pdc_Orders.processId (beschikkingsnummer in de order)\n• Pdc_CareAllocationProduct.disposalNr\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.disposalNr (beschikkingsnummer in 315-bericht)\n\nALTERNATIEF – PDC CareMessage:\n• Pdc_CareMessage.disposalNr (beschikkingnummer in zorgbericht)"
  },
  {
    "id": "D-036",
    "term": "Toewijzing",
    "def": "De administratieve opdracht aan een zorgaanbieder om een specifiek product te leveren aan een cliënt, gebaseerd op een beschikking. Een toewijzing bevat: aanbieder (agbCode), productcode, volume/eenheid/frequentie, start- en einddatum en toewijzingsnummer (externalOrderIdentifier). Typen: specifiek (productcode gevuld), A-specifiek (D-083, alleen categorie), generiek (D-024, beide leeg).",
    "ctx": "Operationele kern van iJw/iWmo. In PDC: Pdc_CareAllocationProduct. Toewijzingsnummer = externalOrderIdentifier = LDT-nummer. Via JW301/303/305 (jeugd) of WMO301/303/305 (Wmo) berichten verstuurd naar aanbieder.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.externalOrderIdentifier (LDT-toewijzingsnummer)\n• Pdc_Orders.deliveryDateStart + deliveryDateEnd (looptijd)\n• Pdc_Orders.supplier_id → Pdc_Supplier.agbCode (aanbiede",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Uitgebreid met toewijzingstypen en LDT-nummerkoppeling.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.externalOrderIdentifier"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.supplier_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderStatus"
      },
      {
        "type": "catalog",
        "label": "PdcOrder.process_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.externalOrderIdentifier"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.externalOrderIdentifier"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.externalOrderIdentifier (LDT-toewijzingsnummer)\n• Pdc_Orders.deliveryDateStart + deliveryDateEnd (looptijd)\n• Pdc_Orders.supplier_id → Pdc_Supplier.agbCode (aanbieder)\n• Pdc_Orders.orderStatus (status toewijzing)\n• PdcOrder.process_id (koppeling naar zaak)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.externalOrderIdentifier\n• Pdc_CareAllocationProduct.agbCode + productCode + startDate\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.externalOrderIdentifier (toewijzingnummer in 315)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht via PdcOrder.process_id (omgekeerde koppeling order → zaak)"
  },
  {
    "id": "D-037",
    "term": "Beschikte voorzieningen",
    "def": "Het totale aantal actieve beschikkingen/toewijzingen op een peildatum of in een periode — telt op voorzieningenniveau (niet op cliëntniveau). Eén cliënt kan meerdere beschikte voorzieningen hebben (samenloop/stapeling). Relevant voor capaciteitsplanning en budgetbewaking per productcategorie.",
    "ctx": "In PDC: telling van Pdc_CareAllocationProduct-records actief op peildatum. Inclusief samenloop (zie D-020 samenloop en D-052 uitnutting). Onderscheid van D-023 (cliënten met voorzieningen, telt unieke personen).",
    "fields": "PRIMAIR – PDC Orders:\n• COUNT Pdc_Orders actief op peildatum: deliveryDateStart ≤ peildatum ≤ deliveryDateEnd\n• Pdc_Orders.productType_id (per product tellen)\n\nALTERNATIEF – PDC CareAllocationProduct:",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Onderscheid van D-023 verduidelijkt.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.disposalNr"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• COUNT Pdc_Orders actief op peildatum: deliveryDateStart ≤ peildatum ≤ deliveryDateEnd\n• Pdc_Orders.productType_id (per product tellen)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• COUNT Pdc_CareAllocationProduct actief op peildatum per productCode\n\nALTERNATIEF – PDC Delivery Period:\n• Pdc_DeliveryPeriod: startDate ≤ peildatum ≤ endDate (feitelijk geleverd)\n\nALTERNATIEF – PDC Declaration:\n• COUNT unieke Pdc_Declaration.disposalNr actief in periode (op declaratiebasis)"
  },
  {
    "id": "D-038",
    "term": "PGB (Persoonsgebonden budget)",
    "def": "Een geldbedrag dat de gemeente aan een cliënt toekent waarmee de cliënt zelf zorg of ondersteuning inkoopt bij een aanbieder naar keuze. Tegenovergesteld aan Zorg in natura (D-011). In PDC: paymentToCitizen = 1 (betaling aan burger) of paymentToCreditor = 1 (betaling aan budgethouder/zorgverlener).",
    "ctx": "In PDC: Pdc_ProductType.paymentToCitizen = 1 of paymentToCreditor = 1. Budgetbeheer via SVB (sociale verzekeringsbank) of trekkingsrecht. Afwijkende declaratieroute van ZIN; geen iJw/iWmo declaratiebericht maar trekkingsrechtbericht.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderSoort = 'PGB'\n• Pdc_Budget.reference + law + totalSpent (PGB-budgetoverzicht)\n• Pdc_Budget.client_id + calendarYear\n\nALTERNATIEF – PDC ProductType:\n• Pdc_Produc",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Koppeling PDC-velden toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderSoort"
      },
      {
        "type": "catalog",
        "label": "Pdc_Budget.reference"
      },
      {
        "type": "catalog",
        "label": "Pdc_Budget.client_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.paymentToCitizen"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.paymentToCreditor"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.budget_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Budget.law"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderSoort = 'PGB'\n• Pdc_Budget.reference + law + totalSpent (PGB-budgetoverzicht)\n• Pdc_Budget.client_id + calendarYear\n\nALTERNATIEF – PDC ProductType:\n• Pdc_ProductType.paymentToCitizen = 1 (betaling aan burger → PGB)\n• Pdc_ProductType.paymentToCreditor = 1 (betaling aan crediteur → PGB trekkingsrecht)\n\nALTERNATIEF – PDC Client:\n• Pdc_Orders.budget_id IS NOT NULL → PGB\n• Pdc_Budget.law ('W'=WMO-BG, 'J'=Jeugdwet, 'B'=WMO-HH)"
  },
  {
    "id": "D-039",
    "term": "Zorgtraject",
    "def": "Een aaneenschakeling van toewijzingen aan één cliënt zonder een onderbreking van meer dan [31 dagen] tussen opeenvolgende toewijzingen. Startdatum = startdatum eerste toewijzing. Einddatum = einddatum laatste toewijzing (status: verwacht/voorlopig/definitief). Eén cliënt kan meerdere opeenvolgende of gelijktijdige trajecten hebben.",
    "ctx": "Conform MSD v1.0. De 31-dagen grens is een configureerbare parameter. Einddatumstatus (verwacht/voorlopig/definitief) bepaalt of een traject meegenomen wordt in uitstroommeting (D-015). Samenloop van trajecten = cliënt heeft tegelijk meerdere actieve toewijzingen.",
    "fields": "PRIMAIR – PDC Orders (meest volledig):\n• Keten van Pdc_Orders per client_id/bsn, gegroepeerd op aaneengesloten periodes\n• Pdc_Orders.deliveryDateStart, deliveryDateEnd, orderStatus\n• 31-dagentermijn: ",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld o.b.v. MSD v1.0 (slides 8-11).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Client.bsn"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders (meest volledig):\n• Keten van Pdc_Orders per client_id/bsn, gegroepeerd op aaneengesloten periodes\n• Pdc_Orders.deliveryDateStart, deliveryDateEnd, orderStatus\n• 31-dagentermijn: gap tussen opeenvolgende orders ≤ 31 dgn → zelfde traject\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Keten van Pdc_CareAllocationProduct per clientID, zelfde 31-dagensystematiek\n\nALTERNATIEF – PDC Delivery Period:\n• Pdc_DeliveryPeriod per order: feitelijke startDate/endDate per zorgbericht (meest nauwkeurig)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processStartDate + processEndDate per cliënt (op zaakbasis; ruimer)\n\nPRIMAIRE SLEUTEL: Pdc_Client.bsn koppelt alle orders aan één persoon"
  },
  {
    "id": "D-040",
    "term": "Uniek huishouden",
    "def": "Een huishouden gedefinieerd als één of meer personen die op hetzelfde adres (woonadres) zijn ingeschreven in de Basisregistratie Personen (BRP). Eén uniek huishouden telt als één eenheid voor huishoudtellingen — ook als er meerdere cliënten in hetzelfde huishouden wonen. Relevant voor meervoudige gezinsproblematiek (D-008) en kostenaggregatie op gezinsniveau.",
    "ctx": "In MensCentraal: GmClientGroep kan huishoud- of gezinsverband vastleggen. GBA-koppeling via persoon.lastUpdate (DKD-berichtenservice). Huishoudens met meerdere jeugdhulpcliënten zijn relevant voor de multiprobleemmonitor.",
    "fields": "Persoon.Klant_BSN (koppeling BRP), GmClientGroep, GmClientGroepAdres, GBA-abonnement",
    "cat": "Beslistermijn",
    "team": "WMO & Backoffice",
    "status": "Data velden zoeken",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Koppeling met BRP en GmClientGroep toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Persoon.Klant_BSN"
      }
    ],
    "fieldsFull": "Persoon.Klant_BSN (koppeling BRP), GmClientGroep, GmClientGroepAdres, GBA-abonnement"
  },
  {
    "id": "D-041",
    "term": "Actieve cliënten (procesniveau)",
    "def": "Het aantal unieke cliënten met minimaal één actief zaak/proces (ZaakOverzicht.status = ACTIVE) in MensCentraal op de peildatum. Verschilt van D-023 (actieve cliënten op toewijzingsniveau): D-041 telt open zaken, D-023 telt actieve zorgproducten. Relevant voor caseloadbewaking (D-044).",
    "ctx": "In MensCentraal: ZaakOverzicht.status = ACTIVE op peildatum, per team/zaaktype. Standvariabele. Combineerbaar met D-044 (caseload) voor normering werkdruk. Onderscheid van D-023 is belangrijk voor dubbeltelling-preventie.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + mcUser_id/organisation_id (per medewerker/team)\n\nALTERNATIEF – PDC Orders (op productbasis):\n• Pdc_Orders: orderStatus actief op peildatum, per",
    "cat": "Beslistermijn",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Onderscheid D-041 (processen) vs. D-023 (toewijzingen) verduidelijkt.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "Signaal.Klant_BSN"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + mcUser_id/organisation_id (per medewerker/team)\n\nALTERNATIEF – PDC Orders (op productbasis):\n• Pdc_Orders: orderStatus actief op peildatum, per community_id\n• COUNT DISTINCT client_id met actieve order\n\nALTERNATIEF – PDC CareAllocationProduct:\n• COUNT DISTINCT clientID met startDate ≤ peildatum ≤ endDate\n\nALTERNATIEF – Signaal-tabel:\n• Signaal.Klant_BSN actief (als proxy voor actieve betrokkenheid)"
  },
  {
    "id": "D-044",
    "term": "Caseload",
    "def": "Het aantal actieve zaken (ZaakOverzicht.status = ACTIVE) dat op een peildatum is toegewezen aan één medewerker, team of organisatieonderdeel. Caseload = actieve cliënten D-041 per medewerker (mcUser_id of organisatie_id). Normcaseload varieert per zaaktype en intensiteit.",
    "ctx": "In MensCentraal: ZaakOverzicht gefilterd op mcUser_id (of Zaakgebruiker.organisation_id) + status ACTIVE. Caseloadnorm per zaaktype configureerbaar. Input voor capaciteitsplanning en sturingsrapportage teams.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + Zaakgebruiker.mcUser_id of organisation_id\n• COUNT per medewerker/team\n\nALTERNATIEF – PDC Orders:\n• COUNT actieve Pdc_Orders per Pdc_Orders.use",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Definitie aangescherpt: koppeling MensCentraal-velden toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.userAccount"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + Zaakgebruiker.mcUser_id of organisation_id\n• COUNT per medewerker/team\n\nALTERNATIEF – PDC Orders:\n• COUNT actieve Pdc_Orders per Pdc_Orders.userAccount\n  (medewerker gekoppeld aan order/bestelling)\n\nALTERNATIEF – GebruikersOrganisaties:\n• Koppeling Gebruikers.mcUser_id naar OrganisatieGroep voor teamcaseload"
  },
  {
    "id": "D-045",
    "term": "Hergebruik van zorg",
    "def": "Het verschijnsel dat een cliënt na afsluiting van een eerder zorgtraject opnieuw een toewijzing ontvangt voor dezelfde of vergelijkbare zorg. Synoniemen: herintreder (> 3 maanden onderbreking) of recidivist (1-3 maanden onderbreking). Een cliënt is een 'terugkerende cliënt' (D-053) als hij eerder al een traject had.",
    "ctx": "Conform MSD v1.0 (slide 7). In PDC: cliënten met meerdere opeenvolgende trajecten (via Pdc_CareAllocationProduct historie per cliënt_id). Onderbrekingstermijn is configureerbare parameter. Hoog hergebruik kan wijzen op ineffectieve zorgketen.",
    "fields": "PRIMAIR – PDC Orders (meest volledig):\n• Historische reeks Pdc_Orders per client_id/bsn gesorteerd op deliveryDateStart\n• Kloof tussen twee opeenvolgende periodes:\n  - 1-3 maanden → recidivist\n  - > 3",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Data velden zoeken",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Koppeling met MSD-definitie herintreder/recidivist.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Client.bsn"
      },
      {
        "type": "catalog",
        "label": "Persoon.Klant_BSN"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders (meest volledig):\n• Historische reeks Pdc_Orders per client_id/bsn gesorteerd op deliveryDateStart\n• Kloof tussen twee opeenvolgende periodes:\n  - 1-3 maanden → recidivist\n  - > 3 maanden → herintreder\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Historische toewijzingen per clientID, vergelijking einddatum vorig / startdatum volgend\n\nALTERNATIEF – Zaaksysteem:\n• Meerdere ZaakOverzicht-records per beneficiary_id over de tijd\n\nPRIMAIRE SLEUTEL: Pdc_Client.bsn / Persoon.Klant_BSN voor volledige historie"
  },
  {
    "id": "D-046",
    "term": "Afronding zorg",
    "def": "Het moment waarop een zorgtraject planmatig wordt afgesloten, zodanig dat de gestelde doelen zijn behaald of de noodzaak tot verdere zorg is komen te vervallen. Afrondingsreden 'Volgens plan beëindigd' is de positieve uitstroomcategorie. Onderscheid van voortijdige beëindiging (eenzijdig door cliënt/aanbieder) of administratieve beëindiging.",
    "ctx": "In MensCentraal: ZaakOverzicht.processResult (reden beëindiging) + Plan.planResult = SUCCESS. Reden beëindiging conform iStandaard (bijv. 'Volgens plan beëindigd'). Input voor effectiviteitsmeting en outcomerapportage.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processResult = 'Volgens plan beëindigd'\n• Plan.planResult = SUCCESS + Plan.finalizedOn\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_CareMessage.type = 'stop care mes",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Koppeling Plan.planResult en reden beëindiging.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processResult"
      },
      {
        "type": "catalog",
        "label": "Plan.planResult"
      },
      {
        "type": "catalog",
        "label": "Plan.finalizedOn"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.reasonDescription"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.changeReason"
      },
      {
        "type": "catalog",
        "label": "Pdc_ChangeReason.useableForTermination"
      },
      {
        "type": "catalog",
        "label": "GmDoelstelling.gmGoalResultType"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processResult = 'Volgens plan beëindigd'\n• Plan.planResult = SUCCESS + Plan.finalizedOn\n\nALTERNATIEF – PDC Care Messages:\n• Pdc_CareMessage.type = 'stop care message' + reasonCode = planmatig (bijv. code 01)\n• Pdc_CareMessage.reasonDescription\n\nALTERNATIEF – PDC Orders:\n• Pdc_Orders.changeReason = CLIENT_DISEASED / planmatige code\n• Pdc_ChangeReason.useableForTermination = 1 + description\n\nALTERNATIEF – GmDoelstelling:\n• GmDoelstelling.gmGoalResultType = GOAL_REACHED + closedOn (doel behaald als proxy)"
  },
  {
    "id": "D-047",
    "term": "Maatwerkcontract (Gemeente Medemblik)",
    "def": "Een lokaal door gemeente Medemblik afgesloten contract voor zorg of ondersteuning die niet via de regionale raamovereenkomst (Westfriesland) of landelijke inkoop beschikbaar is. Productcodes in categorie 50 (Maatwerkarrangementen Jeugd: 50A90-50A99) of vergelijkbare WMO-maatwerkproducten. Toewijzing is veelal generiek (D-024) of A-specifiek (D-083).",
    "ctx": "In PDC: categorie 50 maatwerkarrangementen Jeugd (50A90-50A99 etc.) of vergelijkbare WMO-codes. Besluit lokale toegang. Hoger risico op over- of onderbenutten; vergt monitoring via D-052.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType categorie 50 (maatwerkarrangementen Jeugd)\n• Pdc_Orders.externalCaseId (koppeling naar maatwerkkzaak)\n• Pdc_Contract.purchaseAgreeme",
    "cat": "Toegang",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Definitie uitgebreid: productcodes en risico's nu benoemd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.externalCaseId"
      },
      {
        "type": "catalog",
        "label": "Pdc_Contract.purchaseAgreement"
      },
      {
        "type": "catalog",
        "label": "Pdc_ContractAgreement.contract_id"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "PdcOrder.process_id"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_name"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType categorie 50 (maatwerkarrangementen Jeugd)\n• Pdc_Orders.externalCaseId (koppeling naar maatwerkkzaak)\n• Pdc_Contract.purchaseAgreement = null of lokaal contract\n\nALTERNATIEF – PDC ContractAgreement:\n• Pdc_ContractAgreement.contract_id → Pdc_Contract (lokale contracten vs. regionale)\n• Pdc_Contract.purchaseAgreement = null (geen REGIONAL/NATIONWIDE = maatwerk)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processType_code = maatwerkzaaktype\n• PdcOrder.process_id → ZaakOverzicht.processType_name"
  },
  {
    "id": "D-048",
    "term": "Herindicatie (maatwerk verlenging)",
    "def": "Het opnieuw indiceren en beschikken van een voorziening voor een cliënt wiens lopende beschikking afloopt, maar die nog steeds ondersteuning nodig heeft. In iStandaarden: een vervolgstoewijzing (toewijzingstype 'Vervolg toewijzing') met hetzelfde product voorafgegaan door een eerdere toewijzing voor hetzelfde product.",
    "ctx": "Conform MSD v1.0 (slide 14-17). In PDC: nieuwe Pdc_CareAllocationProduct bij hetzelfde cliënt_id en productcode, aansluitend op vorige. Termijn herindicatie afhankelijk van beschikkingsduur (D-017) en intensiteit (D-070). Duurzame intensiteiten kunnen meerjarig worden afgegeven.",
    "fields": "PRIMAIR – PDC Orders:\n• Meerdere opeenvolgende Pdc_Orders per client_id + zelfde productType_id (= vervolgorder)\n• Pdc_Orders.changeReason op vorige order = verlenging/herindicatie-reden\n\nALTERNATIEF ",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg ('maatwerk verlenging') — hernoemd naar 'Herindicatie'. MSD-verwijzing toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.changeReason"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.reasonForRequest"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.modificationType"
      },
      {
        "type": "catalog",
        "label": "Term.postponable"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Meerdere opeenvolgende Pdc_Orders per client_id + zelfde productType_id (= vervolgorder)\n• Pdc_Orders.changeReason op vorige order = verlenging/herindicatie-reden\n\nALTERNATIEF – PDC CareRequestProduct (315-bericht):\n• Pdc_CareRequestProduct.reasonForRequest = SITUATION_CHANGE of EXTENSION\n• Pdc_CareRequestProduct.modificationType = CHANGED\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht: nieuwe zaak na afsluiting met zelfde beneficiary_id en productCode\n• Term.postponable = 1 (verlenging beslistermijn als proxy)"
  },
  {
    "id": "D-049",
    "term": "Meerkosten",
    "def": "Kosten die een aanbieder declareert boven het standaardtarief van een product, wanneer de zorgzwaarte of bijzondere omstandigheden hogere inzet vereisen dan het tarief dekt. In de Westfriese inkoop worden meerkosten doorgaans niet apart gedeclareerd maar verwerkt in maatwerktarieven (D-047) of individuele tarieven (Pdc_ProductType.individualRate = 1).",
    "ctx": "In PDC: Pdc_ProductType.individualRate = 1 geeft aan dat er een individueel tarief van toepassing is. Meerkosten zijn financieel risico in budgetbewaking (D-051). Relevant bij hoog complexe zorg (segment C) en maatwerkcontracten.",
    "fields": "PRIMAIR – PDC ContractAgreement / CostPeriod:\n• Pdc_CostPeriod.calculatedCost vs. Pdc_ContractAgreement.amount (afwijking = meerkosten)\n• Pdc_Orders.maxCost vs. Pdc_Orders.adjustedMaxCost (verschil = ",
    "cat": "Beslistermijn",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg — nu ingevuld. Koppeling PDC-veld individualRate.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CostPeriod.calculatedCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_ContractAgreement.amount"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.maxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.adjustedMaxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.individualRate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.residualCosts"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.declaredAmount"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC ContractAgreement / CostPeriod:\n• Pdc_CostPeriod.calculatedCost vs. Pdc_ContractAgreement.amount (afwijking = meerkosten)\n• Pdc_Orders.maxCost vs. Pdc_Orders.adjustedMaxCost (verschil = extra kosten)\n\nALTERNATIEF – PDC Orders:\n• Pdc_ProductType.individualRate = 1 (individueel tarief → meerkosten mogelijk)\n• Pdc_Orders.residualCosts (restkosten na afrekening)\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.declaredAmount vs. calculatedAmount (verschil op declaratiebasis)"
  },
  {
    "id": "D-051",
    "term": "Overschrijding zorgbudget (overzorgkosten)",
    "def": "De situatie waarbij de werkelijke zorgkosten van een cliënt of productcategorie het beschikbaar gestelde (of geraamde) budget overschrijden. Kan optreden bij: hoge uitnutting (D-052), onverwachte volumetoename, meerkosten (D-049) of te lage tariefstelling. Relevant voor de financiële monitor en de jaarlijkse verantwoording.",
    "ctx": "Berekend als som van gefactureerde bedragen minus toegewezen budget per categorie/periode. Niet direct beschikbaar als één veld — vereist koppeling van toewijzingsdata (Pdc_CareAllocationProduct) met declaratiedata. Signaalindicator bij >100% uitnutting (D-052).",
    "fields": "PRIMAIR – PDC Declaration:\n• SUM Pdc_Declaration.declaredAmount (ACCEPTED) per productCode/periode\n  vs. SUM Pdc_Orders.maxCost (toegewezen budget) per categorie\n\nALTERNATIEF – PDC Orders:\n• Pdc_Order",
    "cat": "Beslistermijn",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "15-06-2026",
    "notes": "Was leeg (naam 'Overzorgkosten') — hernoemd naar beschrijvende naam. Nu ingevuld.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Declaration.declaredAmount"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.maxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.remainingBudget"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.confirmedUtilization"
      },
      {
        "type": "catalog",
        "label": "Pdc_CostPeriod.calculatedCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_Claim.originalAmount"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Declaration:\n• SUM Pdc_Declaration.declaredAmount (ACCEPTED) per productCode/periode\n  vs. SUM Pdc_Orders.maxCost (toegewezen budget) per categorie\n\nALTERNATIEF – PDC Orders:\n• Pdc_Orders.maxCost − Pdc_Orders.remainingBudget (verbruikt vs. toegewezen)\n• Pdc_Orders.confirmedUtilization (bevestigde uitnutting per order)\n\nALTERNATIEF – PDC CostPeriod:\n• SUM Pdc_CostPeriod.calculatedCost per periode vs. beschikbaar budget\n\nALTERNATIEF – PDC Claim:\n• Pdc_Claim.originalAmount (terugvorderingen als indicatie overschrijding)"
  },
  {
    "id": "D-052",
    "term": "Uitnutting zorg",
    "def": "De verhouding tussen de hoeveelheid zorg die daadwerkelijk geleverd en gedeclareerd is en de hoeveelheid zorg die in de beschikking/toewijzing is toegewezen (volume × tarief). Uitnutting = (gedeclareerde omvang / toegewezen omvang) × 100%. Een uitnutting van 100% betekent exacte benutting; <80% kan wijzen op onderbenutting of onjuiste toewijzing.",
    "ctx": "Berekend op basis van Pdc_CareAllocationProduct (toewijzing) vs. declaratiedata. Uitnutting varieert per costingSchemeType: bij EFFORT_BASED zijn uren declarabel; bij OUTPUT_BASED is de standaardvolume-eenheid maatgevend. Lage uitnutting triggert contractgesprek.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.confirmedUtilization (rechtstreeks bevestigde uitnutting)\n• Pdc_Orders.maxCost vs. gedeclareerd (Pdc_Declaration.declaredAmount ACCEPTED)\n• Pdc_Orders.remainingBudge",
    "cat": "Beslistermijn",
    "team": "Bedrijfsvoering",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Formule toegevoegd. Onderscheid effort- vs. outputgericht nu expliciet.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.confirmedUtilization"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.maxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.declaredAmount"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.remainingBudget"
      },
      {
        "type": "catalog",
        "label": "Pdc_CostPeriod.calculatedCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_ContractAgreement.amount"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.confirmedUtilization (rechtstreeks bevestigde uitnutting)\n• Pdc_Orders.maxCost vs. gedeclareerd (Pdc_Declaration.declaredAmount ACCEPTED)\n• Pdc_Orders.remainingBudget / maxCost = resterende ruimte\n\nALTERNATIEF – PDC Declaration:\n• SUM Pdc_Declaration.declaredAmount ACCEPTED per order_id / externalOrderIdentifier\n  vs. Pdc_Orders.maxCost → uitnutting%\n\nALTERNATIEF – PDC CostPeriod (meest nauwkeurig):\n• SUM Pdc_CostPeriod.calculatedCost / Pdc_ContractAgreement.amount × 100%\n• Per periode gesplitst (maand/kwartaal)\n\nALTERNATIEF – PDC Delivery Period:\n• Feitelijke leveringsperiode (startDate/endDate) vs. toewijzingsperiode\n  (als volume-uitnutting bij EFFORT_BASED)"
  },
  {
    "id": "D-053",
    "term": "Ingestroomde cliënten",
    "def": "Cliënten die in de geselecteerde periode niet actief waren aan het begin maar gedurende de periode minimaal één actief zorgtraject hebben gehad. Drie subtypes conform MSD v1.0: (1) Nieuw gestarte cliënt — nooit eerder een traject gehad; (2) Terugkerende cliënt — eerder een traject gehad, buiten de geselecteerde periode; (3) Nieuw en terugkerend — eerder en ook in de periode al een traject gehad. Stroomvariabele.",
    "ctx": "Conform MSD v1.0 (slides 4-6). In PDC: cliënten met startDate eerste toewijzing binnen de periode. Subtype bepaald door historische trajecten per cliënt_id. Peildatum-afhankelijk; subtypes kunnen per periode wisselen.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateStart binnen periode (instroom op orderbasis)\n• Historische check: vorige orders per client_id om type te bepalen\n  (nieuw / terugkerend / nieuw+terugker",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "09-06-2026",
    "notes": "Definitie aangevuld met drie subtypes (MSD v1.0 slide 5). Was slechts 'drie types' zonder uitleg.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.startDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.startDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Client.bsn"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.deliveryDateStart binnen periode (instroom op orderbasis)\n• Historische check: vorige orders per client_id om type te bepalen\n  (nieuw / terugkerend / nieuw+terugkerend)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.startDate binnen periode per clientID\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processStartDate binnen periode per beneficiary_id\n• Historische ZaakOverzicht per beneficiary_id (voor terugkerend-check)\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.startDate (aangevraagde ingangsdatum als proxy instroom)\n\nPRIMAIRE SLEUTEL: Pdc_Client.bsn voor historische koppeling"
  },
  {
    "id": "D-054",
    "term": "Gezinsgericht verblijf",
    "def": "Alle vormen van jeugdhulp met verblijf waarbij de verblijfssetting een gezinssituatie benadert — dat wil zeggen kleinschalig en georganiseerd vanuit een thuisomgeving — maar waarbij het geen formele pleegzorg betreft. Omvat: gezinshuizen (44GHL/GHM/GHH), logeerhuizen en zorgboerderijen met overnachting. PGB-gefinancierd verblijf is hier niet in meegenomen.",
    "ctx": "CBS-categorie 'gezinsgerichte jeugdhulp' in GMSD. In PDC: productcodes 44GHL, 44GHM, 44GHH (gezinshuizen) en gelijkwaardige logeer-/boerderijvormen. Zie D-077 (gezinshuis) voor specificaties.",
    "fields": "Pdc_ProductType categorieën 44GHL/GHM/GHH, Wet = IJZ, verblijfsvorm = gezinsgericht",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Hernoemd van 'Gezinsgericht' naar 'Gezinsgericht verblijf'. Scope verduidelijkt.",
    "fieldsFull": "Pdc_ProductType categorieën 44GHL/GHM/GHH, Wet = IJZ, verblijfsvorm = gezinsgericht"
  },
  {
    "id": "D-055",
    "term": "Uitstroom naar lichtere zorg",
    "def": "Een toewijzingswijziging waarbij een cliënt vanuit een zwaardere zorgcategorie instroomt in een lichtere categorie — bijvoorbeeld van midden complexe (profielen 5-8) naar laag complexe jeugdhulp (profielen 1-4), of van verblijf naar ambulant. Kenmerk: de nieuwe toewijzing heeft een lager intensiteitsniveau of lagere complexiteitscategorie dan de vorige.",
    "ctx": "Conform MSD v1.0 (slide 16): toewijzingsstatus 'Verlaging' (intensiteit lager). In PDC: vervolgstoewijzing met lagere intensiteitswaarde of lager segment. Positieve uitkomstindicator. Input voor afschaalmonitor.",
    "fields": "PRIMAIR – PDC Orders:\n• Opeenvolgende Pdc_Orders per client_id: nieuw productType heeft lagere categorie/intensiteit\n• Pdc_Orders.productType_id vergelijking: segment B profiel 5-8 → 1-4, of verblijf ",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Definitie aangescherpt: koppeling MSD-statusveld 'Verlaging' toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.modificationType"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Opeenvolgende Pdc_Orders per client_id: nieuw productType heeft lagere categorie/intensiteit\n• Pdc_Orders.productType_id vergelijking: segment B profiel 5-8 → 1-4, of verblijf → ambulant\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.modificationType = CHANGED + lagere productCode in vervolgorder\n\nALTERNATIEF – Zaaksysteem:\n• Opeenvolgende ZaakOverzicht per beneficiary_id met lager zaaktype/segment\n\nALTERNATIEF – PDC CareMessage:\n• Stopzorgbericht op hoog product + startzorgbericht op lager product in zelfde periode"
  },
  {
    "id": "D-056",
    "term": "Instroom naar zwaardere zorg",
    "def": "Een toewijzingswijziging waarbij een cliënt vanuit een lichtere zorgcategorie instroomt in een zwaardere — bijvoorbeeld van ambulant naar verblijf, of van laag naar midden complex. Kenmerk: de nieuwe toewijzing heeft een hogere intensiteit of complexiteitscategorie dan de vorige.",
    "ctx": "Conform MSD v1.0 (slide 16): toewijzingsstatus 'Verhoging' (intensiteit hoger). Negatieve signaalwaarde: wijst op escalatie of onvoldoende effect van lichtere interventie. Input voor opschaalmonitor en preventiebeleid.",
    "fields": "PRIMAIR – PDC Orders:\n• Opeenvolgende Pdc_Orders per client_id: nieuw productType heeft hogere categorie/intensiteit\n• Pdc_Orders: van categorie 45 ambulant naar categorie 44 verblijf, of van profiel ",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "MSD-koppeling statusveld 'Verhoging' toegevoegd.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.modificationType"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Opeenvolgende Pdc_Orders per client_id: nieuw productType heeft hogere categorie/intensiteit\n• Pdc_Orders: van categorie 45 ambulant naar categorie 44 verblijf, of van profiel 1-4 naar 5-8\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.modificationType = CHANGED + hogere productCode in vervolgorder\n• reasonForRequest = SITUATION_CHANGE\n\nALTERNATIEF – Zaaksysteem:\n• Nieuwe ZaakOverzicht per beneficiary_id met zwaarder zaaktype/segment dan voorgaande"
  },
  {
    "id": "D-057",
    "term": "Datum van aanmelding",
    "def": "De datum waarop een jeugdige of gezin zich aanmeldt bij een zorgaanbieder voor hulp. Bij een artsverwijzing: de dag waarop de jeugdige/ouder contact opneemt met de aanbieder. Bij een GI- of lokaalteam-verwijzing: de dag waarop de verwijzer contact opneemt met de aanbieder en de cliënt aanmeldt. In het iJw-berichtenverkeer vastgelegd als aanvangzorgdatum (JW315).",
    "ctx": "Start van de leveringsketen bij de aanbieder; niet gelijk aan datum aanvraag gemeente (D-058). In PDC: Pdc_CareAllocationProduct.startDate of aanvangzorgdatum. Relevant voor wachttijdmeting (D-016): gap tussen allocationDate en startDate.",
    "fields": "PRIMAIR – PDC CareMessage:\n• Pdc_CareMessage.type = 'start care message' → startDate (datum startzorgbericht van aanbieder)\n• Pdc_DeliveryPeriod.startDate (eerste startzorgbericht per order)\n\nALTERNAT",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "09-06-2026",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "Pdc_DeliveryPeriod.startDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.startDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC CareMessage:\n• Pdc_CareMessage.type = 'start care message' → startDate (datum startzorgbericht van aanbieder)\n• Pdc_DeliveryPeriod.startDate (eerste startzorgbericht per order)\n\nALTERNATIEF – PDC Orders:\n• Pdc_Orders.deliveryDateStart (geplande startdatum levering in toewijzing)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.startDate (aanvangzorgdatum zoals ontvangen in JW315)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processStartDate (datum aanmelding/start zaak als proxy)"
  },
  {
    "id": "D-058",
    "term": "Aanvraag jeugdhulp (gemeentelijke route)",
    "def": "Een formele jeugdhulpvraag ingediend via het gemeentelijk webformulier of aan de balie door een burger of professional. De datum van aanvraag is de start van de wettelijke beslistermijn van 8 weken (D-060). Onderscheid van aanvraag via verwijzer (D-059): bij gemeentelijke route verleent de gemeente de beschikking.",
    "ctx": "Zaaktype in MensCentraal: aanvraagzaak jeugdhulp (processType_code aanvraag). ZaakOverzicht.processStartDate = start beslistermijn. Aanvraag via webformulier koppelt aan ExternalProcess of e-formulier.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processStartDate (startdatum formele aanvraag)\n• ZaakOverzicht.processType_code = aanvraagzaaktype\n• ZaakOverzicht.creationDate (systeemdatum aanmaak)\n\nALTERNATI",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "10-06-2026",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.creationDate"
      },
      {
        "type": "catalog",
        "label": "Term.startDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.startDate"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.processStartDate (startdatum formele aanvraag)\n• ZaakOverzicht.processType_code = aanvraagzaaktype\n• ZaakOverzicht.creationDate (systeemdatum aanmaak)\n\nALTERNATIEF – Zaaksysteem (via termijn):\n• Term.startDate (start beslistermijn = datum ontvangst aanvraag)\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.startDate (aangevraagde startdatum)\n• Niet direct = aanvraagdatum, maar koppeling via careRequest_id mogelijk"
  },
  {
    "id": "D-059",
    "term": "Aanvraag jeugdhulp (verwijzerroute / medische route)",
    "def": "Verwijzing door een huisarts, medisch specialist of jeugdarts naar jeugdhulp. De gemeente is financieel verantwoordelijk maar heeft geen rol in de toekenning van de zorg (geen beschikking). De aanbieder ontvangt de toewijzing direct via de verwijzer. Vastgelegd als JW315-bericht met referrerTypeCode = arts.",
    "ctx": "Pdc_CareRequestProduct.referrerTypeCode = huisarts/medisch specialist/jeugdarts. Geen ZaakOverzicht-aanmaak door gemeente vereist. Budgetverantwoordelijkheid gemeente blijft; registratie voor uitnutting en monitoring nodig.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.referrerType (type verwijzer)\n• Pdc_Orders.referrerCode\n• Pdc_Orders.referrerName\n• Geen ZaakOverzicht nodig (verwijzerroute = geen gemeentelijke beschikking)\n\nALTER",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerType"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerName"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerTypeCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerAGBCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.contract"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.referrerType (type verwijzer)\n• Pdc_Orders.referrerCode\n• Pdc_Orders.referrerName\n• Geen ZaakOverzicht nodig (verwijzerroute = geen gemeentelijke beschikking)\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.referrerTypeCode = arts/medisch specialist\n• Pdc_CareRequestProduct.referrerAGBCode\n• Pdc_CareRequestProduct.contract (landelijk raamcontract J/N)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct (geen disposalNr gemeente → verwijzerroute)"
  },
  {
    "id": "D-060",
    "term": "Beslistermijn jeugd",
    "def": "De wettelijke termijn van acht weken (56 kalenderdagen, art. 4:13 Awb) waarbinnen de gemeente een besluit moet nemen op een formele jeugdhulpaanvraag. De termijn start op de datum van ontvangst van de aanvraag (D-058) en eindigt bij het nemen van het jeugdwetbesluit of intrekking van de aanvraag. Administratieve toewijzing aan een hulpverlener doorbreekt de beslistermijn niet.",
    "ctx": "In MensCentraal: Term.startDate (= ZaakOverzicht.processStartDate), Term.experationDate (= + 56 dgn), Term.status. Bij overschrijding: ZaakOverzicht.urgent = 1 en signaal in sturing.",
    "fields": "PRIMAIR – Zaaksysteem (Term-tabel):\n• Term.startDate (start beslistermijn)\n• Term.experationDate (uiterste datum besluit)\n• Term.status = PENDING (nog lopend) of COMPLETED (op tijd)\n• Term.postponable",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Term.startDate"
      },
      {
        "type": "catalog",
        "label": "Term.experationDate"
      },
      {
        "type": "catalog",
        "label": "Term.status"
      },
      {
        "type": "catalog",
        "label": "Term.postponable"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.expectedEndDate"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.urgent"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem (Term-tabel):\n• Term.startDate (start beslistermijn)\n• Term.experationDate (uiterste datum besluit)\n• Term.status = PENDING (nog lopend) of COMPLETED (op tijd)\n• Term.postponable = 1 (verlengd, zie D-061)\n\nALTERNATIEF – Zaaksysteem (ZaakOverzicht):\n• ZaakOverzicht.processStartDate t/m processEndDate (doorlooptijd zaak als proxy)\n• ZaakOverzicht.expectedEndDate (verwachte besluitdatum)\n• ZaakOverzicht.urgent = 1 (signaal bij (dreigend) overschrijding)"
  },
  {
    "id": "D-061",
    "term": "Eenmalig verlengen beslistermijn",
    "def": "De gemeente kan de beslistermijn van 8 weken (D-060) eenmalig verlengen met een 'redelijke termijn' als duidelijk is dat het besluit niet op tijd genomen kan worden. Voorwaarden: (1) verlenging vóór verstrijken oorspronkelijke termijn, (2) schriftelijke kennisgeving aan de inwoner. In MensCentraal: Term.postponable = 1 en de verloopdatum wordt aangepast (Term.experationDate).",
    "ctx": "In MensCentraal: Term.postponable = 1 op de termijn-stap; Term.experationDate wordt handmatig verlengd. Relevant als maatregel bij wachtlijsten (D-062) om formele termijnoverschrijding te beperken.",
    "fields": "Term.postponable = 1, Term.experationDate (nieuwe datum), Term.startDate",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Term.postponable"
      },
      {
        "type": "catalog",
        "label": "Term.experationDate"
      },
      {
        "type": "catalog",
        "label": "Term.startDate"
      }
    ],
    "fieldsFull": "Term.postponable = 1, Term.experationDate (nieuwe datum), Term.startDate"
  },
  {
    "id": "D-062",
    "term": "Wachtlijst jeugd (gemeentelijke toegang)",
    "def": "Alle hulpvragen waarbij na hulpvraagverheldering door het aanmeldteam is vastgesteld dat specialistische jeugdhulp waarschijnlijk nodig is, maar het inhoudelijk Jeugdwetonderzoek nog niet is gestart vanwege beschikbare capaciteit. In MensCentraal: zaken met status ACTIVE in de zaakstap vóór het Jeugdwetonderzoek.",
    "ctx": "ZaakOverzicht.actieveZaakStap = stap 'verdeellijst' of equivalent. Telt als aanvragen op verdeellijst (D-065). Wettelijke norm: beslistermijn (D-060) loopt door — ook voor cliënten op de wachtlijst.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = verdeellijststap (naam zaakstap)\n• ZaakOverzicht.processStartDate (wachttijd = nu − processStartDate)\n\nALTERNATIEF – Zaaksyst",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Scope verfijnd: alleen gemeentelijke toegangswachtlijst. Aanbieder-wachtlijst is D-063.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Signaal.Signaal_code"
      },
      {
        "type": "catalog",
        "label": "Signaal.Timestamp"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = verdeellijststap (naam zaakstap)\n• ZaakOverzicht.processStartDate (wachttijd = nu − processStartDate)\n\nALTERNATIEF – Zaaksysteem (Signaal):\n• Signaal.Signaal_code (signaaltype wachtlijst/beslistermijn)\n• Signaal.Timestamp + Aanleidingsgebied\n\nALTERNATIEF – PDC (indirect):\n• Pdc_CareRequestProduct: aanvraag ingediend maar nog geen Pdc_Orders aangemaakt\n  (gap tussen 315-bericht ontvangst en orderaanmaak)"
  },
  {
    "id": "D-063",
    "term": "Wachtlijst bij zorgaanbieder",
    "def": "De periode nadat de gemeente jeugdhulp heeft toegewezen (toewijzingsdatum) maar de aanbieder nog niet met de zorgverlening is gestart (startDate levering). Wachttijd bij de aanbieder = startDate − allocationDate. Bij zorgaanbieders die het meest passend zijn maar een volle bezetting hebben.",
    "ctx": "Kwaliteitsindicator aanbodkant. In PDC: gap tussen Pdc_CareAllocationProduct.allocationDate en startDate. Overschrijding aanbestedings-norm (42 dagen) is signaal voor contract-gesprek. Zie ook D-016 (wachttijd).",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderDate (besteldatum = toewijzingsdatum) t/m deliveryDateStart (start levering)\n• Pdc_Orders.orderStatus = WAIT_FOR_DELIVERY (wacht op start levering)\n• Pdc_Suppli",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Verduidelijkt: aanbieder-wachtlijst = na toewijzing, voor start levering. Onderscheid D-062 nu helder.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderDate"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.orderStatus"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.party_name"
      },
      {
        "type": "catalog",
        "label": "Pdc_DeliveryPeriod.first"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.allocationDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.orderDate (besteldatum = toewijzingsdatum) t/m deliveryDateStart (start levering)\n• Pdc_Orders.orderStatus = WAIT_FOR_DELIVERY (wacht op start levering)\n• Pdc_Supplier.party_name + agbCode (welke aanbieder heeft lange wachttijd)\n\nALTERNATIEF – PDC DeliveryPeriod / CareMessages:\n• Pdc_DeliveryPeriod.first = 1 + startDate (datum ontvangst eerste startzorgbericht)\n  t/m Pdc_Orders.orderDate → feitelijke wachttijd bij aanbieder\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.allocationDate t/m startDate"
  },
  {
    "id": "D-064",
    "term": "Aanvragen in triage",
    "def": "Het totale aantal aanvragen waarbij de hulpvraagverheldering en triage door het aanmeldteam nog in uitvoering zijn. Triage bepaalt of specialistische jeugdhulp daadwerkelijk noodzakelijk is of dat lichtere voorzieningen volstaan. In MensCentraal: zaken in de triagestaap (actieve stap = triage/vraagverheldering).",
    "ctx": "ZaakOverzicht.status = ACTIVE, actieveZaakStap = triage/vraagverhelder-stap. Onderscheid van D-065 (verdeellijst: triage afgerond, specialistische jeugdhulp noodzakelijk maar nog niet gestart). Telmoment = peildatum.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = triagezaakstap\n• COUNT per periode/peildatum + ZaakOverzicht.processStartDate\n\nALTERNATIEF – Zaaksysteem (Term):\n• Term.statu",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Term.status"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = triagezaakstap\n• COUNT per periode/peildatum + ZaakOverzicht.processStartDate\n\nALTERNATIEF – Zaaksysteem (Term):\n• Term.status = PENDING op triagetermijn stap (lopende triage)\n\nALTERNATIEF – PDC (indirect):\n• Pdc_CareRequest: aanvragen ontvangen (VOT/315) die nog in behandeling zijn\n  (nog geen order aangemaakt of order in status PENDING)"
  },
  {
    "id": "D-065",
    "term": "Aanvragen op verdeellijst (wachtlijst jeugd)",
    "def": "Het totale aantal aanvragen waarbij triage is afgerond en specialistische jeugdhulp noodzakelijk is bevonden, maar het Jeugdwetonderzoek nog niet is gestart wegens capaciteitsgebrek. Deze verdeellijst = Wachtlijst Jeugd (D-062). In MensCentraal: zaken met actieve stap 'verdeellijst' of equivalent.",
    "ctx": "ZaakOverzicht.actieveZaakStap = verdeellijststap. De beslistermijn (D-060) loopt door voor alle zaken op de verdeellijst. Omvang verdeellijst is sturingsindicator voor capaciteitsbeslissingen toegangsteam.",
    "fields": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = verdeellijststap\n• ZaakOverzicht.processStartDate (wachttijd berekenen)\n\nALTERNATIEF – Zaaksysteem (Signaal):\n• Signaal.Aanle",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Samengevoegd met D-062 qua verwijzing. Verduidelijkt: D-065 = verdeellijst, D-062 = bredere wachtlijstdefinitie.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "ZaakOverzicht.status"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      },
      {
        "type": "catalog",
        "label": "Signaal.Aanleidingsgebied"
      },
      {
        "type": "catalog",
        "label": "Signaal.Klant_BSN"
      },
      {
        "type": "catalog",
        "label": "Term.status"
      }
    ],
    "fieldsFull": "PRIMAIR – Zaaksysteem:\n• ZaakOverzicht.status = ACTIVE + actieveZaakStap = verdeellijststap\n• ZaakOverzicht.processStartDate (wachttijd berekenen)\n\nALTERNATIEF – Zaaksysteem (Signaal):\n• Signaal.Aanleidingsgebied = 'Wachtlijst' of gerelateerde code\n• Signaal.Klant_BSN als telsleutel\n\nALTERNATIEF – Term:\n• Term.status = PENDING op beslistermijn-stap + processStartDate > 42 dgn geleden\n  (proxy voor cliënten die de termijn dreigen te overschrijden op de verdeellijst)"
  },
  {
    "id": "D-066",
    "term": "Segment B – Specialistische jeugdhulp (ambulant)",
    "def": "Ambulante specialistische jeugdhulp (segment B) betreft jeugdhulp zonder verblijf die verder gaat dan het voorveld. Onderverdeeld in laag complexe jeugdhulp (profielen 1-4, alleen begeleiding) en midden complexe jeugdhulp (profielen 5-8, altijd met behandelcomponent). Aangevuld met component vervoer en aanvullende producten (dagbesteding laag/midden/hoog, medicatiecontrole). Toewijzing via productcode + intensiteit = arrangement (D-071).",
    "ctx": "Regionaal ingekocht Westfriesland 2024-2025. Productcategorieën 41 (dagbesteding) en 45 (ambulant) in PDC. Declaratiewijze varieert: EFFORT_BASED (inspanning) of OUTPUT_BASED (traject). Functiemix afhankelijk van profiel.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 41 (dagbesteding) of 45 (ambulant)\n• Pdc_Orders.deliveryDateStart/End + orderStatus\n• Pdc_ProductType.community",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Gebaseerd op Zorglandschap Regio Westfriesland aug 2025.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.productCategory_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.communityProductCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_ContractAgreement.contract_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Contract.purchaseAgreement"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 41 (dagbesteding) of 45 (ambulant)\n• Pdc_Orders.deliveryDateStart/End + orderStatus\n• Pdc_ProductType.communityProductCode (profiel + intensiteit codering)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct: productCategoryCode = 41/45\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 41/45 (op declaratiebasis)\n\nALTERNATIEF – PDC ContractAgreement:\n• Pdc_ContractAgreement.contract_id → Pdc_Contract.purchaseAgreement = REGIONAL\n  (alleen regionale producten = segment B)"
  },
  {
    "id": "D-067",
    "term": "Segment C – Hoog specialistische jeugdhulp",
    "def": "Hoog specialistische jeugdhulp voor een kleine groep jeugdigen met meervoudige, urgente en/of zeldzame problematiek ('hoog complexe zorg'). Toewijzing is A-specifiek (D-083): alleen productcategorie + maximumbudget vastgelegd; aanbieder declareert per discipline. Twee percelen: (1) hoog specialistische jeugdhulp, (2) forensische jeugdhulp. Componenten: vervoer, medicatiecontrole, dagbesteding, dagbehandeling, ambulante crisishulp.",
    "ctx": "Productcategorie 50 (maatwerk) en 55 (landelijk). Vervoerscomponent niet stapelbaar op segment C beschikking. Specificity = ASPECIFIC in PDC. Onderscheid van segment B: segment C altijd A-specifiek, nooit outputgericht.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 50 of 55\n• Pdc_ProductType.specificity = ASPECIFIC (= A-specifieke toewijzing)\n• Pdc_Orders.maxCost (maximumbud",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Gebaseerd op Zorglandschap Regio Westfriesland aug 2025.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.productCategory_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.specificity"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.maxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Contract.purchaseAgreement"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 50 of 55\n• Pdc_ProductType.specificity = ASPECIFIC (= A-specifieke toewijzing)\n• Pdc_Orders.maxCost (maximumbudget)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct: productCategoryCode = 50 + productCode = null (A-specifiek)\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 50/55 per discipline gedeclareerd\n\nALTERNATIEF – PDC Contract:\n• Pdc_Contract.purchaseAgreement = NATIONWIDE (landelijk ingekochte componenten)"
  },
  {
    "id": "D-068",
    "term": "Segment V – Jeugdhulp met verblijf",
    "def": "Jeugdhulp waarbij de jeugdige overnacht buiten het eigen gezin. Vijf subcategorieën: (1) kortdurend verblijf (logeren regulier/intensief, crisisverblijf GGZ/pedagogisch); (2) verblijf met behandeling (Jeugd-GGZ kliniek, behandelgroep); (3) verblijf zonder behandeling (woon-/leefgroep, begeleid wonen); (4) gezinshuizen laag/midden/hoog; (5) pleegzorg voltijd/deeltijd. Dagbehandeling valt onder jeugdhulp zónder verblijf (D-027).",
    "ctx": "Productcategorieën 43 (verblijf excl. dagbesteding), 44 (verblijf incl. pleegzorg/gezinshuis), 46 (crisis). Stuurt op monitor uithuisplaatsingen. CBS-term: 'jeugdhulp met verblijf' in GMSD.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 43, 44 of 46\n• Pdc_Orders.deliveryDateStart/End (verblijfsperiode)\n• Pdc_Supplier.agbCode (welke instelling)\n\nA",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Gebaseerd op Zorglandschap Regio Westfriesland aug 2025.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.productCategory_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processStartDate"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType.productCategory_id = 43, 44 of 46\n• Pdc_Orders.deliveryDateStart/End (verblijfsperiode)\n• Pdc_Supplier.agbCode (welke instelling)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 43/44/46\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 43/44/46 per dag gedeclareerd\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processType_code = verblijfszaaktype\n• ZaakOverzicht.processStartDate (start verblijf als proxy)"
  },
  {
    "id": "D-069",
    "term": "Ondersteuningsprofiel (jeugdhulp segment B)",
    "def": "Een ondersteuningsprofiel beschrijft de aard en complexiteit van de hulpvraag en bepaalt welk type ambulante specialistische jeugdhulp (segment B) wordt ingezet. Acht profielen: 1-4 = laag complex (begeleiding, MBO-functiemix); 5-8 = midden complex (behandeling + begeleiding, hogere functiemix). Profiel bepaalt de toegestane intensiteitscombinaties (D-070) en de functiemix van uitvoerend personeel.",
    "ctx": "Grondslag voor beschikking en toewijzing. Combinatie profiel + intensiteit = arrangement (D-071) = productcode. In PDC vastgelegd in communityProductCode-systematiek. Zie D-072 (laag complex) en D-073 (midden complex) voor specificaties.",
    "fields": "Profielnummer (1-8), intensiteit (D-070), productCode, functiemix, toegestane combinaties",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Profielen 1-4 = laag complex; 5-8 = midden complex. Zie D-072/D-073.",
    "fieldsFull": "Profielnummer (1-8), intensiteit (D-070), productCode, functiemix, toegestane combinaties"
  },
  {
    "id": "D-070",
    "term": "Intensiteit (jeugdhulp arrangement)",
    "def": "De intensiteit geeft de zwaarte en duur van een jeugdhulptraject aan. Vier niveaus: (1) Perspectief – kortdurend herstelgericht, 3-6 maanden; (2) Intensief – middellange termijn herstelgericht, max. 12 maanden; (3) Duurzaam-licht – langdurige stabiele ondersteuning, min. 12 maanden; (4) Duurzaam-zwaar – langdurige zware ondersteuning, min. 12 maanden. Perspectief en intensief zijn herstelgericht; duurzaam-licht en duurzaam-zwaar zijn stabiliserend.",
    "ctx": "Gecombineerd met profiel (D-069) vormt intensiteit het arrangement (D-071). Niet alle profielen zijn combineerbaar met alle intensiteiten (bijv. profiel 1-3 alleen Perspectief/Intensief). Beschikkingsduur en herindicatiemoment (D-048) zijn direct afhankelijk van intensiteit.",
    "fields": "Intensiteitscode, trajectduur (min/max), herstel- of stabilisatiegericht, beschikkingsduur",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Duurzame intensiteiten kunnen meerjarig worden afgegeven (maatwerk). Profiel 1-3: alleen P/I.",
    "fieldsFull": "Intensiteitscode, trajectduur (min/max), herstel- of stabilisatiegericht, beschikkingsduur"
  },
  {
    "id": "D-071",
    "term": "Arrangement (jeugdhulp)",
    "def": "Een arrangement is de combinatie van een ondersteuningsprofiel (D-069, 1-8) met een intensiteit (D-070: perspectief/intensief/duurzaam-licht/duurzaam-zwaar) binnen specialistische jeugdhulp segment B. Het arrangement resulteert in een unieke productcode (D-020) die de grondslag is voor beschikking en declaratie. Aanvullende producten (dagbesteding, vervoer) worden naast het arrangement getoegewezen.",
    "ctx": "In PDC: Pdc_ProductType.communityProductCode combineert profiel en intensiteit. Eén arrangement per beschikking; de Pdc_CareAllocationProduct.disposalNr koppelt beschikking aan toewijzing.",
    "fields": "DF-061 productCode (profiel + intensiteit), Pdc_CareAllocationProduct.disposalNr, startDate, endDate, agbCode",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.disposalNr"
      }
    ],
    "fieldsFull": "DF-061 productCode (profiel + intensiteit), Pdc_CareAllocationProduct.disposalNr, startDate, endDate, agbCode"
  },
  {
    "id": "D-072",
    "term": "Laag complexe jeugdhulp (profielen 1-4)",
    "def": "Laag complexe jeugdhulp betreft beginnende problematiek met nadruk op begeleiding (geen behandeling). Vier profielen: P1 psychosociale problemen jeugdige (¾ u/week); P2 opvoedvaardigheden ouders bij gedragsproblemen kind (1 u/week); P3 opvoedondersteuning bij ouders met eigen problematiek (1x/week); P4 begeleiding jeugdige met (verstandelijke) beperking (1x/week). Functiemix: MBO (eventueel onder supervisie HBO).",
    "ctx": "Combineerbaar met intensiteiten Perspectief en Intensief (profiel 1-3) of alle vier intensiteiten (profiel 4). Westfriese gemeenten streven naar verschuiving laag complex naar segment A (voorveld) tijdens contractduur.",
    "fields": "Profielnummer (1-4), contactfrequentie/week, functiemix MBO/HBO, intensiteiten Perspectief/Intensief/(Duurzaam voor P4)",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Zie D-069 en D-070. Geen behandelcomponent.",
    "fieldsFull": "Profielnummer (1-4), contactfrequentie/week, functiemix MBO/HBO, intensiteiten Perspectief/Intensief/(Duurzaam voor P4)"
  },
  {
    "id": "D-073",
    "term": "Midden complexe jeugdhulp (profielen 5-8)",
    "def": "Midden complexe jeugdhulp kenmerkt zich door toenemend risico op stagnerende ontwikkeling op meerdere leefgebieden; altijd met behandelcomponent naast begeleiding. P5: behandeling + begeleiding verstandelijke beperking; P6: idem lichamelijke beperking; P7: vermindering ontwikkelings-/gedragsproblemen via behandeling (kind-eigen factoren, gem. 2 u/week); P8: meervoudige gezinsproblematiek, multidisciplinair, min. 3x/week. Functiemix: MBO t/m WO+.",
    "ctx": "Profiel 8 vereist multidisciplinaire aanpak (MDA++) en zorgcoördinatie. Aanbieders zijn verplicht alle leefgebiedsproblemen te melden bij Lokale Toegang. Combineerbaar met alle vier intensiteiten.",
    "fields": "Profielnummer (5-8), behandelcomponent (J), contactfrequentie/week, functiemix MBO-WO+, veiligheidsrisico",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Profiel 8: MDA++ en Top-3 methodiek. Zie D-069/D-070.",
    "fieldsFull": "Profielnummer (5-8), behandelcomponent (J), contactfrequentie/week, functiemix MBO-WO+, veiligheidsrisico"
  },
  {
    "id": "D-074",
    "term": "Dagbesteding (jeugdhulp)",
    "def": "Aanvullend product dat los staat van het arrangement. Drie intensiteiten: Laag (zinvolle dagbesteding lichte begeleiding, max. 8 jgd/groep; alleen segment B); Midden (begeleiding in groepsverband, niet volledig onderwijs, max. 6 jgd/groep); Hoog (intensieve doelgerichte begeleiding, behandelend karakter, max. 4 jgd/groep). Binnen segment C zijn alleen midden en hoog beschikbaar.",
    "ctx": "Productcodes: 41DBL/M/H (segment B), 41CDM/H of 41CDH (segment C). Aparte productcodes per segment (geldt vanaf 2025). Kan gestapeld worden op arrangement of crisiscomponent. Vervoer aanvullend toewijsbaar.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 41 (dagbesteding)\n• Pdc_ProductType.communityProductCode (41DBL/M/H of 41CDM/H)\n• Pdc_Orders.deliveryDateStart/End + unit/frequency/volume",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Dagbesteding laag niet beschikbaar in segment C.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.communityProductCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 41 (dagbesteding)\n• Pdc_ProductType.communityProductCode (41DBL/M/H of 41CDM/H)\n• Pdc_Orders.deliveryDateStart/End + unit/frequency/volume\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 41\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCode = 41* (per dagdeel gedeclareerd)\n\nALTERNATIEF – PDC ContractAgreement:\n• Pdc_ContractAgreement: unit = 'dagdeel' + productType = dagbesteding"
  },
  {
    "id": "D-075",
    "term": "Ambulante crisishulp",
    "def": "Component binnen segment C voor acute crises ter voorkoming van uithuisplaatsing of psychiatrische opname. Twee varianten: Pedagogisch (max. 28 dagen, start binnen 24 uur, bij gedrags-/opvoedkundige crisis; 46CVP/46C10) en GGZ (max. 42 dagen, start binnen 24 uur, bij psychische/psychiatrische crisis; 46CVG/46C11). Gelijktijdige inzet met crisisverblijf is mogelijk; dezelfde crisiswerker blijft betrokken.",
    "ctx": "Productcategorie 46. Kan standalone of naast segment C toewijzing ingezet worden. Na crisisperiode wordt reguliere (hoog)specialistische jeugdhulp aangevraagd. Zie ook D-068 (crisisverblijf als verblijfsvorm segment V).",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 46 (Jeugdhulp Crisis)\n• Pdc_ProductType.communityProductCode = 46C10/C11/CVP/CVG\n• Pdc_Orders.deliveryDateStart/End (max. 28/42 dgn)\n\nALTE",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.communityProductCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareMessage.type"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.urgent"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 46 (Jeugdhulp Crisis)\n• Pdc_ProductType.communityProductCode = 46C10/C11/CVP/CVG\n• Pdc_Orders.deliveryDateStart/End (max. 28/42 dgn)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 46\n\nALTERNATIEF – PDC CareMessage:\n• Pdc_CareMessage.type = 'stop care message' + reasonCode (beëindiging crisis)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processType_code = crisiszaaktype\n• ZaakOverzicht.urgent = 1 (urgent-markering)"
  },
  {
    "id": "D-076",
    "term": "Pleegzorg",
    "def": "Formele pleegzorg: een gezinsvervangende of gezinsondersteunende verblijfsvorm waarbij een jeugdige door gecertificeerde pleegouders tijdelijk of structureel wordt opgevoed en verzorgd. Twee vormen: voltijdpleegzorg (7 etmalen/week; 44VP1) en deeltijdpleegzorg (max. 6 etmalen/week; 44DP1). Crisisplaatsing in crisispleeggezin valt onder voltijd (max. 4 weken). Pleegzorgaanbieder begeleidt jeugdige, ouders en pleeggezin.",
    "ctx": "Productcategorie 44. Informele pleegzorg (zonder aanbieder) vereist geen beschikking. Meest gezinsgerichte verblijfsvorm; voorkeur boven groepsplaatsingen conform transformatiedoelstelling.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType = 44VP1 (voltijd) of 44DP1 (deeltijd)\n• Pdc_Orders.deliveryDateStart/End (pleegzorgperiode)\n• Pdc_Supplier.agbCode (pleegzorgaanbied",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType = 44VP1 (voltijd) of 44DP1 (deeltijd)\n• Pdc_Orders.deliveryDateStart/End (pleegzorgperiode)\n• Pdc_Supplier.agbCode (pleegzorgaanbieder)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCode = 44VP1/44DP1\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCode = 44VP1/44DP1 per dag/etmaal"
  },
  {
    "id": "D-077",
    "term": "Gezinshuis",
    "def": "Professioneel gezin (één of twee gezinshuisouders) dat 24/7 maximaal vier tot zes jeugdigen opvangt en opvoedt in een thuisomgeving. Drie niveaus: Laag (lichte problematiek, max. 6 gezinshuiskinderen; 44GHL), Midden (gedrags-/ontwikkelingsproblemen, bijzondere opvoedvaardigheden nodig, max. 5; 44GHM), Hoog (complexe problematiek, hoge risico's, lage responsiviteit, max. 4; 44GHH). Functiemix 100% HBO.",
    "ctx": "Productcategorie 44. Valt onder D-054 (gezinsgericht verblijf). Maximale bezetting incl. eigen kinderen gezinshuisouder: 8 totaal. Eigen kinderen >18 jaar tellen niet mee. Afwijking max. groepsgrootte: 'pas toe of leg uit' bij opdrachtgever.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType = 44GHL/GHM/GHH\n• Pdc_Orders.deliveryDateStart/End + Pdc_Supplier.agbCode\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAlloca",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.deliveryDateStart"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → Pdc_ProductType = 44GHL/GHM/GHH\n• Pdc_Orders.deliveryDateStart/End + Pdc_Supplier.agbCode\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCode = 44GHL/GHM/GHH\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCode = 44GHL/GHM/GHH per dag gedeclareerd"
  },
  {
    "id": "D-078",
    "term": "Productcategorie (sociaal domein)",
    "def": "Een groepering van verwante producten in de PDC voor declaratie en sturing. Hoofdcategorieën jeugd: 41 Dagbesteding, 43 Verblijf excl. dagbesteding, 44 Jeugdhulp verblijf (incl. pleegzorg/gezinshuis), 45 Ambulant, 46 Crisis, 47 Jeugdreclassering, 48 Jeugdbescherming, 50 Maatwerkarrangementen, 55 Landelijk ingekochte zorg. WMO: 1 HbH, 2 Begeleiding, 4 Kortdurend verblijf, 7 Dagbesteding, 8 Vervoer, 11-14 Hulpmiddelen, 15 Beschermd wonen.",
    "ctx": "In PDC: Pdc_ProductCategory.id/name/code/productMainCategory. Categorie bepaalt declaratiewijze (EFFORT/OUTPUT_BASED) en van toepassing zijnde wet (WMO/IJZ). CBS-hoofdcategorieën voor GMSD-aanlevering koppelen aan productMainCategory.",
    "fields": "Pdc_ProductCategory.id, name, code, productMainCategory, parentProductCategory_id",
    "cat": "Beslistermijn",
    "team": "Contractbeheer & Inkoop",
    "status": "Data velden zoeken",
    "date": "—",
    "notes": "Conform productenlijst Medemblik 2025-2026.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_ProductCategory.id"
      }
    ],
    "fieldsFull": "Pdc_ProductCategory.id, name, code, productMainCategory, parentProductCategory_id"
  },
  {
    "id": "D-079",
    "term": "Jeugdbescherming",
    "def": "Gedwongen maatregelen opgelegd door de rechter ter bescherming van minderjarigen: Ondertoezichtstelling (OTS; 48XOT/48B00/B01), Voogdij (48XVD/48B02), Intensief Gezinsgericht Casemanagement (48J00). Uitgevoerd door gecertificeerde instellingen (GI). Gemeente heeft geen rol in toekenning; de GI bepaalt de zorgnoodzaak. Gemeente financiert zonder beschikking te verlenen.",
    "ctx": "Productcategorie 48. GI-verwijzing via JW315 (referrerTypeCode = GI). Relevant voor veiligheidsmonitor en OTS-doorlooptijden. Geen ZaakOverzicht aanmaakverplichting gemeente; registratie loopt via GI-berichten.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 48 (Jeugdbescherming)\n• Pdc_Orders.referrerType (GI als verwijzer)\n• Pdc_Supplier.agbCode (GI als uitvoerder)\n\nALTERNATIEF – PDC CareReque",
    "cat": "In/Uitstroom",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Geen beschikking gemeente. Zie D-010 (Verwijzer GI).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.referrerType"
      },
      {
        "type": "catalog",
        "label": "Pdc_Supplier.agbCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.referrerTypeCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      },
      {
        "type": "catalog",
        "label": "BelanghebbendenOrganisatie.stakeHolderRole"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 48 (Jeugdbescherming)\n• Pdc_Orders.referrerType (GI als verwijzer)\n• Pdc_Supplier.agbCode (GI als uitvoerder)\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.referrerTypeCode = GI\n• Pdc_CareRequestProduct.productCategoryCode = 48\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processType_code = OTS/Voogdijzaaktype\n• BelanghebbendenOrganisatie.stakeHolderRole = GI"
  },
  {
    "id": "D-080",
    "term": "Landelijk ingekochte zorg (jeugd)",
    "def": "Hoog specialistische jeugdhulp die vanwege zeldzaamheid of specialisatiegraad landelijk via VNG/bovenregionale structuur is gecontracteerd. Omvat: JeugdzorgPlus (55A15/55A16/55A20, gesloten), specialistische GGZ-verblijf (55006-55014, verzorgingsgraden A-H), MST (55031), MBT Early (55032), DOEB (55017-55019), eetstoornisbehandeling (54BD1/54DD1/54H01/54H02), Med-Psy Unit en diverse klinische functies.",
    "ctx": "Productcategorie 55. Declaratie via iJw. Gemeente heeft beperkte sturing op volume maar volle financiële verantwoordelijkheid. Hoog kostenprofiel; relevant voor monitor kostenstijging en alternatieve plaatsingen.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 55 (landelijk ingekochte zorg)\n• Pdc_Contract.purchaseAgreement = NATIONWIDE\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocatio",
    "cat": "In/Uitstroom",
    "team": "Contractbeheer & Inkoop",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Inclusief JeugdzorgPlus en GGZ-verblijf A-H.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Contract.purchaseAgreement"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 55 (landelijk ingekochte zorg)\n• Pdc_Contract.purchaseAgreement = NATIONWIDE\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 55\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 55 (landelijk declaratiepatroon)\n\nALTERNATIEF – PDC ContractAgreement:\n• Pdc_ContractAgreement: contract_id → Pdc_Contract.purchaseAgreement = NATIONWIDE"
  },
  {
    "id": "D-081",
    "term": "Hulp bij het huishouden (WMO)",
    "def": "Maatwerkvoorziening Wmo 2015 waarbij een professional de cliënt ondersteunt bij huishoudelijke taken (schoonmaken, wassen, enz.). Wordt in uren per week verleend (EFFORT_BASED). De Huishoudelijke Hulp Toelage (HHT; code 01HHT) is een tegemoetkoming voor zelf geregelde hulp. Eigen bijdrage loopt via het CAK.",
    "ctx": "Productcategorie 1 (HbH). Meest voorkomende WMO-maatwerkvoorziening qua cliëntvolume. CBS-GMSD-categorie 'hulp bij het huishouden'. Eigen bijdrage via CAK: Pdc_ProductType.clientContribution = 1.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 1 (HbH)\n• Pdc_Orders.unit/frequency/volume (uren per week)\n• Pdc_Orders.applyClientContribution (eigen bijdrage)\n\nALTERNATIEF – PDC CareAl",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "CBS-categorie: hulp bij het huishouden (GMSD).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.unit"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.applyClientContribution"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders_ClientContribution.clientContribution_id"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 1 (HbH)\n• Pdc_Orders.unit/frequency/volume (uren per week)\n• Pdc_Orders.applyClientContribution (eigen bijdrage)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 01/1\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 1 (declaraties HbH per uur)\n\nALTERNATIEF – PDC ClientContribution:\n• Pdc_Orders_ClientContribution.clientContribution_id (eigen bijdrage CAK)"
  },
  {
    "id": "D-082",
    "term": "Beschermd wonen (WMO)",
    "def": "Maatwerkvoorziening voor volwassenen met psychische of psychiatrische problematiek die niet zonder 24-uursbegeleiding zelfstandig kunnen wonen. Twee vormen: Beschermd Wonen (BW, op locatie; intensiteiten E t/m H: 15Z7E-H) en Beschermd Thuis (BT, ambulant begeleid; intensiteit D: 15D6D). Inkoop en financiering via centrumgemeente Hoorn.",
    "ctx": "Productcategorie 15. Gemeente Medemblik draagt bij via verdeelsleutel; centrumgemeente Hoorn voert inkoop uit. Relevantie: doordecentralisatie loopt. Monitor dakloosheid en kwetsbare inwoners.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 15 (Beschermd Wonen)\n• Pdc_ProductType.communityProductCode = 15Z7E-H / 15D6D\n• Pdc_Orders.community_party_name = Hoorn (centrumgemeente)\n",
    "cat": "Toegang",
    "team": "WMO & Backoffice",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Centrumgemeente Hoorn. Doordecentralisatie in voorbereiding.",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_ProductType.communityProductCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.community_party_name"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Declaration.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_Contract.community_id"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_Orders.productType_id → categorie 15 (Beschermd Wonen)\n• Pdc_ProductType.communityProductCode = 15Z7E-H / 15D6D\n• Pdc_Orders.community_party_name = Hoorn (centrumgemeente)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode = 15\n\nALTERNATIEF – PDC Declaration:\n• Pdc_Declaration.productCategoryCode = 15 (facturen BW/BT)\n\nALTERNATIEF – PDC Contract:\n• Pdc_Contract.community_id = Hoorn (centrumgemeente als contractpartij)"
  },
  {
    "id": "D-083",
    "term": "A-specifieke toewijzing",
    "def": "Een toewijzing waarbij de productcategorie is vastgelegd maar de productcode leeg is, en waarbij een maximumbudget is gekoppeld. De aanbieder mag binnen de categorie alle gecontracteerde producten leveren en declareert de feitelijk geleverde inzet per discipline. Standaardmethode voor segment C (D-067). Onderscheid: specifiek = productcode gevuld; A-specifiek = categorie gevuld, code leeg, budget gevuld; generiek (D-024) = beide leeg.",
    "ctx": "In PDC: Pdc_ProductType.specificity = ASPECIFIC. Maximumbudget is verplicht gevuld bij A-specifiek. Deactiveer stapelcheck (deactivateStackingCheck) is van toepassing. Controle op declaraties binnen maximumbudget essentieel.",
    "fields": "PRIMAIR – PDC Orders:\n• Pdc_ProductType.specificity = ASPECIFIC\n• Pdc_Orders.productType_id → productCategoryCode gevuld, productCode = null\n• Pdc_Orders.maxCost (maximumbudget verplicht)\n\nALTERNATIEF",
    "cat": "Toegang",
    "team": "Jeugd",
    "status": "Definitie en context controleren",
    "date": "—",
    "notes": "Zie D-024 (generiek) en D-036 (toewijzing).",
    "fieldChips": [
      {
        "type": "catalog",
        "label": "Pdc_ProductType.specificity"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.productType_id"
      },
      {
        "type": "catalog",
        "label": "Pdc_Orders.maxCost"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareAllocationProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "Pdc_CareRequestProduct.productCategoryCode"
      },
      {
        "type": "catalog",
        "label": "ZaakOverzicht.processType_code"
      }
    ],
    "fieldsFull": "PRIMAIR – PDC Orders:\n• Pdc_ProductType.specificity = ASPECIFIC\n• Pdc_Orders.productType_id → productCategoryCode gevuld, productCode = null\n• Pdc_Orders.maxCost (maximumbudget verplicht)\n\nALTERNATIEF – PDC CareAllocationProduct:\n• Pdc_CareAllocationProduct.productCategoryCode gevuld + productCode leeg\n\nALTERNATIEF – PDC CareRequestProduct:\n• Pdc_CareRequestProduct.productCategoryCode gevuld + productCode leeg (in 315-bericht)\n\nALTERNATIEF – Zaaksysteem:\n• ZaakOverzicht.processType_code = segment C zaaktype (proxy voor A-specifiek)"
  }
];

// State
let entries = [];
let currentId = null;
let editingId = null;
let isNew = false;

function loadData() {
  entries = JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData() { /* no-op: data lives in HTML */ }

function nextId() {
  const nums = entries.map(e => parseInt(e.id.replace('D-',''))).filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return 'D-' + String(max + 1).padStart(3,'0');
}

function statusBadge(s) {
  const map = {
    'Vastgesteld': 'bdg-vastgesteld',
    'Definitie en context controleren': 'bdg-review',
    'Data velden zoeken': 'bdg-concept',
    'Vervallen': 'bdg-vervallen',
    'Concept': 'bdg-concept',
    'In review': 'bdg-review',
    'Definitie en context zoeken': 'bdg-concept',
  };
  const cls = map[s] || 'bdg-leeg';
  return `<span class="bdg ${cls}">${s || '—'}</span>`;
}

// catPill is defined dynamically in categorie module below

function emptySpan(txt) {
  return `<span class="detail-empty-field">${txt}</span>`;
}

function highlight(text, q) {
  if (!q || !text) return text || '';
  const safe = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(safe.replace(safe, q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'gi'),
    m => `<mark class="hl">${m}</mark>`);
}

// ── Volledigheidscore ─────────────────────────────────────────────
function completenessScore(e) {
  const fields = [e.term, e.def, e.cat, e.team, e.status !== 'Concept' ? e.status : '', e.fields || (e.fieldChips && e.fieldChips.length ? 'x' : '')];
  const filled = fields.filter(f => f && f.trim() && f.trim() !== '—').length;
  return Math.round((filled / fields.length) * 100);
}

function scoreHtml(pct) {
  const color = pct >= 80 ? '#1D9E75' : pct >= 50 ? '#EF9F27' : '#E24B4A';
  return `<div class="score-bar-wrap"><div class="score-bar"><div class="score-bar-fill" style="width:${pct}%;background:${color};"></div></div><span class="score-pct" style="color:${color};">${pct}%</span></div>`;
}

// ── Gebruikt in (relaties begrip → processen & datavelden) ────────
function getUsedInRelations(termId) {
  const result = { procs: [], dvs: [] };
  // Processen
  processes.forEach(p => {
    (p.nodes || []).forEach(n => {
      if ((n.defs || []).some(d => d.startsWith(termId + ' ') || d === termId)) {
        if (!result.procs.find(x => x.id === p.id)) result.procs.push({ id: p.id, name: p.name });
      }
    });
  });
  // Datavelden via fieldChips
  const entry = entries.find(e => e.id === termId);
  if (entry && entry.fieldChips) {
    entry.fieldChips.forEach(chip => {
      if (chip.type === 'catalog' && chip.id) {
        const dv = dvEntries.find(d => d.id === chip.id);
        if (dv) result.dvs.push({ id: dv.id, name: dv.name });
      }
    });
  }
  return result;
}

function renderUsedIn(termId) {
  const rel = getUsedInRelations(termId);
  const wrap = document.getElementById('dUsedInContent');
  if (!wrap) return;
  let html = '';
  rel.procs.forEach(p => {
    html += `<span class="used-in-chip used-in-proc" onclick="switchMainTab('processen');setTimeout(()=>openProcess('${p.id}'),50);" title="Open proces">⬡ ${escHtml(p.name)}</span>`;
  });
  rel.dvs.forEach(d => {
    html += `<span class="used-in-chip used-in-dv" onclick="switchMainTab('datavelden');setTimeout(()=>selectDvEntry('${d.id}'),50);" title="Open dataveld">▦ ${escHtml(d.name)}</span>`;
  });
  if (!html) html = '<span class="used-in-empty">Nog niet gekoppeld aan een proces of dataveld</span>';
  wrap.innerHTML = html;
}

// ── Header tellers ────────────────────────────────────────────────
function updateHeaderCounts() {
  const b = document.getElementById('hdrCountBegrippen');
  const p = document.getElementById('hdrCountProcessen');
  const v = document.getElementById('hdrCountVelden');
  if (b) b.textContent = entries.length + ' begrippen';
  if (p) p.textContent = processes.length + ' processen';
  if (v) v.textContent = dvEntries.length + ' velden';
}


// ── Node extra velden (omschrijving, rol, doorlooptijd, datavelden) ─
function updateSelectedNodeExtra() {
  const p = currentProc(); if (!p || !selectedNodeId) return;
  const n = p.nodes.find(x => x.id === selectedNodeId); if (!n) return;
  n.desc     = document.getElementById('nd-desc').value;
  n.role     = document.getElementById('nd-role').value;
  n.duration = document.getElementById('nd-duration').value;
  saveProcesses();
}

function showNodeDetailExtended(n) {
  if (!n) return;
  document.getElementById('nd-desc').value     = n.desc     || '';
  document.getElementById('nd-role').value     = n.role     || '';
  document.getElementById('nd-duration').value = n.duration || '';
  renderLinkedDvFields(n);
}

function renderLinkedDvFields(n) {
  const div = document.getElementById('nd-dvfields');
  if (!div) return;
  div.innerHTML = (n.dvfields || []).map(d =>
    `<span class="linked-def-chip" style="background:#EDE9FC;color:#534AB7;">▦ ${escHtml(d)} <button onclick="unlinkDvField('${n.id}','${escHtml(d).replace(/'/g,"\\'")}')">×</button></span>`
  ).join('');
}

function filterDvPickerNode(q) {
  const resultsEl = document.getElementById('nd-dv-results');
  if (!resultsEl) return;
  const term = q.trim().toLowerCase();
  resultsEl.style.display = 'block';
  const p = currentProc();
  const n = p && selectedNodeId ? p.nodes.find(x => x.id === selectedNodeId) : null;
  const linked = n ? (n.dvfields || []) : [];
  const filtered = dvEntries.filter(e => !term || (e.id + ' ' + e.name).toLowerCase().includes(term)).slice(0, 15);
  if (!term && filtered.length === 0) { resultsEl.style.display = 'none'; return; }
  resultsEl.innerHTML = filtered.map(e => {
    const label = e.id + ' ' + e.name;
    const already = linked.includes(label);
    return `<div class="def-result-item${already ? '" style="opacity:.45;pointer-events:none;' : '"'} onclick="linkDvField('${escHtml(label).replace(/'/g,"\\'")}');document.getElementById('nd-dv-search').value='';document.getElementById('nd-dv-results').style.display='none';">
      <span class="def-id">${e.id}</span>${escHtml(e.name)}${already ? ' ✓' : ''}
    </div>`;
  }).join('') || '<div class="def-result-empty">Geen datavelden gevonden</div>';
}

function linkDvField(val) {
  if (!val || !selectedNodeId) return;
  const p = currentProc(); if (!p) return;
  const n = p.nodes.find(x => x.id === selectedNodeId); if (!n) return;
  if (!n.dvfields) n.dvfields = [];
  if (!n.dvfields.includes(val)) n.dvfields.push(val);
  saveProcesses();
  renderLinkedDvFields(n);
}

function unlinkDvField(nodeId, val) {
  const p = currentProc(); if (!p) return;
  const n = p.nodes.find(x => x.id === nodeId); if (!n) return;
  n.dvfields = (n.dvfields || []).filter(d => d !== val);
  saveProcesses();
  renderLinkedDvFields(n);
}

document.addEventListener('click', function(e) {
  const wr = document.getElementById('nd-dv-results');
  const inp = document.getElementById('nd-dv-search');
  if (wr && inp && !wr.contains(e.target) && e.target !== inp) wr.style.display = 'none';
});


function renderTable(filter) {
  const tbody = document.getElementById('tableBody');
  const noRes = document.getElementById('noResults');
  const q = (document.getElementById('searchInput').value || '').toLowerCase().trim();
  const cat = document.getElementById('filterCat').value;
  const status = document.getElementById('filterStatus').value;
  const team = document.getElementById('filterTeam').value;

  const filtered = entries.filter(e => {
    if (cat && e.cat !== cat) return false;
    if (status && e.status !== status) return false;
    if (team && e.team !== team) return false;
    if (q) {
      const hay = [e.id,e.term,e.def,e.ctx,e.fields,e.notes].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  document.getElementById('countLabel').textContent = filtered.length + ' begrippen';
  document.getElementById('ftrCount').textContent = entries.length + ' begrippen totaal';
  if (typeof updateHeaderCounts === 'function') updateHeaderCounts();

  if (!filtered.length) {
    tbody.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';

  tbody.innerHTML = filtered.map(e => {
    const hl = txt => q ? txt.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'), m=>`<mark class="hl">${m}</mark>`) : txt;
    const termHl = hl(e.term || '');
    const defHl  = e.def ? hl(e.def) : '';
    const pct = completenessScore ? completenessScore(e) : null;
    return `
    <tr data-id="${e.id}" onclick="selectEntry('${e.id}')" class="${e.id === currentId ? 'selected' : ''}">
      <td class="id-cell">${e.id}</td>
      <td>
        <div class="term-cell">${termHl || '<em style="color:var(--bd)">—</em>'}</div>
        ${defHl ? `<div class="def-preview">${defHl}</div>` : ''}
      </td>
      <td class="cat-cell">${catPill(e.cat)}</td>
      <td style="font-size:.63rem;color:var(--sub);white-space:nowrap;max-width:100px;overflow:hidden;text-overflow:ellipsis;">${e.team || '—'}</td>
      <td>${statusBadge(e.status)}</td>
      <td class="score-td">${pct !== null ? scoreHtml(pct) : ''}</td>
    </tr>`;
  }).join('');
}

function filterTable() { renderTable(); }

function selectEntry(id) {
  currentId = id;
  const e = entries.find(x => x.id === id);
  if (!e) return;

  document.getElementById('detailEmpty').style.display = 'none';
  const dc = document.getElementById('detailContent');
  dc.style.display = 'flex';
  dc.style.flexDirection = 'column';
  dc.style.minHeight = '0';
  dc.style.flex = '1';

  closeEdit();

  document.getElementById('dId').textContent = e.id;
  document.getElementById('dTerm').textContent = e.term || '—';
  document.getElementById('dCatBadge').innerHTML = catPill(e.cat);
  document.getElementById('dStatusBadge').innerHTML = statusBadge(e.status);
  document.getElementById('dDef').innerHTML = e.def ? e.def.replace(/\n/g,'<br>') : emptySpan('Nog geen definitie ingevuld');
  document.getElementById('dCtx').innerHTML = e.ctx ? e.ctx.replace(/\n/g,'<br>') : emptySpan('Nog geen business context ingevuld');
  document.getElementById('dNotes').innerHTML = e.notes ? e.notes : emptySpan('—');
  document.getElementById('dTeam').textContent = e.team || '—';
  document.getElementById('dDate').textContent = e.date || '—';
  document.getElementById('dCat').textContent = e.cat || '—';
  document.getElementById('dStatus').textContent = e.status || '—';

  // Source URL
  const srcWrap = document.getElementById('dSourceWrap');
  const srcSec  = document.getElementById('dSourceSection');
  if (e.source) {
    srcSec.style.display = '';
    let label = e.source;
    try { label = new URL(e.source).hostname; } catch(_) {}
    srcWrap.innerHTML = `<a class="detail-url-link" href="${e.source}" target="_blank" rel="noopener">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      ${label}
    </a>`;
  } else {
    srcSec.style.display = 'none';
  }

  // Datavelden
  const fw = document.getElementById('dFields');
  if (e.fieldChips && e.fieldChips.length) {
    fw.innerHTML = e.fieldChips.map(c =>
      c.type === 'catalog'
        ? `<span class="df-chip catalog" style="cursor:pointer;" onclick="switchMainTab('datavelden');setTimeout(()=>selectDvEntry('${c.id}'),100)">${escDvHtml(c.label)}</span>`
        : `<span class="df-chip custom">${escDvHtml(c.label)}</span>`
    ).join('');
  } else if (e.fields) {
    const chips = e.fields.split(',').map(f => f.trim()).filter(Boolean);
    fw.innerHTML = chips.map(f => `<span class="data-field-chip">${f}</span>`).join('');
  } else {
    fw.innerHTML = emptySpan('Nog geen datavelden gedefinieerd');
  }

  // Changelog
  const cl = document.getElementById('dChangelog');
  const log = e.changelog || [];
  if (log.length) {
    cl.innerHTML = [...log].reverse().map(c => `
      <div class="changelog-item">
        <span class="changelog-dot"></span>
        <span class="changelog-date">${c.date}</span>
        <span class="changelog-action">${c.action}</span>
      </div>`).join('');
  } else {
    cl.innerHTML = `<div class="changelog-item"><span class="changelog-dot"></span><span class="changelog-action" style="font-style:italic;">Nog geen wijzigingen geregistreerd</span></div>`;
  }

  renderTable();
  if (typeof renderUsedIn === 'function') renderUsedIn(id);
}

function openEdit(id) {
  const e = entries.find(x => x.id === id);
  if (!e) return;
  editingId = id;
  isNew = false;
  document.getElementById('editTitle').textContent = 'Begrip bewerken — ' + e.id;
  document.getElementById('eId').value = e.id;
  document.getElementById('eTerm').value = e.term || '';
  document.getElementById('eDef').value = e.def || '';
  document.getElementById('eCtx').value = e.ctx || '';
  initFieldChips(e.fields || '', e.fieldChips || null);
  document.getElementById('eCat').value = e.cat || '';
  document.getElementById('eStatus').value = e.status || 'Definitie en context controleren';
  document.getElementById('eTeam').value = e.team || '';
  document.getElementById('eDate').value = e.date || '';
  document.getElementById('eNotes').value = e.notes || '';
  document.getElementById('eSource').value = e.source || '';
  // Clear validation states
  ['eTerm','eDef','eTeam'].forEach(id => {
    document.getElementById(id).classList.remove('invalid');
  });
  ['errTerm','errDef','errTeam'].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove('show');
  });
  document.getElementById('editPanel').classList.add('open');
}

function openNew() {
  isNew = true;
  editingId = null;
  const newId = nextId();
  document.getElementById('editTitle').textContent = 'Nieuw begrip toevoegen';
  document.getElementById('eId').value = newId;
  document.getElementById('eTerm').value = '';
  document.getElementById('eDef').value = '';
  document.getElementById('eCtx').value = '';
  initFieldChips('', []);
  document.getElementById('eCat').value = '';
  document.getElementById('eStatus').value = 'Definitie en context controleren';
  document.getElementById('eTeam').value = '';
  document.getElementById('eDate').value = '';
  document.getElementById('eNotes').value = '';
  document.getElementById('eSource').value = '';
  // Clear validation
  ['eTerm','eDef','eTeam'].forEach(id => document.getElementById(id).classList.remove('invalid'));
  ['errTerm','errDef','errTeam'].forEach(id => { const el=document.getElementById(id); if(el) el.classList.remove('show'); });
  document.getElementById('detailEmpty').style.display = 'none';
  document.getElementById('detailContent').style.display = 'none';
  document.getElementById('editPanel').classList.add('open');
}

function closeEdit() {
  document.getElementById('editPanel').classList.remove('open');
}

function saveEntry() {
  const term = document.getElementById('eTerm').value.trim();
  const def  = document.getElementById('eDef').value.trim();
  const team = document.getElementById('eTeam').value;

  // Validate required fields
  let valid = true;
  function setErr(fieldId, errId, fail) {
    document.getElementById(fieldId).classList.toggle('invalid', fail);
    const el = document.getElementById(errId);
    if (el) el.classList.toggle('show', fail);
    if (fail) valid = false;
  }
  setErr('eTerm',  'errTerm',  !term);
  setErr('eDef',   'errDef',   !def);
  setErr('eTeam',  'errTeam',  !team);
  if (!valid) return;

  // Clear validation styles
  ['eTerm','eDef','eTeam'].forEach(id => document.getElementById(id).classList.remove('invalid'));

  const now = new Date().toLocaleDateString('nl-NL',{day:'2-digit',month:'2-digit',year:'numeric'});

  const obj = {
    id: document.getElementById('eId').value,
    term,
    def,
    ctx: document.getElementById('eCtx').value.trim(),
    fields: currentFieldChips.map(c => c.label).join(', '),
    fieldChips: JSON.parse(JSON.stringify(currentFieldChips)),
    cat: document.getElementById('eCat').value,
    team,
    status: document.getElementById('eStatus').value,
    date: document.getElementById('eDate').value.trim() || '—',
    notes: document.getElementById('eNotes').value.trim(),
    source: document.getElementById('eSource').value.trim(),
    changelog: [],
  };

  if (isNew) {
    obj.changelog = [{date: now, action: 'Aangemaakt'}];
    entries.push(obj);
  } else {
    const idx = entries.findIndex(e => e.id === editingId);
    if (idx >= 0) {
      const old = entries[idx];
      obj.changelog = [...(old.changelog || [])];
      // Detect what changed
      const changes = [];
      if (old.term !== obj.term) changes.push('term');
      if (old.def  !== obj.def)  changes.push('definitie');
      if (old.ctx  !== obj.ctx)  changes.push('business context');
      if (old.fields !== obj.fields) changes.push('datavelden');
      if (old.cat  !== obj.cat)  changes.push('categorie');
      if (old.team !== obj.team) changes.push('team');
      if (old.status !== obj.status) changes.push('status');
      if (old.notes !== obj.notes) changes.push('opmerkingen');
      if ((old.source||'') !== obj.source) changes.push('bronverwijzing');
      if (changes.length) {
        obj.changelog.push({date: now, action: 'Gewijzigd: ' + changes.join(', ')});
      }
      entries[idx] = obj;
    }
  }

  saveData();
  closeEdit();
  currentId = obj.id;
  renderTable();
  selectEntry(obj.id);
}

function deleteEntry(id) {
  const e = entries.find(x => x.id === id);
  if (!e) return;
  if (!confirm(`Wil je "${e.term}" (${e.id}) verwijderen?\n\nTip: overweeg de status op 'Vervallen' te zetten om historisch overzicht te bewaren.`)) return;
  entries = entries.filter(x => x.id !== id);
  saveData();
  currentId = null;
  document.getElementById('detailEmpty').style.display = 'flex';
  document.getElementById('detailContent').style.display = 'none';
  renderTable();
}

// ── Beheer: Categorieën, Teams, Statussen ────────────────────────

const CAT_KEY    = 'medemblik_categorieen_v9';
const TEAM_KEY   = 'medemblik_teams_v9';
const STATUS_KEY = 'medemblik_statussen_v9';

const COLOR_MAP = {
  blue:   {bg:'#E6F1FB', color:'#185FA5', dot:'#378ADD'},
  green:  {bg:'#E1F5EE', color:'#0B6E49', dot:'#1D9E75'},
  purple: {bg:'#EDE9FC', color:'#534AB7', dot:'#7F77DD'},
  orange: {bg:'#FFF0E6', color:'#993C1D', dot:'#F26722'},
  teal:   {bg:'#E0F7F9', color:'#0C6E78', dot:'#16BECF'},
  red:    {bg:'#FAECE7', color:'#993C1D', dot:'#E24B4A'},
  gray:   {bg:'#F2F5F9', color:'#4A6180', dot:'#888780'},
};

const DEFAULT_CATS = [
  {
    "name": "Toegang",
    "color": "orange"
  },
  {
    "name": "In/Uitstroom",
    "color": "teal"
  },
  {
    "name": "Wachtlijst",
    "color": "green"
  },
  {
    "name": "Beslistermijn",
    "color": "orange"
  },
  {
    "name": "Trajecten/Producten",
    "color": "red"
  }
];
const DEFAULT_TEAMS = [
  "Sociaal & Welzijn",
  " WMO & Backoffice",
  "Contractbeheer & Inkoop",
  "Jeugd",
  "Bedrijfsvoering",
  "Preventie",
  "Datateam",
  "CBS"
];
const DEFAULT_STATUSES = [
  {
    "name": "Vastgesteld",
    "color": "green"
  },
  {
    "name": "Definitie en context controleren",
    "color": "blue"
  },
  {
    "name": "Data velden zoeken",
    "color": "orange"
  },
  {
    "name": "Vervallen",
    "color": "red"
  }
];

let categories = [];
let teams      = [];
let statuses   = [];
let tempCats   = [];
let tempTeams  = [];
let tempStats  = [];
let activeTab  = 'cat';

// ── Load / Save ───────────────────────────────────────────────────
function loadMeta() {
  try {
    const sc = localStorage.getItem(CAT_KEY);
    categories = sc ? JSON.parse(sc) : JSON.parse(JSON.stringify(DEFAULT_CATS));
    const st = localStorage.getItem(TEAM_KEY);
    teams = st ? JSON.parse(st) : JSON.parse(JSON.stringify(DEFAULT_TEAMS));
    const ss = localStorage.getItem(STATUS_KEY);
    statuses = ss ? JSON.parse(ss) : JSON.parse(JSON.stringify(DEFAULT_STATUSES));
  } catch(e) {
    categories = JSON.parse(JSON.stringify(DEFAULT_CATS));
    teams = JSON.parse(JSON.stringify(DEFAULT_TEAMS));
    statuses = JSON.parse(JSON.stringify(DEFAULT_STATUSES));
  }
}
// keep backward compat alias
function loadCats() { loadMeta(); }

function saveMetaData() {
  try { localStorage.setItem(CAT_KEY,    JSON.stringify(categories)); } catch(e){}
  try { localStorage.setItem(TEAM_KEY,   JSON.stringify(teams));      } catch(e){}
  try { localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));   } catch(e){}
}

// ── Helpers ───────────────────────────────────────────────────────
function getCatStyle(name) {
  const cat = categories.find(c => c.name === name);
  return COLOR_MAP[cat ? cat.color : 'gray'] || COLOR_MAP.gray;
}
function getStatusStyle(name) {
  const s = statuses.find(s => s.name === name);
  return COLOR_MAP[s ? s.color : 'gray'] || COLOR_MAP.gray;
}

function catPill(name) {
  if (!name) return '';
  const s = getCatStyle(name);
  return `<span class="cat-pill" style="background:${s.bg};color:${s.color};">${name}</span>`;
}

// ── Rebuild dropdowns ─────────────────────────────────────────────
function rebuildCatDropdowns() {
  // Filter cat
  const fc = document.getElementById('filterCat');
  const pfc = fc.value;
  fc.innerHTML = '<option value="">Alle categorieën</option>' +
    categories.map(c=>`<option value="${c.name}"${c.name===pfc?' selected':''}>${c.name}</option>`).join('');
  // Edit cat
  const ec = document.getElementById('eCat');
  const pec = ec.value;
  ec.innerHTML = '<option value="">— kies —</option>' +
    categories.map(c=>`<option value="${c.name}"${c.name===pec?' selected':''}>${c.name}</option>`).join('');

  // Filter status
  const fs = document.getElementById('filterStatus');
  const pfs = fs.value;
  fs.innerHTML = '<option value="">Alle statussen</option>' +
    statuses.map(s=>`<option value="${s.name}"${s.name===pfs?' selected':''}>${s.name}</option>`).join('');
  // Edit status
  const es = document.getElementById('eStatus');
  const pes = es.value;
  es.innerHTML = statuses.map(s=>`<option value="${s.name}"${s.name===pes?' selected':''}>${s.name}</option>`).join('');

  // Filter team
  const ft = document.getElementById('filterTeam');
  const pft = ft.value;
  ft.innerHTML = '<option value="">Alle teams</option>' +
    teams.map(t=>`<option value="${t}"${t===pft?' selected':''}>${t}</option>`).join('');
  // Edit team
  const et = document.getElementById('eTeam');
  const pet = et.value;
  et.innerHTML = '<option value="">— kies —</option>' +
    teams.map(t=>`<option value="${t}"${t===pet?' selected':''}>${t}</option>`).join('');
}

// ── Modal open/close/tabs ─────────────────────────────────────────
function openCatModal() {
  tempCats  = JSON.parse(JSON.stringify(categories));
  tempTeams = JSON.parse(JSON.stringify(teams));
  tempStats = JSON.parse(JSON.stringify(statuses));
  activeTab = 'cat';
  updateTabCounts();
  renderAllPanes();
  switchTab('cat');
  document.getElementById('catModal').classList.add('open');
}

function closeCatModal() {
  document.getElementById('catModal').classList.remove('open');
}

function switchTab(tab) {
  activeTab = tab;
  ['cat','team','status'].forEach(t => {
    document.getElementById('tab-'+t).classList.toggle('active', t===tab);
    document.getElementById('pane-'+t).style.display = t===tab ? 'block' : 'none';
  });
}

function updateTabCounts() {
  document.getElementById('tc-cat').textContent    = tempCats.length;
  document.getElementById('tc-team').textContent   = tempTeams.length;
  document.getElementById('tc-status').textContent = tempStats.length;
}

function colorOptions(selected) {
  return Object.entries({blue:'Blauw',green:'Groen',purple:'Paars',orange:'Oranje',teal:'Teal',red:'Rood',gray:'Grijs'})
    .map(([v,l])=>`<option value="${v}"${v===selected?' selected':''}>${l}</option>`).join('');
}

function delIcon() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
}

// ── Categorieën pane ──────────────────────────────────────────────
function renderCatList() {
  document.getElementById('catList').innerHTML = tempCats.map((c,i) => {
    const s   = COLOR_MAP[c.color] || COLOR_MAP.gray;
    const cnt = entries.filter(e=>e.cat===c.name).length;
    return `<div class="item-row">
      <span class="color-dot" style="background:${s.dot};"></span>
      <input class="item-name-input" value="${c.name.replace(/"/g,'&quot;')}" onchange="tempCats[${i}].name=this.value" placeholder="Categorienaam">
      <select class="color-sel" onchange="tempCats[${i}].color=this.value;renderCatList()">${colorOptions(c.color)}</select>
      <span class="item-count">${cnt}</span>
      <button class="btn-del-item" onclick="removeTempCat(${i})" title="Verwijder">${delIcon()}</button>
    </div>`;
  }).join('');
  updateTabCounts();
}

function removeTempCat(i) {
  const name = tempCats[i].name;
  const cnt  = entries.filter(e=>e.cat===name).length;
  if (cnt>0 && !confirm(`"${name}" is gekoppeld aan ${cnt} begrip(pen). Doorgaan?`)) return;
  tempCats.splice(i,1);
  renderCatList();
}

function addCatRow() {
  const inp  = document.getElementById('newCatName');
  const name = inp.value.trim();
  if (!name) { inp.focus(); return; }
  if (tempCats.find(c=>c.name.toLowerCase()===name.toLowerCase())) { alert('Naam bestaat al.'); return; }
  tempCats.push({name, color: document.getElementById('newCatColor').value});
  inp.value = '';
  renderCatList();
}

// ── Teams pane ────────────────────────────────────────────────────
function renderTeamList() {
  document.getElementById('teamList').innerHTML = tempTeams.map((t,i) => {
    const cnt = entries.filter(e=>e.team===t).length;
    return `<div class="item-row">
      <span class="color-dot" style="background:var(--zb);"></span>
      <input class="item-name-input" value="${t.replace(/"/g,'&quot;')}" onchange="tempTeams[${i}]=this.value" placeholder="Teamnaam">
      <span class="item-count">${cnt}</span>
      <button class="btn-del-item" onclick="removeTempTeam(${i})" title="Verwijder">${delIcon()}</button>
    </div>`;
  }).join('');
  updateTabCounts();
}

function removeTempTeam(i) {
  const name = tempTeams[i];
  const cnt  = entries.filter(e=>e.team===name).length;
  if (cnt>0 && !confirm(`"${name}" is gekoppeld aan ${cnt} begrip(pen). Doorgaan?`)) return;
  tempTeams.splice(i,1);
  renderTeamList();
}

function addTeamRow() {
  const inp  = document.getElementById('newTeamName');
  const name = inp.value.trim();
  if (!name) { inp.focus(); return; }
  if (tempTeams.find(t=>t.toLowerCase()===name.toLowerCase())) { alert('Naam bestaat al.'); return; }
  tempTeams.push(name);
  inp.value = '';
  renderTeamList();
}

// ── Statussen pane ────────────────────────────────────────────────
function renderStatusList() {
  document.getElementById('statusList').innerHTML = tempStats.map((s,i) => {
    const st  = COLOR_MAP[s.color] || COLOR_MAP.gray;
    const cnt = entries.filter(e=>e.status===s.name).length;
    return `<div class="item-row">
      <span class="color-dot" style="background:${st.dot};"></span>
      <input class="item-name-input" value="${s.name.replace(/"/g,'&quot;')}" onchange="tempStats[${i}].name=this.value" placeholder="Statusnaam">
      <select class="color-sel" onchange="tempStats[${i}].color=this.value;renderStatusList()">${colorOptions(s.color)}</select>
      <span class="item-count">${cnt}</span>
      <button class="btn-del-item" onclick="removeTempStatus(${i})" title="Verwijder">${delIcon()}</button>
    </div>`;
  }).join('');
  updateTabCounts();
}

function removeTempStatus(i) {
  const name = tempStats[i].name;
  const cnt  = entries.filter(e=>e.status===name).length;
  if (cnt>0 && !confirm(`"${name}" is gekoppeld aan ${cnt} begrip(pen). Doorgaan?`)) return;
  tempStats.splice(i,1);
  renderStatusList();
}

function addStatusRow() {
  const inp  = document.getElementById('newStatusName');
  const name = inp.value.trim();
  if (!name) { inp.focus(); return; }
  if (tempStats.find(s=>s.name.toLowerCase()===name.toLowerCase())) { alert('Naam bestaat al.'); return; }
  tempStats.push({name, color: document.getElementById('newStatusColor').value});
  inp.value = '';
  renderStatusList();
}

function renderAllPanes() {
  renderCatList();
  renderTeamList();
  renderStatusList();
}

// ── Save all ──────────────────────────────────────────────────────
function saveAll() {
  // Apply renames: positional rename for cats and statuses
  categories.forEach((old,i) => {
    const nw = tempCats[i];
    if (nw && nw.name !== old.name) entries.forEach(e=>{ if(e.cat===old.name) e.cat=nw.name; });
  });
  teams.forEach((old,i) => {
    const nw = tempTeams[i];
    if (nw && nw !== old) entries.forEach(e=>{ if(e.team===old) e.team=nw; });
  });
  statuses.forEach((old,i) => {
    const nw = tempStats[i];
    if (nw && nw.name !== old.name) entries.forEach(e=>{ if(e.status===old.name) e.status=nw.name; });
  });

  categories = JSON.parse(JSON.stringify(tempCats));
  teams      = JSON.parse(JSON.stringify(tempTeams));
  statuses   = JSON.parse(JSON.stringify(tempStats));

  saveMetaData();
  saveData();
  rebuildCatDropdowns();
  renderTable();
  if (currentId) selectEntry(currentId);
  closeCatModal();
}

// Keep backward compat alias
function saveCats() { saveAll(); }

// ── Excel export ──────────────────────────────────────────────────
function exportToExcel() {
  // Get currently filtered entries (same logic as renderTable)
  const q   = document.getElementById('searchInput').value.toLowerCase();
  const fCat = document.getElementById('filterCat').value;
  const fSt  = document.getElementById('filterStatus').value;
  const fTm  = document.getElementById('filterTeam').value;

  const filtered = entries.filter(e => {
    if (fCat && e.cat !== fCat) return false;
    if (fSt  && e.status !== fSt) return false;
    if (fTm  && e.team !== fTm) return false;
    if (q) {
      const hay = [e.id, e.term, e.def, e.ctx, e.fields, e.notes].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (!filtered.length) { alert('Geen begrippen om te exporteren.'); return; }

  const rows = filtered.map(e => ({
    'ID':              e.id,
    'Term':            e.term,
    'Definitie':       e.def,
    'Business context': e.ctx,
    'Datavelden':      e.fields,
    'Categorie':       e.cat,
    'Team':            e.team,
    'Status':          e.status,
    'Datum vastgesteld': e.date,
    'Opmerkingen':     e.notes,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    {wch:8},{wch:28},{wch:55},{wch:45},{wch:40},
    {wch:18},{wch:30},{wch:14},{wch:18},{wch:35}
  ];

  // Header style (bold, Medemblik blue fill)
  const headerRange = XLSX.utils.decode_range(ws['!ref']);
  for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
    const cell = ws[XLSX.utils.encode_cell({r:0, c})];
    if (cell) {
      cell.s = {
        font: {bold: true, color: {rgb: 'FFFFFF'}},
        fill: {fgColor: {rgb: '002E56'}},
        alignment: {wrapText: false}
      };
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Definitiecatalogus');

  const date = new Date().toLocaleDateString('nl-NL',{day:'2-digit',month:'2-digit',year:'numeric'}).replace(/\//g,'-');
  XLSX.writeFile(wb, `Definitiecatalogus_Medemblik_${date}.xlsx`);
}

// ── Filters ───────────────────────────────────────────────────────
['searchInput','filterCat','filterStatus','filterTeam'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => renderTable());
  document.getElementById(id).addEventListener('change', () => renderTable());
});

var _cm=document.getElementById('catModal');if(_cm)_cm.addEventListener('click',function(e){if(e.target===this)closeCatModal();});

// ── Processen data ────────────────────────────────────────────────
const PROC_KEY = 'medemblik_processen_v9';
let processes = [];
let currentProcId = null;
let selectedNodeId = null;
let connectMode = false;
let connectFrom = null;
let nodeIdCounter = 0;


const DEFAULT_PROC = [
  {
    "id": "proc-gpk-2025",
    "name": "GPK afhandeling",
    "nodes": [
      {
        "id": "gpk-n1",
        "type": "start",
        "name": "Melding binnenkomt",
        "sub": "Meldingsdatum geregistreerd",
        "defs": [],
        "x": 220,
        "y": 30,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n2",
        "type": "step",
        "name": "Zaak aangemaakt",
        "sub": "Registratie in MensCentraal",
        "defs": [],
        "x": 220,
        "y": 130,
        "dvfields": [
          "DF-040 creationDate"
        ]
      },
      {
        "id": "gpk-n3",
        "type": "decision",
        "name": "Medisch advies nodig?",
        "sub": "",
        "defs": [],
        "x": 220,
        "y": 230,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n4",
        "type": "action",
        "name": "Dossieronderzoek",
        "sub": "Intern — niet geregistreerd",
        "defs": [],
        "x": 60,
        "y": 360
      },
      {
        "id": "gpk-n5",
        "type": "step",
        "name": "SMA aangevraagd",
        "sub": "Datum aanvraag SMA",
        "defs": [],
        "x": 390,
        "y": 360,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n6",
        "type": "step",
        "name": "Wachten op advies",
        "sub": "Datum SMA ontvangen",
        "defs": [],
        "x": 390,
        "y": 460,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n7",
        "type": "end",
        "name": "Besluit (Route B)",
        "sub": "Registratiedatum besluit",
        "defs": [
          "D-013 Indicatiebesluit"
        ],
        "x": 79,
        "y": 505,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n8",
        "type": "end",
        "name": "Besluit (Route A)",
        "sub": "Registratiedatum besluit",
        "defs": [
          "D-013 Indicatiebesluit"
        ],
        "x": 387,
        "y": 552,
        "dvfields": [
          "DF-054 antwoord"
        ]
      },
      {
        "id": "gpk-n9",
        "type": "end",
        "name": "Product besteld",
        "sub": "Besteldatum",
        "defs": [],
        "x": 207,
        "y": 646
      }
    ],
    "edges": [
      {
        "from": "gpk-n1",
        "to": "gpk-n2",
        "label": ""
      },
      {
        "from": "gpk-n2",
        "to": "gpk-n3",
        "label": ""
      },
      {
        "from": "gpk-n3",
        "to": "gpk-n4",
        "label": "Nee"
      },
      {
        "from": "gpk-n3",
        "to": "gpk-n5",
        "label": "Ja"
      },
      {
        "from": "gpk-n5",
        "to": "gpk-n6",
        "label": ""
      },
      {
        "from": "gpk-n4",
        "to": "gpk-n7",
        "label": ""
      },
      {
        "from": "gpk-n6",
        "to": "gpk-n8",
        "label": ""
      },
      {
        "from": "gpk-n7",
        "to": "gpk-n9",
        "label": ""
      },
      {
        "from": "gpk-n8",
        "to": "gpk-n9",
        "label": ""
      }
    ],
    "cat": "Sociaal Domein"
  },
  {
    "id": "proc-1780992589971",
    "name": "Maatschappelijkwerk zaak",
    "nodes": [
      {
        "id": "n1-1780992593203",
        "type": "start",
        "name": "Start",
        "sub": "",
        "defs": [],
        "x": 229,
        "y": 93
      },
      {
        "id": "n8-1781177828394",
        "type": "step",
        "name": "Stap",
        "sub": "",
        "defs": [],
        "x": 235,
        "y": 199
      }
    ],
    "edges": [
      {
        "from": "n8-1781177828394",
        "to": "n1-1780992593203",
        "label": ""
      }
    ]
  },
  {
    "id": "proc-1781002969414",
    "name": "Beslistermijn Jeugdzorg",
    "nodes": [
      {
        "id": "n1-1781005962274",
        "type": "start",
        "name": "Aanvraag",
        "sub": "",
        "defs": [],
        "x": 192,
        "y": 28,
        "desc": "Aanvraag Een jeugdhulpvraag die via het gemeentelijk webformulier door een belanghebbende is ingediend. De datum van aanvraag = start van de wettelijke beslistermijn.",
        "role": "",
        "duration": ""
      },
      {
        "id": "n2-1781005992921",
        "type": "step",
        "name": "Triage",
        "sub": "",
        "defs": [],
        "x": 68,
        "y": 159
      },
      {
        "id": "n3-1781006033337",
        "type": "step",
        "name": "Verdeellijst",
        "sub": "",
        "defs": [],
        "x": 263,
        "y": 247
      },
      {
        "id": "n5-1781099456888",
        "type": "action",
        "name": "Onderzoek",
        "sub": "",
        "defs": [],
        "x": 79,
        "y": 342,
        "desc": "Jeugdhulpverlener voert Jeugdwet onderzoek uit",
        "role": "",
        "duration": ""
      },
      {
        "id": "n6-1781099524329",
        "type": "decision",
        "name": "Besluit",
        "sub": "",
        "defs": [],
        "x": 269,
        "y": 481,
        "desc": "Formeel besluit college, jeugdhulp toekennen of afwijzen.",
        "role": "",
        "duration": ""
      }
    ],
    "edges": [
      {
        "from": "n2-1781005992921",
        "to": "n3-1781006033337",
        "label": ""
      },
      {
        "from": "n5-1781099456888",
        "to": "n6-1781099524329",
        "label": ""
      },
      {
        "from": "n1-1781005962274",
        "to": "n2-1781005992921",
        "label": ""
      },
      {
        "from": "n3-1781006033337",
        "to": "n5-1781099456888",
        "label": ""
      }
    ],
    "cat": "Jeugd"
  },
  {
    "id": "proc-1781176283703",
    "name": "Aanmelding Jeugdzorg via Huisarts of medisch specialist",
    "nodes": [
      {
        "id": "n7-1781176308648",
        "type": "start",
        "name": "Start",
        "sub": "",
        "defs": [],
        "x": 253,
        "y": 53
      }
    ],
    "edges": []
  },
  {
    "id": "proc-1781248424957",
    "name": "WMO melding",
    "nodes": [
      {
        "id": "n1-1781248499477",
        "type": "start",
        "name": "Melding WMO ",
        "sub": "",
        "defs": [],
        "x": 233,
        "y": 83
      },
      {
        "id": "n2-1781248658865",
        "type": "step",
        "name": "Stap",
        "sub": "",
        "defs": [],
        "x": 114,
        "y": 193
      },
      {
        "id": "n3-1781248665878",
        "type": "action",
        "name": "Onderzoek",
        "sub": "",
        "defs": [],
        "x": 352,
        "y": 196
      }
    ],
    "edges": [],
    "cat": "WMO"
  },
  {
    "id": "proc-1781249023851",
    "name": "Aanmelding jeugd GI",
    "nodes": [
      {
        "id": "n5-1781249033250",
        "type": "start",
        "name": "Start",
        "sub": "",
        "defs": [],
        "x": 60,
        "y": 60
      }
    ],
    "edges": [],
    "cat": "Jeugd"
  }
];

function loadProcesses() {
  try {
    const s = localStorage.getItem(PROC_KEY);
    processes = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_PROC));
  } catch(e) { processes = JSON.parse(JSON.stringify(DEFAULT_PROC)); }
}

function GPK_DEFAULT_PROCESS() {
  return {
    id: 'proc-gpk-2025',
    name: 'GPK afhandeling',
    cat: 'WMO',
    nodes: [
      { id:'gpk-n1', type:'start',    name:'Melding binnenkomt',    sub:'Meldingsdatum geregistreerd',   defs:['D-053 Ingestroomde cliënten'], x:220, y:30  },
      { id:'gpk-n2', type:'step',     name:'Zaak aangemaakt',       sub:'Registratie in MensCentraal',   defs:[],                              x:220, y:130 },
      { id:'gpk-n3', type:'decision', name:'Medisch advies nodig?', sub:'',                              defs:[],                              x:220, y:230 },
      { id:'gpk-n4', type:'action',   name:'Dossieronderzoek',      sub:'Intern — niet geregistreerd',   defs:['D-007 Enkelvoudige hulpvraag'], x:60,  y:360 },
      { id:'gpk-n5', type:'step',     name:'SMA aangevraagd',       sub:'Datum aanvraag SMA',            defs:['D-016 Wachttijd'],              x:390, y:360 },
      { id:'gpk-n6', type:'step',     name:'Wachten op advies',     sub:'Datum SMA ontvangen',           defs:['D-003 Doorlooptijd'],           x:390, y:460 },
      { id:'gpk-n7', type:'end',      name:'Besluit (Route B)',      sub:'Registratiedatum besluit',      defs:['D-013 Indicatiebesluit'],       x:60,  y:470 },
      { id:'gpk-n8', type:'end',      name:'Besluit (Route A)',      sub:'Registratiedatum besluit',      defs:['D-013 Indicatiebesluit'],       x:390, y:560 },
      { id:'gpk-n9', type:'end',      name:'Product besteld',        sub:'Besteldatum',                   defs:[],                              x:220, y:660 },
    ],
    edges: [
      { from:'gpk-n1', to:'gpk-n2', label:'' },
      { from:'gpk-n2', to:'gpk-n3', label:'' },
      { from:'gpk-n3', to:'gpk-n4', label:'Nee' },
      { from:'gpk-n3', to:'gpk-n5', label:'Ja' },
      { from:'gpk-n5', to:'gpk-n6', label:'' },
      { from:'gpk-n4', to:'gpk-n7', label:'' },
      { from:'gpk-n6', to:'gpk-n8', label:'' },
      { from:'gpk-n7', to:'gpk-n9', label:'' },
      { from:'gpk-n8', to:'gpk-n9', label:'' },
    ]
  };
}

function saveProcesses() {
  try { localStorage.setItem(PROC_KEY, JSON.stringify(processes)); } catch(e) {}
}

function newProcId() {
  return 'proc-' + Date.now();
}

function newNodeId() {
  return 'n' + (++nodeIdCounter) + '-' + Date.now();
}

// ── Library ───────────────────────────────────────────────────────
function renderProcLibrary() {
  procShowLibrary();
  const grid = document.getElementById('proc-grid');
  const filterCat = (document.getElementById('procFilterCat') || {}).value || '';
  const searchQ = ((document.getElementById('procSearch') || {}).value || '').toLowerCase().trim();
  let visProcs = filterCat ? processes.filter(p => p.cat === filterCat) : processes;
  if (searchQ) visProcs = visProcs.filter(p =>
    (p.name||'').toLowerCase().includes(searchQ) || (p.cat||'').toLowerCase().includes(searchQ)
  );
  const lbl = document.getElementById('procCountLabel');
  if (lbl) lbl.textContent = visProcs.length + ' processen';
  grid.innerHTML = visProcs.map(p => {
    const nodeCount = (p.nodes||[]).length;
    const linkedDefs = [];
    (p.nodes||[]).forEach(n => (n.defs||[]).forEach(d => { if(!linkedDefs.includes(d)) linkedDefs.push(d); }));
    const tags = linkedDefs.slice(0,3).map(d => `<span class="proc-card-tag">${d}</span>`).join('');
    const catPillHtml = p.cat ? (() => {
      const c = (typeof procCats !== 'undefined') ? procCats.find(x => x.name === p.cat) : null;
      const s = (typeof COLOR_MAP !== 'undefined') ? (COLOR_MAP[c ? c.color : 'gray'] || COLOR_MAP.gray) : {bg:'#F2F5F9',color:'#4A6180'};
      return `<span class="proc-cat-pill" style="background:${s.bg};color:${s.color};">${p.cat}</span>`;
    })() : '';
    return `<div class="proc-card${currentProcId === p.id ? ' active-card' : ''}" onclick="openProcess('${p.id}')">
      <div class="proc-card-title">${escHtml(p.name || 'Naamloos')}</div>
      <div class="proc-card-meta" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        <span style="display:flex;align-items:center;gap:3px;">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/></svg>
          ${nodeCount} stap${nodeCount !== 1 ? 'pen' : ''}
        </span>
        ${catPillHtml ? catPillHtml : ''}
      </div>
      ${tags ? `<div class="proc-card-tags" style="margin-top:6px;">${tags}</div>` : ''}
    </div>`;
  }).join('') + `<div class="proc-card proc-card-new" onclick="createProcess()">
      <div class="proc-card-new-icon">+</div>
      <div class="proc-card-new-lbl">Nieuw proces</div>
    </div>`;
  if (typeof updateHeaderCounts === 'function') updateHeaderCounts();
}

function createProcess() {
  const p = { id: newProcId(), name: 'Nieuw proces', nodes: [], edges: [] };
  processes.push(p);
  saveProcesses();
  openProcess(p.id);
}

function openProcess(id) {
  currentProcId = id;
  selectedNodeId = null;
  connectMode = false;
  connectFrom = null;
  const p = processes.find(x => x.id === id);
  if (!p) return;
  document.getElementById('proc-name-input').value = p.name || '';
  const catSel = document.getElementById('proc-cat-select');
  if (catSel) catSel.value = p.cat || '';
  procShowEditor();
  rebuildDefPicker();
  renderCanvas();
  showNodeDetail(null);
}

function deleteCurrentProcess() {
  if (!currentProcId) return;
  const p = processes.find(x => x.id === currentProcId);
  if (!confirm(`Proces "${p?.name || ''}" verwijderen?`)) return;
  processes = processes.filter(x => x.id !== currentProcId);
  saveProcesses();
  renderProcLibrary();
}

function procShowLibrary() {
  document.getElementById('proc-library').style.display = 'block';
  document.getElementById('proc-editor').style.display = 'none';
  document.getElementById('proc-editor').classList.remove('active');
}

function procShowEditor() {
  document.getElementById('proc-library').style.display = 'none';
  document.getElementById('proc-editor').style.display = 'flex';
  document.getElementById('proc-editor').classList.add('active');
}

// ── Canvas rendering ──────────────────────────────────────────────
function currentProc() { return processes.find(x => x.id === currentProcId); }

function renderCanvas() {
  const p = currentProc(); if (!p) return;
  const canvas = document.getElementById('proc-canvas');
  const hint = document.getElementById('canvas-hint');
  hint.style.display = p.nodes.length ? 'none' : 'flex';

  // Render nodes
  canvas.innerHTML = '';
  p.nodes.forEach(n => {
    const el = document.createElement('div');
    el.className = 'cn type-' + n.type + (n.id === selectedNodeId ? ' selected' : '');
    el.id = 'cn-' + n.id;
    el.style.left = n.x + 'px';
    el.style.top  = n.y + 'px';
    el.innerHTML = `<span>${escHtml(n.name || '…')}</span>` +
      (n.sub ? `<span class="cn-sub">${escHtml(n.sub)}</span>` : '') +
      (n.defs && n.defs.length ? `<span class="cn-sub" style="color:inherit;opacity:.7;">📎 ${n.defs.slice(0,2).join(', ')}${n.defs.length>2?'…':''}</span>` : '') +
      `<div class="cn-link-dot bottom" data-dir="bottom" data-id="${n.id}"></div>
       <div class="cn-link-dot top"    data-dir="top"    data-id="${n.id}"></div>
       <div class="cn-link-dot right"  data-dir="right"  data-id="${n.id}"></div>
       <div class="cn-link-dot left"   data-dir="left"   data-id="${n.id}"></div>`;

    // Drag
    el.addEventListener('mousedown', ev => {
      if (ev.target.classList.contains('cn-link-dot')) return;
      if (connectMode) { handleConnectClick(n.id); ev.preventDefault(); return; }
      selectNode(n.id);
      const startX = ev.clientX - n.x;
      const startY = ev.clientY - n.y;
      function onMove(e) {
        n.x = Math.max(0, e.clientX - startX);
        n.y = Math.max(0, e.clientY - startY);
        el.style.left = n.x + 'px';
        el.style.top  = n.y + 'px';
        renderEdges();
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        saveProcesses();
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      ev.preventDefault();
    });

    // Connection dot click
    el.querySelectorAll('.cn-link-dot').forEach(dot => {
      dot.addEventListener('mousedown', ev => {
        ev.stopPropagation();
        if (!connectMode) { toggleConnectMode(); }
        handleConnectClick(n.id);
      });
    });

    canvas.appendChild(el);
  });

  renderEdges();
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderEdges() {
  const p = currentProc(); if (!p) return;
  const svg = document.getElementById('proc-svg');
  // Remove old edges
  svg.querySelectorAll('.proc-edge,.proc-edge-label,.proc-edge-hit').forEach(e => e.remove());

  p.edges.forEach((e, ei) => {
    const fromEl = document.getElementById('cn-' + e.from);
    const toEl   = document.getElementById('cn-' + e.to);
    if (!fromEl || !toEl) return;

    const fr = fromEl.getBoundingClientRect();
    const tr = toEl.getBoundingClientRect();
    const wrap = document.getElementById('proc-canvas-wrap').getBoundingClientRect();

    // Center of each node relative to wrap
    const fx = fr.left - wrap.left + fr.width/2;
    const fy = fr.top  - wrap.top  + fr.height/2;
    const tx = tr.left - wrap.left + tr.width/2;
    const ty = tr.top  - wrap.top  + tr.height/2;

    // Exit point bottom of from, entry point top of to (with fallback)
    const x1 = fx, y1 = fr.bottom - wrap.top;
    const x2 = tx, y2 = tr.top    - wrap.top;

    const mx = (x1+x2)/2, my = (y1+y2)/2;

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('class','proc-edge');
    path.setAttribute('d', `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`);
    path.setAttribute('marker-end','url(#proc-arrow)');
    svg.appendChild(path);

    // Hit area for deletion
    const hit = document.createElementNS('http://www.w3.org/2000/svg','path');
    hit.setAttribute('class','proc-edge-hit');
    hit.setAttribute('d', `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`);
    hit.setAttribute('pointer-events','all');
    hit.title = 'Klik om te verwijderen';
    hit.style.cursor = 'pointer';
    hit.addEventListener('click', () => {
      if (confirm('Verbinding verwijderen?')) {
        p.edges.splice(ei, 1);
        saveProcesses();
        renderCanvas();
      }
    });
    svg.appendChild(hit);

    // Label
    if (e.label) {
      const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
      txt.setAttribute('class','proc-edge-label');
      txt.setAttribute('x', mx); txt.setAttribute('y', my - 4);
      txt.setAttribute('text-anchor','middle');
      txt.textContent = e.label;
      svg.appendChild(txt);
    }
  });
}

// ── Node management ───────────────────────────────────────────────
function addNode(type) {
  const p = currentProc(); if (!p) return;
  const wrap = document.getElementById('proc-canvas-wrap');
  const existing = p.nodes.length;
  const id = newNodeId();
  const names = { start:'Start', step:'Stap', decision:'Beslissing', action:'Actie', end:'Einde' };
  p.nodes.push({
    id, type,
    name: names[type] || 'Stap',
    sub: '', defs: [],
    x: 60 + (existing % 3) * 180,
    y: 60 + Math.floor(existing / 3) * 120
  });
  saveProcesses();
  renderCanvas();
  selectNode(id);
}

function selectNode(id) {
  selectedNodeId = id;
  document.querySelectorAll('.cn').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById('cn-' + id);
  if (el) el.classList.add('selected');
  showNodeDetail(id);
}

function showNodeDetail(id) {
  const hint = document.getElementById('nd-hint');
  const detail = document.getElementById('node-detail');
  if (!id) {
    hint.style.display = 'block'; detail.classList.remove('active'); return;
  }
  const p = currentProc(); if (!p) return;
  const n = p.nodes.find(x => x.id === id);
  if (!n) { hint.style.display = 'block'; detail.classList.remove('active'); return; }

  hint.style.display = 'none';
  detail.classList.add('active');
  document.getElementById('nd-name').value = n.name || '';
  document.getElementById('nd-sub').value  = n.sub  || '';
  // Clear def search
  const ds = document.getElementById('nd-def-search');
  const dr = document.getElementById('nd-def-results');
  if (ds) ds.value = '';
  if (dr) dr.style.display = 'none';

  // Linked defs
  renderLinkedDefs(n);

  // Extra fields (omschrijving, rol, doorlooptijd, datavelden)
  if (typeof showNodeDetailExtended === 'function') showNodeDetailExtended(n);

  // Connections from this node
  const connDiv = document.getElementById('nd-connections');
  const myEdges = p.edges.filter(e => e.from === id || e.to === id);
  if (myEdges.length) {
    connDiv.innerHTML = myEdges.map((e, i) => {
      const other = e.from === id ? e.to : e.from;
      const on = p.nodes.find(x => x.id === other);
      const dir = e.from === id ? '→' : '←';
      return `<div class="nd-conn-row">
        <span>${dir} ${escHtml(on?.name || '?')}</span>
        <button class="btn-del-conn" onclick="deleteEdge('${e.from}','${e.to}')">×</button>
      </div>`;
    }).join('');
  } else {
    connDiv.innerHTML = '<span style="font-size:.62rem;color:var(--bd);">Geen verbindingen</span>';
  }
}

function renderLinkedDefs(n) {
  const div = document.getElementById('nd-defs');
  div.innerHTML = (n.defs||[]).map(d =>
    `<span class="linked-def-chip">${escHtml(d)} <button onclick="unlinkDef('${n.id}','${escHtml(d).replace(/'/g,"\\'")}')">×</button></span>`
  ).join('');
}

function updateSelectedNode() {
  const p = currentProc(); if (!p || !selectedNodeId) return;
  const n = p.nodes.find(x => x.id === selectedNodeId); if (!n) return;
  n.name = document.getElementById('nd-name').value;
  n.sub  = document.getElementById('nd-sub').value;
  // Update node on canvas without full re-render
  const el = document.getElementById('cn-' + selectedNodeId);
  if (el) {
    el.querySelector('span').textContent = n.name || '…';
  }
  saveProcesses();
}

function deleteSelectedNode() {
  const p = currentProc(); if (!p || !selectedNodeId) return;
  const n = p.nodes.find(x => x.id === selectedNodeId);
  if (!confirm(`Stap "${n?.name || ''}" verwijderen?`)) return;
  p.nodes = p.nodes.filter(x => x.id !== selectedNodeId);
  p.edges = p.edges.filter(e => e.from !== selectedNodeId && e.to !== selectedNodeId);
  selectedNodeId = null;
  saveProcesses();
  renderCanvas();
  showNodeDetail(null);
}

function deleteEdge(from, to) {
  const p = currentProc(); if (!p) return;
  p.edges = p.edges.filter(e => !(e.from === from && e.to === to));
  saveProcesses();
  renderCanvas();
  showNodeDetail(selectedNodeId);
}

// ── Connect mode ──────────────────────────────────────────────────
function toggleConnectMode() {
  connectMode = !connectMode;
  connectFrom = null;
  const btn = document.getElementById('btn-connect-mode');
  const hint = document.getElementById('connect-hint');
  if (connectMode) {
    btn.style.background = 'var(--s)'; btn.style.color = '#fff'; btn.style.borderColor = 'var(--s)';
    hint.textContent = 'Klik nu op stap A…';
  } else {
    btn.style.background = ''; btn.style.color = ''; btn.style.borderColor = '';
    hint.textContent = 'Klik op "Verbinden", dan op stap A, dan op stap B.';
  }
}

function handleConnectClick(nodeId) {
  const p = currentProc(); if (!p) return;
  if (!connectFrom) {
    connectFrom = nodeId;
    document.getElementById('cn-' + nodeId).style.outline = '2px dashed var(--zb)';
    document.getElementById('connect-hint').textContent = 'Goed! Klik nu op stap B…';
  } else {
    if (connectFrom === nodeId) {
      // Deselect
      document.getElementById('cn-' + nodeId).style.outline = '';
      connectFrom = null;
      document.getElementById('connect-hint').textContent = 'Klik op stap A…';
      return;
    }
    // Check duplicate
    const exists = p.edges.find(e => e.from === connectFrom && e.to === nodeId);
    if (!exists) {
      p.edges.push({ from: connectFrom, to: nodeId, label: '' });
      saveProcesses();
    }
    document.getElementById('cn-' + connectFrom).style.outline = '';
    connectFrom = null;
    toggleConnectMode();
    renderCanvas();
    if (selectedNodeId) showNodeDetail(selectedNodeId);
  }
}

// ── Def search picker ─────────────────────────────────────────────
function rebuildDefPicker() {
  // Nothing to pre-build — search is live
  filterDefPicker('');
}

function filterDefPicker(q) {
  const resultsEl = document.getElementById('nd-def-results');
  if (!resultsEl) return;
  const term = q.trim().toLowerCase();

  // Get already-linked defs for current node
  const p = currentProc();
  const n = p && selectedNodeId ? p.nodes.find(x => x.id === selectedNodeId) : null;
  const linked = n ? (n.defs || []) : [];

  const filtered = entries.filter(e => {
    if (!term) return true;
    return (e.id + ' ' + e.term).toLowerCase().includes(term);
  }).slice(0, 20); // cap at 20 results

  if (!term && filtered.length === 0) {
    resultsEl.style.display = 'none';
    return;
  }

  resultsEl.style.display = 'block';

  if (filtered.length === 0) {
    resultsEl.innerHTML = '<div class="def-result-empty">Geen definities gevonden</div>';
    return;
  }

  resultsEl.innerHTML = filtered.map(e => {
    const label = e.id + ' ' + e.term;
    const alreadyLinked = linked.includes(label);
    return `<div class="def-result-item${alreadyLinked ? '" style="opacity:.45;pointer-events:none;' : '"'} onclick="linkDef('${escHtml(label).replace(/'/g,"\\'")}');document.getElementById('nd-def-search').value='';document.getElementById('nd-def-results').style.display='none';">
      <span class="def-id">${e.id}</span>${escHtml(e.term)}${alreadyLinked ? ' ✓' : ''}
    </div>`;
  }).join('');
}

// Hide results when clicking outside
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('nd-def-results');
  const inp  = document.getElementById('nd-def-search');
  if (wrap && inp && !wrap.contains(e.target) && e.target !== inp) {
    wrap.style.display = 'none';
  }
});


function linkDef(val) {
  if (!val || !selectedNodeId) return;
  const p = currentProc(); if (!p) return;
  const n = p.nodes.find(x => x.id === selectedNodeId); if (!n) return;
  if (!n.defs) n.defs = [];
  const label = val.split(' ').slice(0,1)[0] + ' ' + val.split(' ').slice(1).join(' ');
  if (!n.defs.includes(label)) n.defs.push(label);
  saveProcesses();
  renderLinkedDefs(n);
  renderCanvas();
}

function unlinkDef(nodeId, def) {
  const p = currentProc(); if (!p) return;
  const n = p.nodes.find(x => x.id === nodeId); if (!n) return;
  n.defs = (n.defs||[]).filter(d => d !== def);
  saveProcesses();
  renderLinkedDefs(n);
  renderCanvas();
}

// ── Datavelden ────────────────────────────────────────────────────
const DV_KEY = 'medemblik_datavelden_v9';
let dvEntries = [];
let currentDvId = null;
let dvIsNew = false;

// ── Default data from Pdc_Orders ──────────────────────────────────
const DV_DEFAULT = [
  {
    "id": "DF-001",
    "name": "Datum Bestelling",
    "desc": "Besteldatum van de productbestelling door de cliënt.",
    "type": "datetime",
    "src": "Pdc_Orders",
    "col": "orderDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-002",
    "name": "deliveryDateStart",
    "desc": "Start van de leveringsdatum van de productbestelling.",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "deliveryDateStart",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-003",
    "name": "deliveryDateEnd",
    "desc": "Einddatum van de levering van de productbestelling.",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "deliveryDateEnd",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-004",
    "name": "orderStatus",
    "desc": "Status van de productbestelling.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "orderStatus",
    "values": "CANCELLED — Geannuleerd\nWITHDRAWN — Ingetrokken\nWAIT_FOR_DELIVERY — Wacht op levering\nIN_DELIVERY — In levering\nDELIVERED — Geleverd\nWAIT_FOR_APPROVAL — Wacht op goedkeuring\nQUEUED — In wachtrij\nONHOLD — On hold\nAPPROVAL_DENIED — Goedkeuring geweigerd\nTEMPORARY_STOP — Tijdelijk gestopt\nCLOSED_DOWN — Gesloten",
    "ext": false
  },
  {
    "id": "DF-005",
    "name": "changeReason",
    "desc": "Reden van de wijziging van de bestelling.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "changeReason",
    "values": "CLIENT_DISEASED — Cliënt overleden\nCONTRACT_CHANGE — Contract gewijzigd\nCORRECTION — Correctie\nEXTENDED — Verlengd\nNEGATIVE_INDICATION — Negatief indicatiebesluit\nREINDICATION — Herindicatie\nTRANSFER — Overplaatsing\nOUTFLOW — Uitstroom\nRELOCATED — Verplaatst",
    "ext": false
  },
  {
    "id": "DF-006",
    "name": "orderSoort",
    "desc": "Type bestelling: ZIN (Zorg in Natura) of PGB (Persoonsgebonden Budget).",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "orderSoort",
    "values": "ZIN — Zorg in Natura\nPGB — Persoonsgebonden Budget",
    "ext": false
  },
  {
    "id": "DF-007",
    "name": "processId",
    "desc": "Het beschikkingsnummer dat hoort bij de productbestelling.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "processId",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-008",
    "name": "processUuid",
    "desc": "Zaak UUID — technische sleutel van de zaak voor koppeling tussen Order en Zaak.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "processUuid",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-009",
    "name": "maxCost",
    "desc": "Verwacht financieel beslag van de productbestelling.",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "maxCost",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-010",
    "name": "confirmedUtilization",
    "desc": "Bevestigde uitnutting van het toegekende budget.",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "confirmedUtilization",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-011",
    "name": "remainingBudget",
    "desc": "Resterend budget na verrekening van geleverde zorg.",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "remainingBudget",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-012",
    "name": "productSpecificationTypeName",
    "desc": "Naam van de productspecificatie ten tijde van het aanmaken van de order.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "productSpecificationTypeName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-013",
    "name": "productSpecificationType",
    "desc": "Waarde van de productspecificatie (iJz, iWmo of NULL).",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "productSpecificationType",
    "values": "iJz — Jeugdzorg\niWmo — WMO\nNULL — Niet van toepassing",
    "ext": false
  },
  {
    "id": "DF-014",
    "name": "temporaryStop",
    "desc": "Datum en tijd waarop de bestelling tijdelijk is stopgezet. Wordt overschreven bij hervatting.",
    "type": "datetime",
    "src": "Pdc_Orders",
    "col": "temporaryStop",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-015",
    "name": "lastEdited",
    "desc": "Systeemdatum en tijd van de laatste bewerking aan de order.",
    "type": "datetime",
    "src": "Pdc_Orders",
    "col": "lastEdited",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-016",
    "name": "sentToCaseSystem",
    "desc": "Datum/tijd waarop de productbestelling naar MensCentraal is teruggemeld.",
    "type": "datetime",
    "src": "Pdc_Orders",
    "col": "sentToCaseSystem",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-017",
    "name": "supplier_party_name",
    "desc": "Naam van de zorgaanbieder/leverancier.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "supplier_party_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-018",
    "name": "community_party_name",
    "desc": "Gemeente waardoor de bestelling is gedaan.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "community_party_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-019",
    "name": "validationResult",
    "desc": "Validatiestatus van de bestelling: OK of INVALID.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "validationResult",
    "values": "OK — Geldig\nINVALID — Ongeldig",
    "ext": false
  },
  {
    "id": "DF-020",
    "name": "clientTransferType",
    "desc": "Resultaat van de analyse om de verantwoordelijke gemeente te bepalen conform Woonplaatsbeginsel 2022.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "clientTransferType",
    "values": "REMAINING — Blijvend\nOUTFLOW — Uitstroom\nINFLOW — Instroom\nNOT_APPLICABLE — Niet van toepassing",
    "ext": false
  },
  {
    "id": "DF-021",
    "name": "referrerType",
    "desc": "Type verwijzer die de cliënt heeft doorverwezen naar ondersteuning.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "referrerType",
    "values": "01 — Gemeente\n02 — Huisarts\n03 — Jeugdarts\n04 — Gecertificeerde instelling\n05 — Medisch specialist\n06 — Zelfverwijzer\n07 — Onbekend\n08 — Rechter/RvdK/OvJ",
    "ext": false
  },
  {
    "id": "DF-022",
    "name": "referrerName",
    "desc": "Naam van de verwijzer.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "referrerName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-023",
    "name": "volumeOrder",
    "desc": "Volume/omvang van de bestelling.",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "volumeOrder",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-024",
    "name": "adjustedMaxCost",
    "desc": "Berekende kostprijs op basis van de werkelijke doorlooptijd (start- en stopzorgmelding).",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "adjustedMaxCost",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-025",
    "name": "originalDeliveryDateStart",
    "desc": "Oorspronkelijke startdatum zoals afgegeven in de 301 toewijzing.",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "originalDeliveryDateStart",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-026",
    "name": "originalDeliveryDateEnd",
    "desc": "Oorspronkelijke einddatum zoals afgegeven in de 301 toewijzing.",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "originalDeliveryDateEnd",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-027",
    "name": "productName",
    "desc": "Productnaam zoals bekend bij het aanmaken van de order.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "productName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-028",
    "name": "externalCaseId",
    "desc": "Zaaknummer uit een extern systeem, meestal MensCentraal.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "externalCaseId",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-029",
    "name": "Meldingsdatum",
    "desc": "Datum waarop de melding bij de gemeente binnenkomt. Wordt geregistreerd bij aanvang van de zaak.",
    "type": "date",
    "src": "",
    "col": "",
    "values": "",
    "ext": true
  },
  {
    "id": "DF-031",
    "name": "process_id",
    "desc": "Zaaknummer, o.a. verwijssleutel naar ZaakOverzicht.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-032",
    "name": "processType_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. ProcessType.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-033",
    "name": "processType_code",
    "desc": "Zelfde als ProcessType.code. Wordt o.a. gebruikt in de XML uit MensCentraal die gebruikt wordt voor bijv. documentsjablonen.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processType_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-034",
    "name": "processType_name",
    "desc": "Zelfde als ProcessType.name. De naam van het zaaktype zoals getoond in MensCentraal.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processType_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-035",
    "name": "processStepType_id",
    "desc": "Verwijssleutel naar meerdere tabellen processStepType.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processStepType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-036",
    "name": "processStepType_code",
    "desc": "Zelfde als ProcessStepType.code. Wordt o.a. gebruikt in de XML uit MensCentraal die gebruikt wordt voor bijv. documentsjablonen.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processStepType_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-037",
    "name": "processStepType_name",
    "desc": "Zelfde als ProcessStepType.name. De naam van het zaaktype zoals getoond in MensCentraal.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processStepType_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-038",
    "name": "processStepType_orderNumber",
    "desc": "Volgordenummer van zaakstap",
    "type": "smallint",
    "src": "Zaakstap",
    "col": "processStepType_orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-039",
    "name": "processStep_id",
    "desc": "Verwijssleutel naar zaakStapOverzicht.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processStep_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-040",
    "name": "creationDate",
    "desc": "Aanmaakdatum van de zaakstap",
    "type": "datetime",
    "src": "Zaakstap",
    "col": "creationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-041",
    "name": "startDate",
    "desc": "Startdatum van de zaakstap",
    "type": "datetime",
    "src": "Zaakstap",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-042",
    "name": "stopDate",
    "desc": "Sluitdatum van de zaakstap",
    "type": "datetime",
    "src": "Zaakstap",
    "col": "stopDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-043",
    "name": "status",
    "desc": "Status van de zaakstap: CLOSED = gesloten ACTIVE = actief DELETED = verwijderd",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-044",
    "name": "processStep_orderNumber",
    "desc": "Volgordenummer van zaakstap",
    "type": "smallint",
    "src": "Zaakstap",
    "col": "processStep_orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-045",
    "name": "processPropertyType_id",
    "desc": "Verwijssleutel naar processPropertyType.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processPropertyType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-046",
    "name": "processPropertyType_code",
    "desc": "Zelfde als processPropertyType.code. Wordt o.a. gebruikt in de XML vanuit MensCentraal die gebruikt wordt voor bijv. documentsjablonen.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processPropertyType_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-047",
    "name": "processPropertyType_name",
    "desc": "Zelfde als processPropertyType.name. De naam van het zaaktype zoals getoond in MensCentraal.",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "processPropertyType_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-048",
    "name": "dataType",
    "desc": "Type antwoord op zaakvraag, mogelijke waarden zijn: DATE (datum) MC_USER (gebruiker) PROCESS_PROPERTY_OPTION (single/multi select) BOOLEAN (check box, true/false) TEXT (invoerveld en tekstblok)",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "dataType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-049",
    "name": "orderNumber",
    "desc": "Geeft de volgorde van de zaakvragen aan",
    "type": "smallint",
    "src": "Zaakstap",
    "col": "orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-050",
    "name": "registrationDate",
    "desc": "Datum en tijdstip waarop de zaakvraag is opgeslagen",
    "type": "datetime",
    "src": "Zaakstap",
    "col": "registrationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-051",
    "name": "registrator",
    "desc": "Gebruiker die de zaakvraag heeft opgeslagen",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "registrator",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-052",
    "name": "processPropertyOption_id",
    "desc": "Verwijssleutel naar ProcessPropertyOption.id",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processPropertyOption_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-053",
    "name": "processPropertyValue_id",
    "desc": "Uniek id voor zaakvraagantwoorden",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "processPropertyValue_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-054",
    "name": "antwoord",
    "desc": "Antwoord op de zaakvraag",
    "type": "longtext",
    "src": "Zaakstap",
    "col": "antwoord",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-055",
    "name": "antwoord_255_Ingekort",
    "desc": "Ingekort antwoord op de zaakvraag",
    "type": "varchar",
    "src": "Zaakstap",
    "col": "antwoord_255_Ingekort",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-056",
    "name": "memberId",
    "desc": "Verwijssleutel naar GmClientGroepPersoon.id. Geeft aan op welk groepslid het antwoord betrekking heeft.",
    "type": "bigint",
    "src": "Zaakstap",
    "col": "memberId",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-057",
    "name": "DeclarationID",
    "desc": "De primaire sleutel van de declaratie",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "DeclarationID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-058",
    "name": "bsn",
    "desc": "Het Burgerservicenummer, dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "bsn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-059",
    "name": "dateOfBirth",
    "desc": "Geboortedatum",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "dateOfBirth",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-060",
    "name": "disposalNr",
    "desc": "Het beschikkingsnummer",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "disposalNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-061",
    "name": "productCode",
    "desc": "Productcode",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "productCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-062",
    "name": "startDate",
    "desc": "Startdatum van de declaratie",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-063",
    "name": "endDate",
    "desc": "Einddatum van de declaratie",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-064",
    "name": "unit",
    "desc": "Eenheid",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-065",
    "name": "unitTariff",
    "desc": "Eenheid tarief",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "unitTariff",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-066",
    "name": "volume",
    "desc": "Volume",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "volume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-067",
    "name": "declaredAmount",
    "desc": "Bedrag incl. btw: Totaalbedrag",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "declaredAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-068",
    "name": "calculatedAmount",
    "desc": "Berekend bedrag",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "calculatedAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-069",
    "name": "clientName",
    "desc": "Naam van de cliënt",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "clientName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-070",
    "name": "lineId",
    "desc": "Verwijst naar een id in een EI bericht",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "lineId",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-071",
    "name": "DeclarationBatchID",
    "desc": "Het id van de declarationBatch. Verwijsleutel binnen de PDC naar DeclarationBatch.id. Wordt niet gebruikt in de MI.",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "DeclarationBatchID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-072",
    "name": "agbCode",
    "desc": "Een Algemeen GegevensBeheer-code (AGB-code) is een landelijke code waarmee de zorgaanbieder kan worden herkend. Met deze unieke code staan zorgaanbieders geregistreerd in een landelijke database. Dit systeem wordt beheerd door Vektis.",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "agbCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-073",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-074",
    "name": "InboundDate",
    "desc": "Verwerkingsdatum",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "InboundDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-075",
    "name": "declarationStart",
    "desc": "Startdatum van de declaratie",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "declarationStart",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-076",
    "name": "declarationEnd",
    "desc": "Einddatum van de declaratie",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "declarationEnd",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-077",
    "name": "invoiceNumber",
    "desc": "Factuurnummer",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "invoiceNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-078",
    "name": "created",
    "desc": "Aanmaakdatum van de factuur",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "created",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-079",
    "name": "deleted",
    "desc": "Verwijderingsdatum van de factuur",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "deleted",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-080",
    "name": "status",
    "desc": "Kan zijn: ●       UNKNOWN ●       ACCEPTED ●       REJECTED ●       PENDING Is op declaratie niveau",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-081",
    "name": "lastModifiedDate",
    "desc": "Laatste aanpassingsdatum",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "lastModifiedDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-082",
    "name": "lastModifiedBy",
    "desc": "Door wie de laatste aanpassing is gedaan",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "lastModifiedBy",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-083",
    "name": "transactionType",
    "desc": "Kan zijn D (Debet) of C (Credit)",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "transactionType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-084",
    "name": "referenceOfThisDeclaration",
    "desc": "Het referentienummer",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "referenceOfThisDeclaration",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-085",
    "name": "referenceToRelatedPrecedingDeclaration",
    "desc": "Uniek referentienummer dat de zorgverlener heeft toegekend aan deze declaratie voor (een deel van) de prestatie",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "referenceToRelatedPrecedingDeclaration",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-086",
    "name": "type",
    "desc": "Het type declaratiebericht",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "type",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-087",
    "name": "productCategoryCode",
    "desc": "Gecodeerde aanduiding van een (reeks van) productcategorie(ën) in functionele termen die losgekoppeld is van een bepaalde leverancier, waarbij wordt beschreven wat de inhoud en aard van de productcategorie is in termen van hulpverlening (wonen, zo...",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "productCategoryCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-088",
    "name": "VATPercentage",
    "desc": "Btw-percentage",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "VATPercentage",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-089",
    "name": "VATAmount",
    "desc": "Btw-bedrag",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "VATAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-090",
    "name": "VATExemption",
    "desc": "Indicatie Btw-vrijstelling (Waardebereik; 1 - Btw-vrijstelling 2 - Geen Btw-vrijstelling)",
    "type": "bit",
    "src": "Pdc_Declaration",
    "col": "VATExemption",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-091",
    "name": "VATNumber",
    "desc": "Btw-nummer",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "VATNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-092",
    "name": "invoice",
    "desc": "1= Factuur 0=declaratie",
    "type": "bit",
    "src": "Pdc_Declaration",
    "col": "invoice",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-093",
    "name": "batchLastModifiedBy",
    "desc": "Gebruiker die de laatste aanpassing heeft gedaan aan de batch",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "batchLastModifiedBy",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-094",
    "name": "batchLastModifiedDate",
    "desc": "Datum en tijd van de laatste batch wijziging",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "batchLastModifiedDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-095",
    "name": "batchStatus",
    "desc": "Dit is de status van de declaratiebatch. Deze kolom kan de volgende waarde aannemen: ●       INBOUND ●       PAYABLE ●       NOT_PAYABLE ●       SETTLED ●       TRANSFERRED Het verschil tussen PAYABLE en NOT_PAYABLE is of het totaal van de batch e...",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "batchStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-096",
    "name": "batchNetApprovedAmount",
    "desc": "Dit is het totaalbedrag aan goedgekeurde declaratieregels in de batch. Alleen gevuld voor declaraties die niet op INBOUND staan. Creditbedragen zijn negatief en debet bedragen zijn positief.",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "batchNetApprovedAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-097",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-098",
    "name": "externalOrderIdentifier",
    "desc": "Toewijzing nummer – Identificerend nummer van de opdracht om een specifiek product te leveren, zoals vastgesteld door de gemeente",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "externalOrderIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-099",
    "name": "netApprovedAmount",
    "desc": "Dat is het nettobedrag per declaratieregel dat daadwerkelijk wordt meegenomen in de PAYMENT",
    "type": "decimal",
    "src": "Pdc_Declaration",
    "col": "netApprovedAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-100",
    "name": "relatedCreditDeclaration_id",
    "desc": "Relatie tussen de volledige rekening van de debet declaratieregel en de creditregel",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "relatedCreditDeclaration_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-101",
    "name": "finalized",
    "desc": "Datum waarop het 304 of het 325 retourbericht is verzonden",
    "type": "datetime",
    "src": "Pdc_Declaration",
    "col": "finalized",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-102",
    "name": "finalizedBy",
    "desc": "Naam van de gebruiker die het retourbericht heeft aangemaakt",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "finalizedBy",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-103",
    "name": "claim_id",
    "desc": "Verwijssleutel naar pdc_Claim.id",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "claim_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-104",
    "name": "creditor_id",
    "desc": "Verwijssleutel naar pdc_Creditor.id",
    "type": "bigint",
    "src": "Pdc_Declaration",
    "col": "creditor_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-105",
    "name": "paymentPeriodicityType",
    "desc": "Geeft de periodiciteit van de betaalfrequentie van de batch aan. Keuze uit betaalregels die eenmalig, maandelijks of per kwartaal worden uitbetaald.",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "paymentPeriodicityType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-106",
    "name": "declarationBatchProcessingType",
    "desc": "De defaultwaarde is: NET_BATCH_AMOUNTSEen batch van het type: INDIVIDUAL_DECLARATIONSis aangemaakt obv betaalregels",
    "type": "varchar",
    "src": "Pdc_Declaration",
    "col": "declarationBatchProcessingType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-107",
    "name": "client_id",
    "desc": "Verwijssleutel naar pdc_Client.id",
    "type": "bigint",
    "src": "Pdc_Orders",
    "col": "client_id",
    "values": "bigint(20)",
    "ext": false
  },
  {
    "id": "DF-107",
    "name": "supplier_id",
    "desc": "Verwijssleutel naar pdc_Supplier.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "supplier_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-108",
    "name": "userAccount",
    "desc": "Gebruiker aan wie de bestelling is gekoppeld",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "userAccount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-109",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-110",
    "name": "applyClientContribution",
    "desc": "Contributie? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "Pdc_Orders",
    "col": "applyClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-111",
    "name": "activeContractAgreement_id",
    "desc": "Verwijssleutel naar pdc_ContractAgreement.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "activeContractAgreement_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-112",
    "name": "externalOrderIdentifier",
    "desc": "Dit nummer wordt door de leverancier toegevoegd en wordt gebruikt binnen het berichtenverkeer naar de gemeente",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "externalOrderIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-113",
    "name": "budget_id",
    "desc": "Verwijssleutel naar pdc_Budget.id",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "budget_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-114",
    "name": "productType_id",
    "desc": "Verwijssleutel naar pdc_ProductType.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "productType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-115",
    "name": "maxVolume",
    "desc": "Volume, berekend wanneer einddatum bekend is",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "maxVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-116",
    "name": "clientContribution_id",
    "desc": "Verwijssleutel naar ClientContribution.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "clientContribution_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-117",
    "name": "costForClientContribution",
    "desc": "(resterende) Kostprijs van de productbestelling voor kostprijsbewaking",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "costForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-118",
    "name": "startDateForClientContribution",
    "desc": "Vanaf welke datum moet de kostprijsbewaking plaatsvinden",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "startDateForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-119",
    "name": "clientContributionScheme",
    "desc": "Wijze van aanlevering via de standaard HV of iEB",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "clientContributionScheme",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-120",
    "name": "originalCostForClientContribution",
    "desc": "Kostprijs iEB op het moment dat de bestelling oorspronkelijk werd gestart. Deze wijzigt niet meer na een tariefwijziging",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "originalCostForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-121",
    "name": "originalStartDateForClientContribution",
    "desc": "Startdatum iEB op het moment dat de bestelling oorspronkelijk werd gestart. Deze wijzigt niet meer na een tariefwijziging",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "originalStartDateForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-122",
    "name": "paidOffCostAtLastContributionChange",
    "desc": "Totaal (administratief) afbetaald bedrag op het moment van de laatste tariefwijziging",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "paidOffCostAtLastContributionChange",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-123",
    "name": "dateOfLastContributionChange",
    "desc": "Datum en tijd van laatste tariefwijziging",
    "type": "datetime",
    "src": "Pdc_Orders",
    "col": "dateOfLastContributionChange",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-124",
    "name": "unitCode",
    "desc": "Code voor eenheid",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "unitCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-125",
    "name": "unit",
    "desc": "Leesbare vertaling van de unitCode",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-126",
    "name": "frequencyCode",
    "desc": "Code voor frequentie",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "frequencyCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-127",
    "name": "frequency",
    "desc": "Leesbare vertaling van de frequencyCode",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "frequency",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-128",
    "name": "freePgbBudget",
    "desc": "Gegevens uit XML (productSpecificationRawValue)",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "freePgbBudget",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-129",
    "name": "comment",
    "desc": "Toelichting voor leverancier",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "comment",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-130",
    "name": "leersaam_applyClientContribution",
    "desc": "Eigen bijdrage",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_applyClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-131",
    "name": "leersaam_publicTransportPassCost",
    "desc": "Kosten voor OV abonnement",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "leersaam_publicTransportPassCost",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-132",
    "name": "leersaam_publicTransportPassCostEscort",
    "desc": "Kosten voor OV abonnement begeleider",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "leersaam_publicTransportPassCostEscort",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-133",
    "name": "leersaam_transportationType",
    "desc": "Type vervoer (motorvoertuig, fiets)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_transportationType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-134",
    "name": "leersaam_parentIban",
    "desc": "IBAN rekeningnummer ouder",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_parentIban",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-135",
    "name": "leersaam_clientContributionSchedule",
    "desc": "Termijnen voor eigen bijdrage",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_clientContributionSchedule",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-136",
    "name": "leersaam_hasEscort",
    "desc": "Begeleider nodig? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_hasEscort",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-137",
    "name": "leersaam_pickupLocation",
    "desc": "Opstapplaats (thuis, opstapplaats)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupLocation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-138",
    "name": "leersaam_pickupStreet",
    "desc": "Straat van de opstapplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupStreet",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-139",
    "name": "leersaam_pickupHouseNumber",
    "desc": "Huisnummer van de opstapplaats",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupHouseNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-140",
    "name": "leersaam_pickupAddition",
    "desc": "Huisnummertoevoeging van de opstapplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupAddition",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-141",
    "name": "leersaam_pickupZipCode",
    "desc": "Postcode van de opstapplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupZipCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-142",
    "name": "leersaam_pickupCity",
    "desc": "Stad van de opstapplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_pickupCity",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-143",
    "name": "leersaam_dropOffStreet",
    "desc": "Straat van de afzetplaats (schoolvestiging)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_dropOffStreet",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-144",
    "name": "leersaam_dropOffHouseNumber",
    "desc": "Huisnummer van de afzetplaats",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "leersaam_dropOffHouseNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-145",
    "name": "leersaam_dropOffAddition",
    "desc": "Huisnummertoevoeging van de afzetplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_dropOffAddition",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-146",
    "name": "leersaam_dropOffZipCode",
    "desc": "Postcode van de afzetplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_dropOffZipCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-147",
    "name": "leersaam_dropOffCity",
    "desc": "Stad van de afzetplaats",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_dropOffCity",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-148",
    "name": "leersaam_kilometersPerTrip",
    "desc": "Aantal kilometers per rit",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "leersaam_kilometersPerTrip",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-149",
    "name": "leersaam_leersaam_tripsPerWeek",
    "desc": "Aantal trips per week",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "leersaam_leersaam_tripsPerWeek",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-150",
    "name": "leersaam_kilometersPerWeek",
    "desc": "Aantal kilometers per week",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "leersaam_kilometersPerWeek",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-151",
    "name": "leersaam_weeks",
    "desc": "Aantal weken",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "leersaam_weeks",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-152",
    "name": "customReference",
    "desc": "Externe referentie",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "customReference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-153",
    "name": "supplierReference",
    "desc": "Naam of nummer die als referentie door de zorgaanbieder kan worden meegegeven. De supplierReference is de leveranciersreferentie uit het CareRequestProduct van het 315 bericht",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "supplierReference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-154",
    "name": "careRequestProduct_id",
    "desc": "Het careRequestProduct_id veld is een verwijzing naar het CareRequestProduct record uit het 315 bericht",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "careRequestProduct_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-155",
    "name": "responsibleCommunity_id",
    "desc": "In de kolom responsibleCommunity_id staat een id die de verwijssleutel is naar pdc_CommunityBaseData.id. Hierin staan de gemeentecode en gemeentenaam die bij het id horen. Dit geeft weer:\n●       de 'ontvangende' gemeente die de jeugdigen krijgt overgedragen waarvoor hij vanaf 1 januari 2022 verantw",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "responsibleCommunity_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-156",
    "name": "sendPeoplesoft",
    "desc": "Indicatie of inkooporder is verzonden (UWV-stap)",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "sendPeoplesoft",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-157",
    "name": "totalAmount",
    "desc": "Totale kosten van een opleiding (UWV-stap)",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "totalAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-158",
    "name": "studentNr",
    "desc": "Studentnummer afgegeven door de opleider (UWV-stap)",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "studentNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-159",
    "name": "cohort",
    "desc": "Betreft een domeinindeling voor ordening van opleidingen (UWV-stap)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "cohort",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-160",
    "name": "reclaimPercentage",
    "desc": "Betreft een percentage van het terug te vorderen bedrag (UWV-stap)",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "reclaimPercentage",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-161",
    "name": "subsidyRound_id",
    "desc": "Verwijssleutel naar pdc_SubsidyRound.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "subsidyRound_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-162",
    "name": "address_id",
    "desc": "Verwijssleutel naar pdc_ClientAddress.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "address_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-163",
    "name": "requestDate",
    "desc": "Datum waarop de subsidieaanvraag formeel wordt ingediend (UWV-stap)",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "requestDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-164",
    "name": "adjustedMaxVolume",
    "desc": "Volume op basis van de werkelijke doorlooptijd van de productbestelling. Doorlooptijd is berekend op basis van start- en stopzorgmelding.",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "adjustedMaxVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-165",
    "name": "extraInformation",
    "desc": "Extra informatie die genoteerd is bij een bestelling",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "extraInformation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-166",
    "name": "residualCosts",
    "desc": "Restkosten in eurocenten",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "residualCosts",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-167",
    "name": "ageCategory",
    "desc": "Leeftijdscategorie scholingsactiviteit",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "ageCategory",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-168",
    "name": "educationForm",
    "desc": "Opleidingsvorm: Voltijd, Deeltijd of Duaal",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "educationForm",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-169",
    "name": "educationLevel",
    "desc": "Opleidingsniveau",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "educationLevel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-170",
    "name": "linkedCreditor_id",
    "desc": "Verwijssleutel naar pdc_Creditor.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "linkedCreditor_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-171",
    "name": "payoutTo",
    "desc": "Uitbetaling aan: formal supplier, citizen, creditor",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "payoutTo",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-172",
    "name": "ibanClient",
    "desc": "IBAN cliënt voor uitbetaling",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "ibanClient",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-173",
    "name": "accountHolder",
    "desc": "Tenaamstelling van (iban)rekening waarop de betaling wordt uitgevoerd",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "accountHolder",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-174",
    "name": "paymentReference",
    "desc": "Betaalkenmerk voor burger of crediteur",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "paymentReference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-175",
    "name": "claimMethod",
    "desc": "Op welke basis wordt er uitbetaald: one_time, receipts, monthly, quarterly",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "claimMethod",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-176",
    "name": "department",
    "desc": "De schoolnaam waar leerlingenvervoer naartoe is aangevraagd in de order",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "department",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-177",
    "name": "customChangeReason_id",
    "desc": "Verwijssleutel naar pdc_ChangeReason.idIndien een door de gemeente gedefinieerde intrekkingsreden gebruikt wordt dan wordt die in een apart veld in de Order geregistreerd.",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "customChangeReason_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-178",
    "name": "applyClientContributionAtStakeholder",
    "desc": "0 – Geen eigen bijdrage van ouder/voogd1 – Eigen bijdrage van de ouders/voogd nodig",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "applyClientContributionAtStakeholder",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-179",
    "name": "successiveClientContribution_id",
    "desc": "Verwijssleutel naar ClientContribution.idAls er nog een eigen bijdrage van de ouder/voogd loopt verwijst het veld naar de actieve ouderbijdrage.Bij de overgang van ouder naar kind wordt successiveClientContribution_id verhuisd naar clientContribution_id (de actieve) en wordt successiveClientContribu",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "successiveClientContribution_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-180",
    "name": "stakeholderForClientContribution_id",
    "desc": "Verwijssleutel naar ClientContribution.idDit veld geeft aan welke ouder/voogd de eigen bijdrage betaalt.",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "stakeholderForClientContribution_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-181",
    "name": "endDateForStakeholderContribution",
    "desc": "Datum vanaf wanneer het kind zelf moet gaan betalen",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "endDateForStakeholderContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-182",
    "name": "originalStakeholderRole",
    "desc": "Vanuit welke oorspronkelijke rol de eigen bijdrage wordt betaald",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "originalStakeholderRole",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-183",
    "name": "incomeBlock",
    "desc": "bij elke maandelijkse (of kwartaal-) betaling moet een automatische blokkade aangemaakt worden. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "incomeBlock",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-184",
    "name": "referrerCode",
    "desc": "Code verwijzer.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "referrerCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-185",
    "name": "salaryValuePercentage",
    "desc": "Het percentage van arbeidsvermogen (loonwaarde) van de cliënt, uitgedrukt als percentage van WML",
    "type": "decimal",
    "src": "Pdc_Orders",
    "col": "salaryValuePercentage",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-186",
    "name": "salaryValueStartDate",
    "desc": "Startdatum loonwaardemeting",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "salaryValueStartDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-187",
    "name": "salaryValueEndDate",
    "desc": "Einddatum loonwaardemeting",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "salaryValueEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-188",
    "name": "contractWorkingHours",
    "desc": "Aantal werkuren volgens arbeidsovereenkomst",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "contractWorkingHours",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-189",
    "name": "variableContract",
    "desc": "Is het een variabel contract ja (1) of nee (0)",
    "type": "boolean",
    "src": "Pdc_Orders",
    "col": "variableContract",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-190",
    "name": "contractStartDate",
    "desc": "Startdatum arbeidsovereenkomst",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "contractStartDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-191",
    "name": "contractEndDate",
    "desc": "Einddatum arbeidsovereenkomst",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "contractEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-192",
    "name": "branchOffice_id",
    "desc": "verwijssleutel naar pdc_BranchOffice.id",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "branchOffice_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-193",
    "name": "customEndReason_id",
    "desc": "Extra beëindigingsreden die handmatig gedefinieerd kan worden. Verwijssleutel naar ChangeReason.id",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "customEndReason_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-194",
    "name": "employeeNumber",
    "desc": "Het werknemersnummer (het nummer dat de werkgever gebruikt om de werknemer mee te identificeren)",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "employeeNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-195",
    "name": "instrumentApplicationType",
    "desc": "Dit veld geeft aan of de toewijzing een primair of secundair instrument betreft. Optioneel. Het is niet toegestaan om tegelijk meer dan 1 primair instrument te hebben voor dezelfde burger",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "instrumentApplicationType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-196",
    "name": "esfSubsidyApplies",
    "desc": "Geeft op orderniveau aan of ESF subsidie van toepassing is. Als ESF uitstond op producttype (pdc_ProductType.esfSubsidyApplies), dan wordt dit veld niet uitgevraagd en komt het op 0 te staan",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "esfSubsidyApplies",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-197",
    "name": "migrationClaimDate",
    "desc": "Als dit veld gevuld is worden er geen betaalregels gegenereerd met een datum vóór de ingevulde datum. Als dit veld leeg is, wordt de deliveryDateStart gebruikt.",
    "type": "date",
    "src": "Pdc_Orders",
    "col": "migrationClaimDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-198",
    "name": "useOriginalAgreement",
    "desc": "Bepaalt of de kostprijs berekend wordt op basis van de huidige contracten (0) of op basis van het contract waaronder de bestelling oorspronkelijk is aangemaakt. Bij maatwerkcontracten zal dit veld op 1 gezet worden.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "useOriginalAgreement",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-199",
    "name": "contractType_id",
    "desc": "Deze kolom geeft aan of er oorspronkelijk een bepaald type contract is gekozen. De klant kan zelf ContractType records aanmaken, het gedrag van maatwerkcontracten wordt gekoppeld in deze kolom.",
    "type": "int",
    "src": "Pdc_Orders",
    "col": "contractType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-200",
    "name": "toBeDestroyed",
    "desc": "Dit veld wordt op 1 gezet als de bestelling in een schedule wordt opgenomen, en wordt gebruikt als een extra check. Als de bestelling niet meer in aanmerking komt om verwijderd wordt dan wordt dit veld op 0 gezet en zal de bestelling niet daadwerkelijk verwijderd worden.",
    "type": "varchar",
    "src": "Pdc_Orders",
    "col": "toBeDestroyed",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-201",
    "name": "Id",
    "desc": "Primaire sleutel van de tabel",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "Id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-202",
    "name": "created",
    "desc": "Systeemdatum van het aanmaken van de productbestelling uit de zorgtoewijzing",
    "type": "datetime",
    "src": "Pdc_CareAllocationProduct",
    "col": "created",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-203",
    "name": "allocationDate",
    "desc": "Datum en tijdstip waarop de gemeente de Wmo ondersteuning aan cliënt toewijst en de beschikking is afgegeven",
    "type": "datetime",
    "src": "Pdc_CareAllocationProduct",
    "col": "allocationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-204",
    "name": "agbCode",
    "desc": "Code waarmee een instelling geïdentificeerd kan worden",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "agbCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-205",
    "name": "startDate",
    "desc": "De datum waarop het toegewezen product voor de eerste keer geleverd dient te worden",
    "type": "date",
    "src": "Pdc_CareAllocationProduct",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-206",
    "name": "endDate",
    "desc": "De datum waarop het toegewezen product voor de laatste keer geleverd dient te worden",
    "type": "date",
    "src": "Pdc_CareAllocationProduct",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-207",
    "name": "Date302Received",
    "desc": "Datum waarop het 302 bericht is ontvangen",
    "type": "date",
    "src": "Pdc_CareAllocationProduct",
    "col": "Date302Received",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-208",
    "name": "error",
    "desc": "Dit veld wordt gevuld als er een fout ontstaat bij het verwerken van een zorgtoewijzing",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "error",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-209",
    "name": "frequency",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in Volume, Eenheid en Frequentie",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "frequency",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-210",
    "name": "unit",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in Volume, Eenheid en Frequentie",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-211",
    "name": "volume",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in Volume, Eenheid en Frequentie",
    "type": "decimal",
    "src": "Pdc_CareAllocationProduct",
    "col": "volume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-212",
    "name": "productCode",
    "desc": "Gecodeerde aanduiding van de producten",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "productCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-213",
    "name": "productCategoryCode",
    "desc": "Gecodeerde aanduiding van de hoofdcategorieën van de producten",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "productCategoryCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-214",
    "name": "careAllocation_id",
    "desc": "Verwijssleutel naar pdc_CareAllocation.id",
    "type": "int",
    "src": "Pdc_CareAllocationProduct",
    "col": "careAllocation_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-215",
    "name": "disposalNr",
    "desc": "Identificerend nummer van een beschikking zoals vastgesteld door de gemeente",
    "type": "int",
    "src": "Pdc_CareAllocationProduct",
    "col": "disposalNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-216",
    "name": "externalOrderIdentifier",
    "desc": "Toewijzingnummer – Identificerend nummer van de opdracht om een specifiek product te leveren, zoals vastgesteld door de gemeente",
    "type": "varchar",
    "src": "Pdc_CareAllocationProduct",
    "col": "externalOrderIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-217",
    "name": "client_id",
    "desc": "Verwijssleutel naar pdc_Client.id",
    "type": "int",
    "src": "Pdc_CareAllocationProduct",
    "col": "client_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-218",
    "name": "type",
    "desc": "Type bericht met waarde:start care messagestop care messageEen bericht over het starten of stoppen van de zorg",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "type",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-219",
    "name": "disposalNr",
    "desc": "Beschikkingsnummer",
    "type": "int",
    "src": "Pdc_CareMessage",
    "col": "disposalNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-220",
    "name": "productCategoryCode",
    "desc": "Gecodeerde aanduiding van een (reeks van) productcategorie(ën) in functionele termen die losgekoppeld is van een bepaalde leverancier, waarbij wordt beschreven wat de inhoud en aard van de productcategorie is in termen van hulpverlening (wonen, zorg en welzijn).",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "productCategoryCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-221",
    "name": "productCode",
    "desc": "Code van het product",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "productCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-222",
    "name": "agbCode",
    "desc": "Een Algemeen GegevensBeheer-code (AGB-code) is een landelijke code waarmee de zorgaanbieder kan worden herkend. Met deze unieke code staan zorgaanbieders geregistreerd in een landelijke database. Dit systeem wordt beheerd door Vektis.",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "agbCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-223",
    "name": "disposalStartDate",
    "desc": "Startdatum van de beschikking",
    "type": "date",
    "src": "Pdc_CareMessage",
    "col": "disposalStartDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-224",
    "name": "startDate",
    "desc": "Startdatum van de zorg",
    "type": "date",
    "src": "Pdc_CareMessage",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-225",
    "name": "volume",
    "desc": "Volume",
    "type": "decimal",
    "src": "Pdc_CareMessage",
    "col": "volume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-226",
    "name": "unit",
    "desc": "Eenheid",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-227",
    "name": "frequency",
    "desc": "Frequentie",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "frequency",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-228",
    "name": "endDate",
    "desc": "Einddatum van de zorg",
    "type": "date",
    "src": "Pdc_CareMessage",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-229",
    "name": "reasonCode",
    "desc": "Code reden van beëindiging zorg",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "reasonCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-230",
    "name": "reasonDescription",
    "desc": "Omschrijving reden van beëindiging zorg",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "reasonDescription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-231",
    "name": "created",
    "desc": "Datum en tijd waarop het bericht is aangemaakt",
    "type": "datetime",
    "src": "Pdc_CareMessage",
    "col": "created",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-232",
    "name": "communitycode",
    "desc": "Gemeentecode (n.v.t bij gemeentespecifieke levering)",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "communitycode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-233",
    "name": "BSN",
    "desc": "Het Burgerservicenummer. Dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "BSN",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-234",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "int",
    "src": "Pdc_CareMessage",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-235",
    "name": "externalOrderIdentifier",
    "desc": "Toewijzingsnummer – Identificerend nummer van de opdracht om een specifiek product te leveren, zoals vastgesteld door de gemeente.",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "externalOrderIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-236",
    "name": "status",
    "desc": "Status van de aanlevering van het bericht:Eerste aanlevering (NEW)Gewijzigde aanlevering (UPDATED)Verwijderen aanlevering (WITHDRAWN)",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-237",
    "name": "acceptanceStatus",
    "desc": "Dit veld geeft aan of PDC het bericht heeft goedgekeurd (ACCEPTED) of afgekeurd (REJECTED). Een bericht dat REJECTED is wordt als niet ontvangen behandeld maar is wel zichtbaar in het bijbehorende beheerscherm in PDC. Bij de historische berichten en bij synthetische berichten is de status altijd ACC",
    "type": "varchar",
    "src": "Pdc_CareMessage",
    "col": "acceptanceStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-238",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "int",
    "src": "Pdc_DeliveryPeriod",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-239",
    "name": "first",
    "desc": "Is dit het eerste zorgbericht? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "Pdc_DeliveryPeriod",
    "col": "first",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-240",
    "name": "startDate",
    "desc": "Datum startzorgbericht. Als er geen startzorgbericht is, wordt deze gevuld met deliveryDateStart",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-241",
    "name": "endDate",
    "desc": "Datum stopzorgbericht. Als er geen stoptzorgbericht is, wordt deze gevuld met deliveryDateEnd",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-242",
    "name": "startDateForClientContribution",
    "desc": "De startDateForClientContribution is alleen gevuld waar er ook een eigen bijdrage van toepassing is. Dit veld is voor intern gebruik",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "startDateForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-243",
    "name": "endDateForClientContribution",
    "desc": "De endDateForClientContribution is alleen gevuld waar er ook een eigen bijdrage van toepassing is. Dit veld is voor intern gebruik",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "endDateForClientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-244",
    "name": "startCareMessage_id",
    "desc": "Verwijssleutel naar pdc_CareMessage.id",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "startCareMessage_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-245",
    "name": "temporaryStopCareMessage_id",
    "desc": "Verwijssleutel naar pdc_CareMessage.id",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "temporaryStopCareMessage_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-246",
    "name": "permanentStopCareMessage_id",
    "desc": "Verwijssleutel naar pdc_CareMessage.id",
    "type": "date",
    "src": "Pdc_DeliveryPeriod",
    "col": "permanentStopCareMessage_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-247",
    "name": "careRequest_id",
    "desc": "Verwijssleutel naar pdc.CareRequest",
    "type": "int",
    "src": "Pdc_CareRequestProduct",
    "col": "careRequest_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-248",
    "name": "disposalNr",
    "desc": "Identificerend nummer van de opdracht om ondersteuning te leveren zoals vastgesteld door de gemeente. Dit is niet noodzakelijkerwijs een officiële beschikking.",
    "type": "int",
    "src": "Pdc_CareRequestProduct",
    "col": "disposalNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-249",
    "name": "productCategoryCode",
    "desc": "Gecodeerde aanduiding van een (reeks van) productcategorie(ën) in functionele termen die losgekoppeld is van een bepaalde leverancier, waarbij wordt beschreven wat de inhoud en aard van de productcategorie is in termen van hulpverlening (wonen, zorg en welzijn).",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "productCategoryCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-250",
    "name": "productCode",
    "desc": "Code van het product",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "productCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-251",
    "name": "allocationDate",
    "desc": "Ingangsdatum van een afgegeven beschikking",
    "type": "date",
    "src": "Pdc_CareRequestProduct",
    "col": "allocationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-252",
    "name": "startDate",
    "desc": "De aangevraagde ingangsdatum van het toe te wijzen product",
    "type": "date",
    "src": "Pdc_CareRequestProduct",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-253",
    "name": "endDate",
    "desc": "De aangevraagde einddatum van het toe te wijzen product",
    "type": "date",
    "src": "Pdc_CareRequestProduct",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-254",
    "name": "volume",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in volume",
    "type": "decimal",
    "src": "Pdc_CareRequestProduct",
    "col": "volume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-255",
    "name": "unit",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in eenheid",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-256",
    "name": "frequency",
    "desc": "Aanduiding van de omvang van de te leveren of geleverde ondersteuning, uitgedrukt in frequentie",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "frequency",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-257",
    "name": "externalReferenceNumber",
    "desc": "Naam of nummer die als referentie kan worden meegegeven",
    "type": "int",
    "src": "Pdc_CareRequestProduct",
    "col": "externalReferenceNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-258",
    "name": "referrerTypeCode",
    "desc": "Gegevens over de persoon of instantie die een cliënt heeft doorverwezen naar ondersteuning. Mogelijke waarden zijn:01 Gemeente02 Huisarts03 Jeugdarts04 Gecertificeerde instelling05 Medisch specialist06 Zelfverwijzer07 Onbekend08 Rechter, Raad voor de Kinderbescherming of Officier van Justitie",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "referrerTypeCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-259",
    "name": "referrerName",
    "desc": "Naam van de verwijzer",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "referrerName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-260",
    "name": "referrerAGBCode",
    "desc": "AGB-Code verwijzer",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "referrerAGBCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-261",
    "name": "contract",
    "desc": "Indicator of de aanbieder voor de te leveren ondersteuning beroep doet op een landelijk raamcontract. Mogelijke waarden zijn true (1) of false (0)",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "contract",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-262",
    "name": "externalOrderIdentifier",
    "desc": "LDT_Nummer - Toewijzingnummer Identificerend nummer van de opdracht om een zorg - of ondersteuningsproduct te leveren, zoals vastgesteld door de gemeente",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "externalOrderIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-263",
    "name": "modificationType",
    "desc": "Type wijziging bestaande uit :NEWCHANGEDUNCHANGEDDe VOT bevat alleen NEW - NieuwProduct, een VOW bevat minimaal één CHANGED TeWijzigenProduct- of UNCHANGED -OngewijzigdProduct",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "modificationType",
    "values": "NEW — NieuwProduct",
    "ext": false
  },
  {
    "id": "DF-264",
    "name": "reasonForRequest",
    "desc": "LDT_RedenVerzoek RedenVerzoek - Reden waarom een verzoek wordt ingediend, waarden kunnen zijn:SITUATION_CHANGED - Verandering clientsituatiePLAN_CHANGED - Wijziging zorgplan",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "reasonForRequest",
    "values": "SITUATION_CHANGED — Verandering clientsituatiePLAN_CHANGED - Wijziging zorgplan",
    "ext": false
  },
  {
    "id": "DF-265",
    "name": "oldStartDate",
    "desc": "De toegewezen orders.StartDate vóór de voorgestelde wijziging (relevant bij CHANGED)",
    "type": "date",
    "src": "Pdc_CareRequestProduct",
    "col": "oldStartDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-266",
    "name": "oldEndDate",
    "desc": "De toegewezen orders.EndDate vóór de voorgestelde wijziging (relevant bij CHANGED)",
    "type": "date",
    "src": "Pdc_CareRequestProduct",
    "col": "oldEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-267",
    "name": "oldVolume",
    "desc": "De toegewezen omvang vóór de voorgestelde wijziging (relevant bij CHANGED)",
    "type": "decimal",
    "src": "Pdc_CareRequestProduct",
    "col": "oldVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-268",
    "name": "oldUnit",
    "desc": "De toegewezen omvang vóór de voorgestelde wijziging (relevant bij CHANGED)",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "oldUnit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-269",
    "name": "oldFrequency",
    "desc": "De toegewezen omvang vóór de voorgestelde wijziging (relevant bij CHANGED)",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "oldFrequency",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-270",
    "name": "approvalStatus",
    "desc": "Betreft de status van het VOT of VOW bericht bestaande uit:ACCEPTED - eindstatusREJECTED - eindstatusPENDING - onderzoekenUNKNOWN – er is nog niets over beslist",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "approvalStatus",
    "values": "ACCEPTED — eindstatusREJECTED - eindstatusPENDING - onderzoekenUNKNOWN – er is nog niets over beslist",
    "ext": false
  },
  {
    "id": "DF-271",
    "name": "detailedReturnCode319",
    "desc": "Verwijssleutel naar Pdc_CareRequest.detailedReturnCode319",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "detailedReturnCode319",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-272",
    "name": "remarks",
    "desc": "Toelichting bij VOT-AangevraagdProduct. De gebruiker in MensCentraal kan een toelichting (tekst) opvoeren bij het behandelen van het verzoek.",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "remarks",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-273",
    "name": "sent",
    "desc": "Systeemdatum van versturen van 319 bericht als reactie op VOT/VOW verwerking",
    "type": "datetime",
    "src": "Pdc_CareRequestProduct",
    "col": "sent",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-274",
    "name": "communityCode",
    "desc": "De gemeentecode die door de gebruiker is aangegeven als verantwoordelijke gemeente indien code 8 (woonplaatsbeginsel) is gekozen. (Alleen van toepassing bij Jeugd en is ook dan optioneel)",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "communityCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-275",
    "name": "userRemarks",
    "desc": "Betreft de systeemwaarschuwing vanuit de productshop van de automatische verificatie van het aangevraagde product",
    "type": "varchar",
    "src": "Pdc_CareRequestProduct",
    "col": "userRemarks",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-276",
    "name": "created",
    "desc": "Systeemdatum van de verwerking van het 301-bericht",
    "type": "datetime",
    "src": "Pdc_CareAllocation",
    "col": "created",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-277",
    "name": "reference",
    "desc": "Verwijzing naar de aanleverende applicatie, bijvoorbeeld ‘VNG-berichtenapp iWmo en iJw*’",
    "type": "varchar",
    "src": "Pdc_CareAllocation",
    "col": "reference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-278",
    "name": "source",
    "desc": "Beschikkingsnummer uit het toewijzingsbestand",
    "type": "varchar",
    "src": "Pdc_CareAllocation",
    "col": "source",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-279",
    "name": "validationResult",
    "desc": "Correct bij geen opmerkingen/ Fout bij afgekeurd door retourcode",
    "type": "int",
    "src": "Pdc_CareAllocation",
    "col": "validationResult",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-280",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_CareAllocation",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-281",
    "name": "error",
    "desc": "Het foutbericht",
    "type": "varchar",
    "src": "Pdc_CareAllocation",
    "col": "error",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-282",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_Client",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-283",
    "name": "bsn",
    "desc": "BSN van de cliënt. Dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "bsn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-284",
    "name": "birthDate",
    "desc": "Geboortedatum van de cliënt",
    "type": "date",
    "src": "Pdc_Client",
    "col": "birthDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-285",
    "name": "firstName",
    "desc": "Voornaam",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "firstName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-286",
    "name": "infix",
    "desc": "Tussenvoegsel",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "infix",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-287",
    "name": "lastName",
    "desc": "Achternaam",
    "type": "date",
    "src": "Pdc_Client",
    "col": "lastName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-288",
    "name": "fullName",
    "desc": "Volledige naam van de cliënt",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "fullName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-289",
    "name": "phoneNumber",
    "desc": "Telefoonnummer van de cliënt",
    "type": "int",
    "src": "Pdc_Client",
    "col": "phoneNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-290",
    "name": "externalClientIdentifier",
    "desc": "Klantnummer uit MensCentraal",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "externalClientIdentifier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-291",
    "name": "activeAddress_id",
    "desc": "Verwijssleutel naar pdc_ClientAddress.id.",
    "type": "int",
    "src": "Pdc_Client",
    "col": "activeAddress_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-292",
    "name": "dateOfDecease",
    "desc": "Datum van overlijden",
    "type": "date",
    "src": "Pdc_Client",
    "col": "dateOfDecease",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-293",
    "name": "movedAway",
    "desc": "Datum van binnengemeentelijke verhuizing",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "movedAway",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-294",
    "name": "gbaSubscription",
    "desc": "Referentie naar uitzetten van afnemersindicatie",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "gbaSubscription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-295",
    "name": "toBeDestroyed",
    "desc": "Dit veld wordt op 1 gezet als de klant in een schedule wordt opgenomen, en wordt gebruikt als een extra check. Als de klant niet meer in aanmerking komt om verwijderd wordt dan wordt dit veld op 0 gezet en zal de klant niet daadwerkelijk verwijderd worden.",
    "type": "varchar",
    "src": "Pdc_Client",
    "col": "toBeDestroyed",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-296",
    "name": "party_id",
    "desc": "Verwijssleutel naar pdc_Party.id",
    "type": "int",
    "src": "Pdc_Supplier",
    "col": "party_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-297",
    "name": "party_name",
    "desc": "Naam van de leverancier",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "party_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-298",
    "name": "agbCode",
    "desc": "Een Algemeen GegevensBeheer-code (AGB-code) is een landelijke code waarmee de zorgaanbieder kan worden herkend. Met deze unieke code staan zorgaanbieders geregistreerd in een landelijke database. Dit systeem wordt beheerd door Vektis.",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "agbCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-299",
    "name": "supplierType",
    "desc": "Type zorgaanbieder:\n●       PROFESSIONAL\n●       VOLUNTEER",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "supplierType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-300",
    "name": "cocNumber",
    "desc": "Kamer van Koophandel nummer",
    "type": "int",
    "src": "Pdc_Supplier",
    "col": "cocNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-301",
    "name": "workingfieldCode",
    "desc": "Code van de werkomgeving",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "workingfieldCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-302",
    "name": "workfingFieldDescription",
    "desc": "Omschrijving van de werkomgeving",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "workfingFieldDescription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-303",
    "name": "firstName",
    "desc": "Naam",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "firstName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-304",
    "name": "middleName",
    "desc": "Tussenvoegsel",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "middleName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-305",
    "name": "lastName",
    "desc": "Achternaam",
    "type": "date",
    "src": "Pdc_Supplier",
    "col": "lastName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-306",
    "name": "mobilePhone",
    "desc": "Mobiele telefoonnummer",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "mobilePhone",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-307",
    "name": "supplierDeliveryType",
    "desc": "Type aanlevering zorgaanbieder (bv ‘GGK’)",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "supplierDeliveryType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-308",
    "name": "freelance",
    "desc": "Indicatie freelance. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "freelance",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-309",
    "name": "kvkName",
    "desc": "Naam van de rechtspersoon",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "kvkName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-310",
    "name": "secondaryName",
    "desc": "Volledige naam van de leverancier",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "secondaryName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-311",
    "name": "btwNumber",
    "desc": "Btw-identificatienummer",
    "type": "int",
    "src": "Pdc_Supplier",
    "col": "btwNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-312",
    "name": "supplierSector",
    "desc": "Dit is de \"sector\" waarin de werkgever actief is. Is informatief, heeft geen impact op de werking van PDC",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "supplierSector",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-313",
    "name": "status",
    "desc": "Deze velden zijn voor 4-ogen principe op de leverancier (allerlei wijzigingen kunnen triggeren dat de status automatisch op PENDING wordt gezet)",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-314",
    "name": "createdByUser",
    "desc": "Deze velden zijn voor 4-ogen principe op de leverancier. Door welke gebruiker is de leverancier aangemaakt",
    "type": "date",
    "src": "Pdc_Supplier",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-315",
    "name": "discountWageSubsidy",
    "desc": "Dit veld geeft aan of bij de leverancier \"bandbreedte\" controle van toepassing is",
    "type": "int",
    "src": "Pdc_Supplier",
    "col": "discountWageSubsidy",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-316",
    "name": "active",
    "desc": "Dit veld geeft aan of de supplier nog actief is (1) of niet 0",
    "type": "varchar",
    "src": "Pdc_Supplier",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-317",
    "name": "contractNumber",
    "desc": "Nummer van het contract",
    "type": "int",
    "src": "Pdc_Contract",
    "col": "contractNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-318",
    "name": "endDate",
    "desc": "Einddatum van het contract",
    "type": "date",
    "src": "Pdc_Contract",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-319",
    "name": "startDate",
    "desc": "Startdatum van het contract",
    "type": "date",
    "src": "Pdc_Contract",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-320",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_Contract",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-321",
    "name": "budget",
    "desc": "Het budget van het contract",
    "type": "decimal",
    "src": "Pdc_Contract",
    "col": "budget",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-322",
    "name": "law",
    "desc": "Onder welke wet het contract valt:\n●       null (geen)\n●       IJZ (Jeugd)\n●       WMO (wet maatschappelijke ondersteuning)",
    "type": "varchar",
    "src": "Pdc_Contract",
    "col": "law",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-323",
    "name": "purchaseAgreement",
    "desc": "Kan twee waardes hebben:\n●       REGIONAL (regionaal)\n●       NATIONWIDE (landelijk)",
    "type": "varchar",
    "src": "Pdc_Contract",
    "col": "purchaseAgreement",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-324",
    "name": "type_id",
    "desc": "Verwijssleutel naar pdc_ContractType.id",
    "type": "int",
    "src": "Pdc_Contract",
    "col": "type_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-325",
    "name": "contract_id",
    "desc": "Verwijssleutel naar pdc_Contract.id",
    "type": "int",
    "src": "Pdc_ContractAgreement",
    "col": "contract_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-326",
    "name": "taxRate",
    "desc": "Kan zijn:\n●       NVT zijn (niet van toepassing)\n●       TWENTY_ONE_PRECENT (21%)\n●       null",
    "type": "decimal",
    "src": "Pdc_ContractAgreement",
    "col": "taxRate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-327",
    "name": "unit",
    "desc": "Eenheid",
    "type": "varchar",
    "src": "Pdc_ContractAgreement",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-328",
    "name": "volume",
    "desc": "Hoeveelheid",
    "type": "decimal",
    "src": "Pdc_ContractAgreement",
    "col": "volume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-329",
    "name": "productType_id",
    "desc": "Verwijssleutel naar pdc_ProductType.id",
    "type": "int",
    "src": "Pdc_ContractAgreement",
    "col": "productType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-330",
    "name": "amount",
    "desc": "Bedrag",
    "type": "decimal",
    "src": "Pdc_ContractAgreement",
    "col": "amount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-331",
    "name": "startDate",
    "desc": "Startdatum contract",
    "type": "date",
    "src": "Pdc_ContractAgreement",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-332",
    "name": "endDate",
    "desc": "Einddatum contract",
    "type": "date",
    "src": "Pdc_ContractAgreement",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-333",
    "name": "onHold",
    "desc": "Mogelijke waarden zijn:\n●       0 (bestelbaar)\n●       1 (niet bestelbaar)",
    "type": "varchar",
    "src": "Pdc_ContractAgreement",
    "col": "onHold",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-334",
    "name": "standardVolume",
    "desc": "Betreft de trajectprijs voor het producttype met bekostigingsmodel Outputgericht - Traject",
    "type": "decimal",
    "src": "Pdc_ContractAgreement",
    "col": "standardVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-335",
    "name": "status",
    "desc": "Status kan de volgende waarden aannemen:·        PENDING·        ACCEPTED·        REJECTED",
    "type": "varchar",
    "src": "Pdc_ContractAgreement",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-336",
    "name": "createdByUser",
    "desc": "Door wie is de contractafspraak gemaakt",
    "type": "date",
    "src": "Pdc_ContractAgreement",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-337",
    "name": "billingMethod",
    "desc": "De facturatieWijze. Dit kan de volgende waarden aannemen:·        INDIVIDUAL·        GROUP",
    "type": "varchar",
    "src": "Pdc_ContractAgreement",
    "col": "billingMethod",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-338",
    "name": "maxNumberOrders",
    "desc": "Wordt gebruikt om aan te geven hoeveel bestellingen er geplaatst kunnen worden voor deze prestatieafspraak",
    "type": "int",
    "src": "Pdc_ContractAgreement",
    "col": "maxNumberOrders",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-339",
    "name": "orderingEndDate",
    "desc": "Dit veld geeft aan tot op welke datum een bestelling mag worden geregistreerd op basis van deze prestatieafspraak. (Onafhankelijk van de startdatum van de bestelling).",
    "type": "date",
    "src": "Pdc_ContractAgreement",
    "col": "orderingEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-340",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "int",
    "src": "Pdc_CostPeriod",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-341",
    "name": "contractAgreement_id",
    "desc": "Verwijssleutel naar pdc_ContractAgreement.id",
    "type": "int",
    "src": "Pdc_CostPeriod",
    "col": "contractAgreement_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-342",
    "name": "calculatedCost",
    "desc": "De berekende kostprijs van de productbestelling over de geldige prestatieafspraak",
    "type": "decimal",
    "src": "Pdc_CostPeriod",
    "col": "calculatedCost",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-343",
    "name": "calculatedVolume",
    "desc": "Periode volume; betreft het aantal berekende eenheden over de betreffende kostperiode. De som van het aantal eenheden keer het tarief is de calculatedCost.",
    "type": "decimal",
    "src": "Pdc_CostPeriod",
    "col": "calculatedVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-344",
    "name": "startDate",
    "desc": "De startdatum van de kostprijsberekening over de prestatieafspraak",
    "type": "date",
    "src": "Pdc_CostPeriod",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-345",
    "name": "endDate",
    "desc": "De einddatum van de kostprijsberekening over de prestatieafspraak",
    "type": "date",
    "src": "Pdc_CostPeriod",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-346",
    "name": "reference",
    "desc": "Unieke referentie voor budget, nodig voor de informatie-uitwisseling met het SVB",
    "type": "varchar",
    "src": "Pdc_Budget",
    "col": "reference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-347",
    "name": "community_id",
    "desc": "Verwijssleutel naar de tabel pdc_Community.id",
    "type": "int",
    "src": "Pdc_Budget",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-348",
    "name": "law",
    "desc": "Gecodeerde aanduiding van de wet op basis waarvan een PGB verstrekt is:W (Wmo-HH)B (Wmo-BG)J (Jeugdwet)",
    "type": "varchar",
    "src": "Pdc_Budget",
    "col": "law",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-349",
    "name": "calendarYear",
    "desc": "Per budget is minstens één order (productbestelling) aanwezig, er mogen meerdere orders voorkomen. De begin- en eindperiode van het budget moeten in hetzelfde kalenderjaar liggen. Het budget kan dus niet over de jaargrens heen.",
    "type": "date",
    "src": "Pdc_Budget",
    "col": "calendarYear",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-350",
    "name": "lastSentDate",
    "desc": "De datum van verzending van het TKB-bericht naar het SVB",
    "type": "date",
    "src": "Pdc_Budget",
    "col": "lastSentDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-351",
    "name": "lastModifiedDate",
    "desc": "De datum waarop de laatste mutatie is doorgevoerd",
    "type": "date",
    "src": "Pdc_Budget",
    "col": "lastModifiedDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-352",
    "name": "totalSpent",
    "desc": "Totale Bestedingen: de som van de bestedingen behorende bij hetbudget dat wordt afgesloten. Bericht van de SVB naar de PGB-verstrekker. In een Budgetafsluiting (BAB) wordt (na afloop van de budgetperiode) de totale besteding op een budget doorgegeven aan de verstrekker. Het Budgetafsluiting bericht ",
    "type": "decimal",
    "src": "Pdc_Budget",
    "col": "totalSpent",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-353",
    "name": "client_id",
    "desc": "Verwijssleutel naar pdc_Client.id",
    "type": "int",
    "src": "Pdc_Budget",
    "col": "client_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-354",
    "name": "Id",
    "desc": "Primaire sleutel van de tabel",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "Id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-355",
    "name": "name",
    "desc": "Naam van het producttype",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-356",
    "name": "communityProductCode",
    "desc": "Gemeentelijke productcode",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "communityProductCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-357",
    "name": "lifecyclePhase",
    "desc": "Fase van het product:\n●       ACTIVE\n●       INACTIVE\n●       CONCEPT",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "lifecyclePhase",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-358",
    "name": "productCategory_id",
    "desc": "Verwijssleutel naar pdc_ProductCategory.id",
    "type": "int",
    "src": "Pdc_ProductType",
    "col": "productCategory_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-359",
    "name": "productCategory_name",
    "desc": "Naam van de productcategorie",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "productCategory_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-360",
    "name": "extraInformation",
    "desc": "Extra informatie",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "extraInformation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-361",
    "name": "clientContribution",
    "desc": "Betaald contributie? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "clientContribution",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-362",
    "name": "clientResidenceCode",
    "desc": "Deze code geeft aan of en wat voor huisvesting relatie er is met de eigen bijdrage. Mogelijke waardes:0 – Nee1 – Ja, Maatschappelijke opvang2 – Ja, Beschermd wonen nieuwe cliënten3 – Ja, Kortdurend verblijf overgangsrecht4 – Ja, Beschermd wonen overgangsrecht",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "clientResidenceCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-363",
    "name": "clientCollectionDate",
    "desc": "Deze code geeft aan wat voor datum wordt gebruikt voor inning (is dus niet zelf een datumveld). Mogelijke waardes:ALLOCATION_DATE – Betaling bij toewijzingSTART_DATE – Betaling bij start levering",
    "type": "date",
    "src": "Pdc_ProductType",
    "col": "clientCollectionDate",
    "values": "ALLOCATION_DATE — Betaling bij toewijzingSTART_DATE – Betaling bij start levering",
    "ext": false
  },
  {
    "id": "DF-364",
    "name": "clientCollectionType",
    "desc": "Deze code geeft aan hoe de financiële inningsgegevens bij het CAK aangeleverd moeten worden. Mogelijke waardes:1 – totale kosten, kosten per periode en aantal perioden2 – totale kosten, aantal perioden3 – totale kosten per periode4 – totale kosten",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "clientCollectionType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-365",
    "name": "deactivateStackingCheck",
    "desc": "Check op functioneel stapelen (het bestellen van producten binnen dezelfde categorie binnen dezelfde periode voor hetzelfde BSN). Bij ‘true’ staat de check uit",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "deactivateStackingCheck",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-366",
    "name": "costingSchemeType",
    "desc": "Kan de volgende waarde aannemen:\n●       EFFORT_BASED - Inspanningsgericht\n●       OUTPUT_BASED - Ouputgericht",
    "type": "decimal",
    "src": "Pdc_ProductType",
    "col": "costingSchemeType",
    "values": "EFFORT_BASED — Inspanningsgericht\nOUTPUT_BASED — Ouputgericht",
    "ext": false
  },
  {
    "id": "DF-367",
    "name": "standardVolume",
    "desc": "Vaste prijs in Euro’s bij costingSchemeType = ‘OUTPUT_BASED’",
    "type": "decimal",
    "src": "Pdc_ProductType",
    "col": "standardVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-368",
    "name": "minimumDays",
    "desc": "Minimale looptijd bij costingSchemeType = ‘OUTPUT_BASED’",
    "type": "int",
    "src": "Pdc_ProductType",
    "col": "minimumDays",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-369",
    "name": "specificity",
    "desc": "De gemeente geeft een aspecifieke of specifieke toewijzing af. Bij aspecifieke toewijzing is alleen de productcategorie gevuld.",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "specificity",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-370",
    "name": "allowsChangesToVolume",
    "desc": "Setting bij producttype om het wijzigen van volume te activeren:0 - Niet mogelijk om volume te wijzigen1 - Volume kan worden gewijzigd",
    "type": "decimal",
    "src": "Pdc_ProductType",
    "col": "allowsChangesToVolume",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-371",
    "name": "subClassificationtype",
    "desc": "Door de productspecificatie worden de velden getoond die nodig zijn voor de uitvoering van de betreffende wet of domein. We kennen de volgende waarden:NONE - Geen aanvullende specificatiesWMO - Specificaties voor uitvoering van de wet maatschappelijke ondersteuningIJZ - Specificaties voor uitvoering",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "subClassificationtype",
    "values": "NONE — Geen aanvullende specificatiesWMO - Specificaties voor uitvoering van de wet maatschappelijke ondersteuningIJZ - Specificaties voor uitvoering van de JeugdwetSPECIALIZED_TRANSPORT - Specificaties voor aangepast vervoer in het kader van de leerplichtPUBLIC_TRANSPORT - Specificaties voor openbaar vervoer in het kader van de leerplichtPRIVATE_",
    "ext": false
  },
  {
    "id": "DF-372",
    "name": "paymentToCitizen",
    "desc": "Geeft aan of een product aan de burger wordt uitbetaald. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "paymentToCitizen",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-373",
    "name": "paymentToCreditor",
    "desc": "Geeft aan of een product aan de crediteur wordt uitbetaald. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "paymentToCreditor",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-374",
    "name": "contributionGuardian",
    "desc": "Geeft aan of er voor dit product een ouder-/voogdbijdrage moet worden gebruikt. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "contributionGuardian",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-375",
    "name": "clientContributionScheme",
    "desc": "De volgende waarden zijn mogelijk:NULLHVIEBIEB_BWHet veld is verplicht als er eigen bijdrage bij het producttype geïnd moet worden",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "clientContributionScheme",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-376",
    "name": "incomeBlock",
    "desc": "Geeft aan of er, bij betaling aan burger, een inkomensspecificatie verplicht is. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "incomeBlock",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-377",
    "name": "minimumHoursPerWeek",
    "desc": "Minimaal aantal gewerkte uren per week als eis voor het subsidieproduct",
    "type": "int",
    "src": "Pdc_ProductType",
    "col": "minimumHoursPerWeek",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-378",
    "name": "normHoursPerWeek",
    "desc": "Het normaantal gewerkte uren per week per subsidieproduct",
    "type": "int",
    "src": "Pdc_ProductType",
    "col": "normHoursPerWeek",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-379",
    "name": "minimumDurationContract",
    "desc": "Minimale looptijd in maanden van een arbeidsovereenkomst voor de inzet van het subsidieproject",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "minimumDurationContract",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-380",
    "name": "subsidyGoalType",
    "desc": "De code die het doel aangeeft, waarvoor de re-integratievoorziening voor de cliënt wordt ingezet. Verwijzing naar Code doel re-integratievoorziening (CdDoelRv)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "subsidyGoalType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-381",
    "name": "provisionType",
    "desc": "De code die aangeeft welke soort re-integratievoorziening voor de cliënt wordt ingezet. Verwijzing naar Code type re-integratievoorziening GSD (CdTypeRvGsd).10   Loonkostensubsidie op grond van de Participatiewet11   Forfaitaire loonkostensubsidie12   Tijdelijke loonkostensubsidie20   WIW/ID-baan21 ",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "provisionType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-382",
    "name": "individualRate",
    "desc": "Individueel tarief? Ja(1) of nee(0)",
    "type": "decimal",
    "src": "Pdc_ProductType",
    "col": "individualRate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-383",
    "name": "maximumDurationPeriodType",
    "desc": "In welke frequentie een product mag worden toegewezen:DagenWekenMaanden",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "maximumDurationPeriodType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-384",
    "name": "maximumDurationPeriodCount",
    "desc": "Maximum aantal frequenties",
    "type": "int",
    "src": "Pdc_ProductType",
    "col": "maximumDurationPeriodCount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-385",
    "name": "referenceIndexCluster",
    "desc": "Dit definieert binnen welke \"cluster\" de klant wordt aangemeld bij het GSD dossier",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "referenceIndexCluster",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-386",
    "name": "statisticsCodeType",
    "desc": "De statistiekcode identificeert de soort uitkering Waardebereik:_01  =01 - Algemene bijstand (inclusief AIO)_02  =02 - IOAW_03  =03 - IOAZ_11  =11 - Periodiek bijzondere bijstand_12  =12 - Eenmalig bijzondere bijstand_14  =14 - BBZ levensonderhoud (inclusief Tozo)_20  =20 - BBZ bedrijfscapitaal (inc",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "statisticsCodeType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-387",
    "name": "specialWelfareClusterType",
    "desc": "Cluster bijzondere bijstand Waardebereik:a = directe levensbehoeftenb = voorzieningen voor het huishoudenc = voorzieningen voor wonend = voorzieningen voor opvange = kosten uit maatschappelijke zorgf = financiële transactiesg = uitstroombevorderingh = medische dienstverleningi = overige kostensoorte",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "specialWelfareClusterType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-388",
    "name": "applyMaximumForClient",
    "desc": "Geeft aan of er een maximum aantal bestellingen per klant van toepassing is voor dit producttype",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "applyMaximumForClient",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-389",
    "name": "maximumForClient",
    "desc": "Geeft het maximum aantal bestellingen aan (dit aantal is over de volledige historie heen)",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "maximumForClient",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-390",
    "name": "inventoryManagement",
    "desc": "Geeft aan of er voorraadbeheer op het product moet worden toegepast. Voorraadbeheer betekent dat er per prestatieafspraak een bepaald maximum aantal bestellingen kan worden geplaatst",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "inventoryManagement",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-391",
    "name": "esfSubsidyApplies",
    "desc": "Geeft aan of eventueel Europese subsidie van toepassing is. Zo ja, dan wordt er een vraag getoond in de shop, waarbij het bijbehorende veld in de Orders tabel gevuld kan worden",
    "type": "varchar",
    "src": "Pdc_ProductType",
    "col": "esfSubsidyApplies",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-392",
    "name": "Id",
    "desc": "Primaire sleutel van de tabel",
    "type": "varchar",
    "src": "Pdc_ProductCategory",
    "col": "Id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-393",
    "name": "name",
    "desc": "Naam van de productcategorie",
    "type": "varchar",
    "src": "Pdc_ProductCategory",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-394",
    "name": "parentProductCategory_id",
    "desc": "Verwijssleutel naar pdc_ProductCategory.id",
    "type": "int",
    "src": "Pdc_ProductCategory",
    "col": "parentProductCategory_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-395",
    "name": "parentProductCategory_name",
    "desc": "Naam van de overkoepelende productcategorie",
    "type": "varchar",
    "src": "Pdc_ProductCategory",
    "col": "parentProductCategory_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-396",
    "name": "code",
    "desc": "Code van het product",
    "type": "varchar",
    "src": "Pdc_ProductCategory",
    "col": "code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-397",
    "name": "productMainCategory",
    "desc": "Hoofdcategorie van product",
    "type": "varchar",
    "src": "Pdc_ProductCategory",
    "col": "productMainCategory",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-398",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "int",
    "src": "Pdc_Claim",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-399",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_Claim",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-400",
    "name": "direction",
    "desc": "De geldstroom tussen schuldenaar en schuldeiser, we onderscheiden hierbij de volgende opties:ORGANISATION_TO_SUPPLIER - Betaling aan leverancier.ORGANISATION_TO_INDIVIDUAL - Betaling aan burger.ORGANISATION_TO_CREDITOR - Betaling aan crediteur.SUPPLIER_TO_ORGANISATION - Vordering bij leverancier.IND",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "direction",
    "values": "ORGANISATION_TO_SUPPLIER — Betaling aan leverancier.ORGANISATION_TO_INDIVIDUAL - Betaling aan burger.ORGANISATION_TO_CREDITOR - Betaling aan crediteur.SUPPLIER_TO_ORGANISATION - Vordering bij leverancier.INDIVIDUAL_TO_ORGANISATION - Vordering bij burger.CREDITOR_TO_ORGANISATION - Vordering bij crediteur.",
    "ext": false
  },
  {
    "id": "DF-401",
    "name": "reasonType",
    "desc": "De reden tot terugvordering (UWV-stap)",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "reasonType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-402",
    "name": "reason",
    "desc": "Leesbare omschrijving van de reden tot terugvordering (UWV-stap)",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "reason",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-403",
    "name": "status",
    "desc": "Status: of en op welke wijze de vordering is verrekend",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-404",
    "name": "otherPartyName",
    "desc": "IBAN van de partij/derde waarop de vordering betrekking heeft",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "otherPartyName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-405",
    "name": "otherPartyIban",
    "desc": "IBAN van de partij/derde waarop de vordering betrekking heeft",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "otherPartyIban",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-406",
    "name": "paymentReference",
    "desc": "IBAN van de partij/derde waarop de vordering betrekking heeft",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "paymentReference",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-407",
    "name": "disposalNr",
    "desc": "Beschikkingsnummer van het besluit tot terugvordering",
    "type": "int",
    "src": "Pdc_Claim",
    "col": "disposalNr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-408",
    "name": "originalAmount",
    "desc": "Het terug te vorderen bedrag",
    "type": "decimal",
    "src": "Pdc_Claim",
    "col": "originalAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-409",
    "name": "percentage",
    "desc": "Percentage van het terug te vorderen bedrag van productbestelling",
    "type": "decimal",
    "src": "Pdc_Claim",
    "col": "percentage",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-410",
    "name": "netAmount",
    "desc": "Het terug te vorderen bedrag",
    "type": "decimal",
    "src": "Pdc_Claim",
    "col": "netAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-411",
    "name": "completedOn",
    "desc": "Datum waarop de vordering is voldaan",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "completedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-412",
    "name": "correctionFor_id",
    "desc": "Betreft de verwijzing naar vordering voor het crediteren van een onterecht gevorderd bedrag (pdc_Claim.id)",
    "type": "int",
    "src": "Pdc_Claim",
    "col": "correctionFor_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-413",
    "name": "totalAmount",
    "desc": "Totale bedrag van de vordering",
    "type": "decimal",
    "src": "Pdc_Claim",
    "col": "totalAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-414",
    "name": "period",
    "desc": "Verwijzing naar de periodieke betaalregel van toepassing isGeduid als: JJJJ/MM en JJJJQ*",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "period",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-415",
    "name": "law",
    "desc": "Verwijzing naar domein (jeugd of wmo)",
    "type": "varchar",
    "src": "Pdc_Claim",
    "col": "law",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-416",
    "name": "startDate",
    "desc": "Begindatum vordering",
    "type": "date",
    "src": "Pdc_Claim",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-417",
    "name": "endDate",
    "desc": "Einddatum vordering",
    "type": "date",
    "src": "Pdc_Claim",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-418",
    "name": "maxAmountPerPeriod",
    "desc": "Op het plan voor het opheffen van de blokkade (verrekenen) zit een maximum bedrag per maand (of kwartaal). Als er een inhouding wordt gedaan op die bestelling, dan zal de inhouding per periode nooit meer zijn dan dit bedrag. Een soort betaalregeling.",
    "type": "decimal",
    "src": "Pdc_Claim",
    "col": "maxAmountPerPeriod",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-419",
    "name": "community_id",
    "desc": "Verwijssleutel naar pdc_Community.id",
    "type": "int",
    "src": "Pdc_ChangeReason",
    "col": "community_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-420",
    "name": "description",
    "desc": "Omschrijving van de intrekkingsreden",
    "type": "varchar",
    "src": "Pdc_ChangeReason",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-421",
    "name": "code",
    "desc": "Gemeentespecifieke code die gekoppeld is aan de omschrijving van de intrekkingsreden",
    "type": "varchar",
    "src": "Pdc_ChangeReason",
    "col": "code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-422",
    "name": "active",
    "desc": "Is deze intrekkingsreden nog actief? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "Pdc_ChangeReason",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-423",
    "name": "useableForTermination",
    "desc": "Is deze wijzigingsreden te gebruiken voor beëindiging? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ChangeReason",
    "col": "useableForTermination",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-424",
    "name": "useableForExtension",
    "desc": "Is deze wijzigingsreden te gebruiken voor verlengen? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ChangeReason",
    "col": "useableForExtension",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-425",
    "name": "useableForWithdrawl",
    "desc": "Is deze wijzigingsreden te gebruiken voor intrekken? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Pdc_ChangeReason",
    "col": "useableForWithdrawl",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-426",
    "name": "linkedClaim_id",
    "desc": "Verwijssleutel naar pdc_Claim.id",
    "type": "int",
    "src": "Pdc_Block",
    "col": "linkedClaim_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-427",
    "name": "linkedClient_id",
    "desc": "Verwijssleutel naar pdc_Client.id",
    "type": "int",
    "src": "Pdc_Block",
    "col": "linkedClient_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-428",
    "name": "blockType",
    "desc": "Soort blokkade",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "blockType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-429",
    "name": "reasonComment",
    "desc": "Tekstveld",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "reasonComment",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-430",
    "name": "manual",
    "desc": "Geeft aan of een blokkade handmatig is aangemaakt. Ja (1) of nee 0",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "manual",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-431",
    "name": "law",
    "desc": "Wet waarop de blokkade gebaseerd is",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "law",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-432",
    "name": "startDate",
    "desc": "Begindatum waarop de blokkade betrekking heeft",
    "type": "date",
    "src": "Pdc_Block",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-433",
    "name": "endDate",
    "desc": "Einddatum waarop de blokkade betrekking heeft",
    "type": "date",
    "src": "Pdc_Block",
    "col": "endDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-434",
    "name": "notificationSent",
    "desc": "Datum waarop een notificatie is verzonden naar een externe afnemer",
    "type": "date",
    "src": "Pdc_Block",
    "col": "notificationSent",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-435",
    "name": "status",
    "desc": "Status van de blokkade bestaande uit:VERIFICATIONLIFTEDACTIVE",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-436",
    "name": "createdByUser",
    "desc": "Aangemaakt door:",
    "type": "date",
    "src": "Pdc_Block",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-437",
    "name": "creationApprovedByUser",
    "desc": "Verificatie gedaan door:",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "creationApprovedByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-438",
    "name": "settlementAmount",
    "desc": "Het te verrekenen bedrag.",
    "type": "decimal",
    "src": "Pdc_Block",
    "col": "settlementAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-439",
    "name": "blockedOrderScope",
    "desc": "Geeft aan of de blokkade alleen specifieke bestellingen betreft of alle lopende bestellingen van het betreffende domein. De volgende waarden zijn mogelijk:NonSpecificAll",
    "type": "varchar",
    "src": "Pdc_Block",
    "col": "blockedOrderScope",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-440",
    "name": "block_id",
    "desc": "Verwijssleutel naar pdc_Block.id",
    "type": "int",
    "src": "Pdc_BlockOrderSettlement",
    "col": "block_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-441",
    "name": "order_id",
    "desc": "Verwijssleutel naar pdc_Orders.id",
    "type": "int",
    "src": "Pdc_BlockOrderSettlement",
    "col": "order_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-442",
    "name": "status",
    "desc": "Betreft de status van het te verrekenen bedrag van de blokkade. Bestaande uit:BLOCKEDSETTLEMENT",
    "type": "varchar",
    "src": "Pdc_BlockOrderSettlement",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-443",
    "name": "settlementAmount",
    "desc": "Hoeveel van een te veel of te weinig uitbetaald bedrag verrekend wordt met de order",
    "type": "decimal",
    "src": "Pdc_BlockOrderSettlement",
    "col": "settlementAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-444",
    "name": "resultingClaim_id",
    "desc": "Verwijssleutel naar pdc_Claim.id",
    "type": "int",
    "src": "Pdc_BlockOrderSettlement",
    "col": "resultingClaim_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-445",
    "name": "settledOutsidePdc",
    "desc": "Geeft aan of de verrekening binnen PDC plaatsvindt. Ja (1) of nee 0",
    "type": "varchar",
    "src": "Pdc_BlockOrderSettlement",
    "col": "settledOutsidePdc",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-446",
    "name": "maxAmountPerPeriod",
    "desc": "Op het plan voor het opheffen van de blokkade (verrekenen) zit een maximum bedrag per maand (of kwartaal). Als er een inhouding wordt gedaan op die bestelling, dan zal de inhouding per periode nooit meer zijn dan dit bedrag. Een soort betaalregeling. NB: dit betreft het PLAN voor verrekening. De daa",
    "type": "decimal",
    "src": "Pdc_BlockOrderSettlement",
    "col": "maxAmountPerPeriod",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-447",
    "name": "gmClientGroup_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. GmClientGroep.id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "gmClientGroup_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-448",
    "name": "gmClientGroupType_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. GmClientGroepType.id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "gmClientGroupType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-449",
    "name": "beneficiary_id",
    "desc": "Verwijssleutel naar meerdere tabellen. Iedere persoon en groep heeft een beneficiary_id. Verwijst o.a. naar GmClientGroep.beneficiary_id en persoon.beneficiary_id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "beneficiary_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-450",
    "name": "processType_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. ProcessType.id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "processType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-451",
    "name": "processType_code",
    "desc": "Code van het zaaktype. Wordt gebruikt als verwijzing in de XML die van het zaaktype gegenereerd kan worden om documentsjablonen op te baseren. Wordt ook gebruikt in de zaakservice van MC om te bepalen welk type zaak gestart of geüpdatet moet worden.",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "processType_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-452",
    "name": "processType_name",
    "desc": "Is hetzelfde als ProcessType.name, de naam van het zaaktype zoals getoond in MensCentraal",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "processType_name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-453",
    "name": "status",
    "desc": "Status van de zaak, mogelijke waarden zijn:\n●        ACTIVE (open)\n●        CLOSED (gesloten)\n●        SUSPENDED (uitgesteld)\n●        PENDING_START (in wachtrij)\n●        DELETED (logisch verwijderd)",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-454",
    "name": "creationDate",
    "desc": "Aanmaakdatum van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "creationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-455",
    "name": "startDate",
    "desc": "Systeem-startdatum van de zaak, kan afwijken van aanmaakdatum als er met de wachtrij-functionaliteit wordt gewerkt (status = NON_ACTIVE)",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-456",
    "name": "stopDate",
    "desc": "Systeem-einddatum van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "stopDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-457",
    "name": "processStartDate",
    "desc": "Functionele startdatum van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "processStartDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-458",
    "name": "processEndDate",
    "desc": "Functionele einddatum van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "processEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-459",
    "name": "expectedEndDate",
    "desc": "Verwachte einddatum van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "expectedEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-460",
    "name": "mcUser_id",
    "desc": "Verwijssleutel naar (o.a.) ZaakGebruiker.mcUser_id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "mcUser_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-461",
    "name": "processTitle",
    "desc": "Titel van de zaak",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "processTitle",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-462",
    "name": "regionProcessType_id",
    "desc": "Verwijssleutel naar regionProcessType.id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "regionProcessType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-463",
    "name": "region_organisationGroupCode",
    "desc": "Verwijssleutel naar tabel OrganisationGroup en de regio (gemeente)",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "region_organisationGroupCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-464",
    "name": "title",
    "desc": "Naam van de organisatie in Portal",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "title",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-465",
    "name": "processResult",
    "desc": "Resultaat van de zaak",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "processResult",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-466",
    "name": "processResult_id",
    "desc": "Verwijssleutel naar processResult.id",
    "type": "int",
    "src": "ZaakOverzicht",
    "col": "processResult_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-467",
    "name": "actieveZaakStap",
    "desc": "Actieve zaakstap",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "actieveZaakStap",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-468",
    "name": "resumeOn",
    "desc": "Datum van het hervatten van een uitgestelde zaak",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "resumeOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-469",
    "name": "goalScoreScale",
    "desc": "De schaal waarop de doelen van deze zaak worden gescoord: ONE_TO_FIVE, ONE_TO_TEN, ONE_TO_TWENTY. Deze waarde kan op regioniveau worden aangepast, maar niet op zaakniveau.",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "goalScoreScale",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-470",
    "name": "retentionDate",
    "desc": "Het berekende bewaartermijn van de zaak",
    "type": "date",
    "src": "ZaakOverzicht",
    "col": "retentionDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-471",
    "name": "dossierUuid",
    "desc": "Het unieke nummer van het dossier waaraan de zaak verbonden is",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "dossierUuid",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-472",
    "name": "urgent",
    "desc": "Is de zaak aangemerkt als urgent in Regiesysteem ja(1) of nee(0)",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "urgent",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-473",
    "name": "destroyCode",
    "desc": "Vernietigingscode gekoppeld aan zaak",
    "type": "varchar",
    "src": "ZaakOverzicht",
    "col": "destroyCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-474",
    "name": "creationDate",
    "desc": "Aanmaakdatum van de zaakstap",
    "type": "date",
    "src": "ZaakStapOverzicht",
    "col": "creationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-475",
    "name": "startDate",
    "desc": "Startdatum van de zaakstap",
    "type": "date",
    "src": "ZaakStapOverzicht",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-476",
    "name": "stopDate",
    "desc": "Sluitdatum van de zaakstap",
    "type": "date",
    "src": "ZaakStapOverzicht",
    "col": "stopDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-477",
    "name": "description",
    "desc": "Toelichting bij de zaakstap",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-478",
    "name": "status",
    "desc": "Status van de zaakstap:\nCLOSED = gesloten\nACTIVE = actief\nDELETED = verwijderd",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-479",
    "name": "orderNumber",
    "desc": "Volgnummer van de zaakstap binnen de zaak",
    "type": "int",
    "src": "ZaakStapOverzicht",
    "col": "orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-480",
    "name": "processStepType_id",
    "desc": "Verwijssleutel naar processStepType.id",
    "type": "int",
    "src": "ZaakStapOverzicht",
    "col": "processStepType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-481",
    "name": "zaakstap",
    "desc": "Naam van de zaakstap",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "zaakstap",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-482",
    "name": "zaak_id",
    "desc": "Verwijssleutel naar ZaakOverzicht.id",
    "type": "int",
    "src": "ZaakStapOverzicht",
    "col": "zaak_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-483",
    "name": "zaakstapUitv_gebr",
    "desc": "Uitvoerende gebruiker van de zaakstap",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "zaakstapUitv_gebr",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-484",
    "name": "zaakstapUitv_org",
    "desc": "Uitvoerende organisatie van de zaakstap",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "zaakstapUitv_org",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-485",
    "name": "stepResult",
    "desc": "Een stap kan een resultaat hebben. Dit resultaat wordt gebruikt om vervolgstappen te bepalen en/of voorinvulling voor het eindresultaat van de zaak zelf.",
    "type": "varchar",
    "src": "ZaakStapOverzicht",
    "col": "stepResult",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-486",
    "name": "startDate",
    "desc": "Ingangsdatum van de termijn (kan de startdatum van de zaak of startdatum van de stap zijn, afhankelijk van beheer inrichting)",
    "type": "date",
    "src": "Term",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-487",
    "name": "amount",
    "desc": "Aantal (TermUnit geeft de eenheid aan voor dit veld)",
    "type": "decimal",
    "src": "Term",
    "col": "amount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-488",
    "name": "unit",
    "desc": "Kan de volgende waarden aannemen:\n●        DAYS\n●        WEEKS\n●        MONTHS",
    "type": "varchar",
    "src": "Term",
    "col": "unit",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-489",
    "name": "experationDate",
    "desc": "Verloopdatum van de termijn",
    "type": "date",
    "src": "Term",
    "col": "experationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-490",
    "name": "postponable",
    "desc": "Als de beheerder bij die stap toestemming heeft gegeven om de termijn te verlengen, kan de gebruiker de verloopdatum wijzigen.\n1: termijn kan verlengd worden.\n0: termijn kan niet verlengd worden.",
    "type": "varchar",
    "src": "Term",
    "col": "postponable",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-491",
    "name": "processStep_id",
    "desc": "Verwijssleutel naar ZaakStapOverzicht.id",
    "type": "int",
    "src": "Term",
    "col": "processStep_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-492",
    "name": "status",
    "desc": "De status van de termijn. Kan de volgende waarden aannemen:\nCOMPLETED\nPENDING",
    "type": "varchar",
    "src": "Term",
    "col": "status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-493",
    "name": "beneficiary_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. GmClientGroep.benficiary_id",
    "type": "int",
    "src": "Plan",
    "col": "beneficiary_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-494",
    "name": "activatedOn",
    "desc": "Datum waarop het plan is geactiveerd",
    "type": "varchar",
    "src": "Plan",
    "col": "activatedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-495",
    "name": "planResult",
    "desc": "Resultaat van het plan:\n●        SUCCESS\n●        CANCELLED\n●        PARTLY_SUCCESSFUL\n●        UNSUCCESSFUL\n●        UNKNOWN",
    "type": "int",
    "src": "Plan",
    "col": "planResult",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-496",
    "name": "finalizedOn",
    "desc": "Afsluitdatum van het plan",
    "type": "date",
    "src": "Plan",
    "col": "finalizedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-497",
    "name": "finalizedBy",
    "desc": "Persoon/Account door wie het plan is afgesloten",
    "type": "date",
    "src": "Plan",
    "col": "finalizedBy",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-498",
    "name": "process_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. ZaakOverzicht.id",
    "type": "int",
    "src": "Plan",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-499",
    "name": "progressStatus",
    "desc": "Status van het plan:\n●        EXECUTION\n●        FINALIZED\n●        CONCEPT",
    "type": "varchar",
    "src": "Plan",
    "col": "progressStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-500",
    "name": "reasonClosed",
    "desc": "Afsluitreden van het plan",
    "type": "varchar",
    "src": "Plan",
    "col": "reasonClosed",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-501",
    "name": "Id",
    "desc": "Primaire sleutel van de tabel",
    "type": "varchar",
    "src": "Disposition",
    "col": "Id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-502",
    "name": "number",
    "desc": "Beschikkingsnummer",
    "type": "int",
    "src": "Disposition",
    "col": "number",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-503",
    "name": "kind",
    "desc": "Soort beschikking. Mogelijk waarden:\n●       DISPOSITION\n●       INDICATION",
    "type": "varchar",
    "src": "Disposition",
    "col": "kind",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-504",
    "name": "issueDate",
    "desc": "Datum van uitgave",
    "type": "date",
    "src": "Disposition",
    "col": "issueDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-505",
    "name": "process_id",
    "desc": "Zaaknummer. Verwijssleutel naar meerdere tabellen, o.a. ZaakOverzicht.id",
    "type": "int",
    "src": "Disposition",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-506",
    "name": "step_id",
    "desc": "Zaakstap id waarin de beschikking is gemaakt. Verwijssleutel naar ZaakStapOverzicht.id",
    "type": "int",
    "src": "Disposition",
    "col": "step_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-507",
    "name": "stakeholder_id",
    "desc": "Id van de belanghebbende. Verwijssleutel binnen MC naar StakeHolder.id. Wordt niet gebruikt in de MI.",
    "type": "int",
    "src": "Disposition",
    "col": "stakeholder_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-508",
    "name": "stakeholder_naam",
    "desc": "Naam van de belanghebbende",
    "type": "varchar",
    "src": "Disposition",
    "col": "stakeholder_naam",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-509",
    "name": "objectionDeadline",
    "desc": "Einddatum voor het indienen van een bezwaar van een beschikking",
    "type": "varchar",
    "src": "Disposition",
    "col": "objectionDeadline",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-510",
    "name": "regionProcessType_id",
    "desc": "Verwijssleutel naar RegionProcessType.id",
    "type": "int",
    "src": "ProcessResult",
    "col": "regionProcessType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-511",
    "name": "processResult",
    "desc": "Geconfigureerde zaakresultaat",
    "type": "varchar",
    "src": "ProcessResult",
    "col": "processResult",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-512",
    "name": "retentionPeriod",
    "desc": "Geeft de waarde van de bewaartermijn van het zaaktype weer.",
    "type": "varchar",
    "src": "ProcessResult",
    "col": "retentionPeriod",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-513",
    "name": "retentionType",
    "desc": "Geeft de eenheid (MAAND/ JAAR) van de bewaartermijn van het zaaktype weer",
    "type": "varchar",
    "src": "ProcessResult",
    "col": "retentionType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-514",
    "name": "destroyCode",
    "desc": "Vernietigingscode gekoppeld aan zaakresultaat",
    "type": "varchar",
    "src": "ProcessResult",
    "col": "destroyCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-515",
    "name": "code",
    "desc": "Code die in de XML vanuit MensCentraal gebruikt wordt voor bijv. documentsjablonen",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-516",
    "name": "name",
    "desc": "De naam van de zaakstap",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-517",
    "name": "description",
    "desc": "Beschrijving van de zaakstap",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-518",
    "name": "active",
    "desc": "Is de zaakstap actief? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "ProcessStepType",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-519",
    "name": "executionType",
    "desc": "Kan de volgende waarden bevatten:\n●        INTERROGATION (standaard)\n●        PLAN (heeft plan module)\n●        UPLOAD_PROCESS_DOCUMENTS (heeft corsa koppeling)\n●        DISPOSITION: Zaakstap om een beschikking met beschikkingsnummer af te kunnen geven.\n●        ASSESS_PROPOSAL: Zaakstap om een voor",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "executionType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-520",
    "name": "orderNumber",
    "desc": "Volgordenummer van de zaakstap.",
    "type": "int",
    "src": "ProcessStepType",
    "col": "orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-521",
    "name": "processType_id",
    "desc": "Verwijssleutel naar processType.id: aan welk zaaktype de zaakstap is gekoppeld",
    "type": "int",
    "src": "ProcessStepType",
    "col": "processType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-522",
    "name": "useTerm",
    "desc": "Maakt dit zaakstaptype gebruik van een voor-gedefinieerde termijn? Kan waarde MANUAL of AUTOMATIC hebben",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "useTerm",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-523",
    "name": "termAmount",
    "desc": "Aantal eenheden van de termijn",
    "type": "decimal",
    "src": "ProcessStepType",
    "col": "termAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-524",
    "name": "termStart",
    "desc": "Hier wordt aangegeven of de termijn ingaat vanaf de startdatum van de zaak (PROCESS_START_DATE) of vanaf de startdatum van de zaakstap zelf (ACTIVE_STEP_START_DATE).",
    "type": "date",
    "src": "ProcessStepType",
    "col": "termStart",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-525",
    "name": "termPostponable",
    "desc": "Mag de termijn verlengd worden voor stappen van dit zaakstaptype? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ProcessStepType",
    "col": "termPostponable",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-526",
    "name": "code",
    "desc": "Code die in de XML vanuit MensCentraal gebruikt wordt voor bijv. documentsjablonen",
    "type": "varchar",
    "src": "ProcessType",
    "col": "code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-527",
    "name": "name",
    "desc": "Naam van het zaaktype",
    "type": "varchar",
    "src": "ProcessType",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-528",
    "name": "description",
    "desc": "Beschrijving van het zaaktype",
    "type": "varchar",
    "src": "ProcessType",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-529",
    "name": "autoStartConfigurable",
    "desc": "Geeft aan of de zaak automatisch of handmatig gestart mag worden.\n1: De zaak kan alleen automatisch gestart worden vanuit bijvoorbeeld een e-formulier\n0: De zaak mag voor het ingestelde type begunstigde worden aangemaakt vanuit de klant/groepspagina",
    "type": "date",
    "src": "ProcessType",
    "col": "autoStartConfigurable",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-530",
    "name": "region_organisationGroupCode",
    "desc": "Verwijssleutel naar tabel OrganisationGroup en de regio (gemeente).",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "region_organisationGroupCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-531",
    "name": "processType_id",
    "desc": "Verwijssleutel naar ProcessType.id",
    "type": "int",
    "src": "RegionProcessType",
    "col": "processType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-532",
    "name": "defaultProcessOwner_id",
    "desc": "De standaard zaakcoördinator die wordt ingevuld bij een handmatig of een van buiten MensCentraal opgestarte zaak. Verwijst naar de tabel Gebruikers.mcUser_id",
    "type": "int",
    "src": "RegionProcessType",
    "col": "defaultProcessOwner_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-533",
    "name": "beneficiaryType_id",
    "desc": "Verwijssleutel naar Beneficiary.beneficiaryType_id",
    "type": "int",
    "src": "RegionProcessType",
    "col": "beneficiaryType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-534",
    "name": "archiveable",
    "desc": "Geeft aan of documenten binnen zaken van dit type gearchiveerd kunnen worden. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "archiveable",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-535",
    "name": "code",
    "desc": "Gekoppeld bericht aan het zaaktype. Bijv. VOT, VOW, aanvragen of behandel verzoeken",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-536",
    "name": "requiresGBASubscription",
    "desc": "Geeft aan of er een GBA abbonement van toepassing is op dit zaaktype.  Voor klant(en) met dit zaaktype wordt een abonnement bij het GBA aangezet, zodat GBA mutatie-berichten ontvangen kunnen worden.",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "requiresGBASubscription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-537",
    "name": "titleLabel",
    "desc": "Label voor de zaaktitel",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "titleLabel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-538",
    "name": "titleRequired",
    "desc": "Is het opgeven van een zaaktitel verplicht? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "titleRequired",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-539",
    "name": "titleHidden",
    "desc": "Titel van de zaak verbergen? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "titleHidden",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-540",
    "name": "startDateLabel",
    "desc": "Label voor de startdatum van de zaak",
    "type": "date",
    "src": "RegionProcessType",
    "col": "startDateLabel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-541",
    "name": "expectedEndDateLabel",
    "desc": "Label voor de verwachte einddatum van de zaak",
    "type": "date",
    "src": "RegionProcessType",
    "col": "expectedEndDateLabel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-542",
    "name": "expectedEndDateRequired",
    "desc": "Is het opgeven van een verwachte einddatum voor een zaak verplicht? Ja (1) of nee (0)",
    "type": "date",
    "src": "RegionProcessType",
    "col": "expectedEndDateRequired",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-543",
    "name": "expectedEndDateHidden",
    "desc": "Verwachte einddatum verbergen? Ja (1) of nee (0)",
    "type": "date",
    "src": "RegionProcessType",
    "col": "expectedEndDateHidden",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-544",
    "name": "endDateLabel",
    "desc": "Label voor de einddatum van de zaak",
    "type": "date",
    "src": "RegionProcessType",
    "col": "endDateLabel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-545",
    "name": "resultLabel",
    "desc": "Label voor het zaakresultaat",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "resultLabel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-546",
    "name": "processTypeStatus",
    "desc": "Kan de volgende waarde aannemen:\n●        CONCEPT (concept)\n●        NON_ACTIVE (gedeactiveerd)\n●        ACTIVE (actief, vervangt de boolean true waarde van ProcessType.active)\n●        DELETED (verwijderd)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "processTypeStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-547",
    "name": "orderNumber",
    "desc": "Geeft aan in welke volgorde de zaaktypes getoond worden in het overzicht",
    "type": "int",
    "src": "RegionProcessType",
    "col": "orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-548",
    "name": "suspendable",
    "desc": "Indicatie of een zaak van dit zaaktype uitgesteld",
    "type": "date",
    "src": "RegionProcessType",
    "col": "suspendable",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-549",
    "name": "transferProducts",
    "desc": "Of er producten mogen worden overgezet",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "transferProducts",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-550",
    "name": "standaardLeefDomein",
    "desc": "Het standaard leefdomein van het zaaktype",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "standaardLeefDomein",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-551",
    "name": "dossier",
    "desc": "Moet er bij het starten van de zaak een dossier worden aangemaakt? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "dossier",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-552",
    "name": "workWithActionBasedOn",
    "desc": "Werken met acties binnen regieplan:\n●        CONCEPT_ACTION (concept producten)\n●        ACTIVE_ATION (actieve producten)\n●        BOTH (beide)\n●        NONE (niet)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "workWithActionBasedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-553",
    "name": "workWithProductsBasedOn",
    "desc": "Werken met producten binnen regieplan:\n●        CONCEPT_PRODUCT (concept producten)\n●        ACTIVE_PRODUCT(actieve producten)\n●        BOTH (beide)\n●        NONE (niet)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "workWithProductsBasedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-554",
    "name": "directionActivateProducts",
    "desc": "Activering van producten direct binnen regieplan ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "directionActivateProducts",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-555",
    "name": "directionActivateActions",
    "desc": "Activering van acties direct binnen regieplan ja (1) of nee (0)",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "directionActivateActions",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-556",
    "name": "defaultOrganisation_id",
    "desc": "De standaard organisatie die wordt ingevuld bij een handmatig of een van buiten MensCentraal opgestarte zaak. Verwijst naar de tabel Organisation.id",
    "type": "int",
    "src": "RegionProcessType",
    "col": "defaultOrganisation_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-557",
    "name": "autoOrganisationAssignment",
    "desc": "In dit veld wordt opgeslagen  of de geautoriseerde organisatie automatisch als co-owner of viewer gekoppeld moet worden aan een zaak van dit zaaktype.",
    "type": "varchar",
    "src": "RegionProcessType",
    "col": "autoOrganisationAssignment",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-558",
    "name": "mcUser_id",
    "desc": "Verwijssleutel naar (o.a.) tabel Gebruikers.mcUser_id",
    "type": "int",
    "src": "Zaakgebruiker",
    "col": "mcUser_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-559",
    "name": "userName",
    "desc": "Verwijssleutel naar (o.a.) Gebruikers.userName",
    "type": "varchar",
    "src": "Zaakgebruiker",
    "col": "userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-560",
    "name": "process_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. naar ZaakOverzicht.id",
    "type": "int",
    "src": "Zaakgebruiker",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-561",
    "name": "processRole",
    "desc": "Rol van de gebruiker",
    "type": "varchar",
    "src": "Zaakgebruiker",
    "col": "processRole",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-562",
    "name": "zaakGebruikersRol",
    "desc": "Rol van de gebruiker",
    "type": "varchar",
    "src": "Zaakgebruiker",
    "col": "zaakGebruikersRol",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-563",
    "name": "organisation_id",
    "desc": "In deze kolom staat het organisatie_id van de organisatie waaraan de zaak is toegewezen. Verwijssleutel naar tabel Organisation.id",
    "type": "int",
    "src": "Zaakgebruiker",
    "col": "organisation_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-564",
    "name": "Klant_BSN",
    "desc": "Het Burgerservicenumme. Dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "Persoon",
    "col": "Klant_BSN",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-565",
    "name": "clientID",
    "desc": "Verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "Persoon",
    "col": "clientID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-566",
    "name": "Clientnummer",
    "desc": "Elke burger heeft een uniek nummer bij haar of zijn gemeente",
    "type": "int",
    "src": "Persoon",
    "col": "Clientnummer",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-567",
    "name": "Geboortedatum",
    "desc": "Geboortedatum van de burger",
    "type": "date",
    "src": "Persoon",
    "col": "Geboortedatum",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-568",
    "name": "Geslacht",
    "desc": "Geslacht van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Geslacht",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-569",
    "name": "Email",
    "desc": "E-mail van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Email",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-570",
    "name": "Voornamen",
    "desc": "Alle voornamen van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Voornamen",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-571",
    "name": "Initialen",
    "desc": "Initialen van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Initialen",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-572",
    "name": "Tussenvoegsel",
    "desc": "Tussenvoegsel van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Tussenvoegsel",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-573",
    "name": "Achternaam",
    "desc": "Achternaam van de burger",
    "type": "varchar",
    "src": "Persoon",
    "col": "Achternaam",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-574",
    "name": "beneficiary_id",
    "desc": "Verwijssleutel naar meerdere tabellen",
    "type": "int",
    "src": "Persoon",
    "col": "beneficiary_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-575",
    "name": "deceased",
    "desc": "Indicatie of de burger overleden is. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Persoon",
    "col": "deceased",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-576",
    "name": "Gemeente",
    "desc": "Gemeente (zoals in MensCentraal) waar de persoon dienstverlening krijgt",
    "type": "varchar",
    "src": "Persoon",
    "col": "Gemeente",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-577",
    "name": "created",
    "desc": "Datum aangemaakt",
    "type": "date",
    "src": "Persoon",
    "col": "created",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-578",
    "name": "securityRisk",
    "desc": "Is de burger een veiligheidsrisico? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "Persoon",
    "col": "securityRisk",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-579",
    "name": "securityRiskComment",
    "desc": "Omschrijving van het veiligheidsrisico",
    "type": "varchar",
    "src": "Persoon",
    "col": "securityRiskComment",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-580",
    "name": "deletionDate",
    "desc": "Datum/tijd verwijderd",
    "type": "date",
    "src": "Persoon",
    "col": "deletionDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-581",
    "name": "lastUpdate",
    "desc": "Datum waarop de klant voor het laatst up-to-date is gebracht met DKD gegevens",
    "type": "date",
    "src": "Persoon",
    "col": "lastUpdate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-582",
    "name": "preferredSurname",
    "desc": "Gewenste achternaam van een persoon",
    "type": "varchar",
    "src": "Persoon",
    "col": "preferredSurname",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-583",
    "name": "goalTypeSpecification",
    "desc": "PREDEFINED = Voorgedefinieerd doel\nAD HOC = Vrij geformuleerd doel",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "goalTypeSpecification",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-584",
    "name": "comments",
    "desc": "Toelichting bij sluiten doel (niet verplicht)",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "comments",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-585",
    "name": "description",
    "desc": "Omschrijving van het doel",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-586",
    "name": "evaluationDate",
    "desc": "Einddatum van het doel",
    "type": "date",
    "src": "GmDoelstelling",
    "col": "evaluationDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-587",
    "name": "expectedEndDate",
    "desc": "Verwachte einddatum van het doel",
    "type": "date",
    "src": "GmDoelstelling",
    "col": "expectedEndDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-588",
    "name": "gmGoalResultType",
    "desc": "Resultaat van het doel:\n●        GOAL_REACHED = ‘Doel geheel behaald’\n●        GOAL_PARTIALLY_REACHED = ‘ Doel gedeeltelijk behaald’\n●        GOAL_NOT_REACHED_SITUATION_DETERIORATED = ‘Doel niet behaald, situatie verslechterd’\n●        GOAL_NOT_REACHED = ‘Doel niet behaald’\n●        GOAL_CANCELLED =",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "gmGoalResultType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-589",
    "name": "gmGoalResultDescription",
    "desc": "Zie ‘gmGoalResultType’",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "gmGoalResultDescription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-590",
    "name": "orderNumber",
    "desc": "Ordernummer",
    "type": "int",
    "src": "GmDoelstelling",
    "col": "orderNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-591",
    "name": "contactPerson_userName",
    "desc": "Gebruikersnaam van de contactpersoon. Verwijssleutel naar (o.a.) Gebruikers.userName",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "contactPerson_userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-592",
    "name": "gmGoalType_id",
    "desc": "Verwijssleutel naar GmDoelType.gmGoalType_id",
    "type": "int",
    "src": "GmDoelstelling",
    "col": "gmGoalType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-593",
    "name": "startDate",
    "desc": "Startdatum",
    "type": "date",
    "src": "GmDoelstelling",
    "col": "startDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-594",
    "name": "freeText",
    "desc": "Toelichting bij aanmaken doel (niet verplicht)",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "freeText",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-595",
    "name": "alertCode",
    "desc": "Prioriteit:\n●        LOW = ‘Laag’\n●        MIDDLE = ‘midden’\n●        HIGH = ‘Hoog’",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "alertCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-596",
    "name": "createdBy_userName",
    "desc": "Aangemaakt door (gebruiker). Verwijssleutel naar Gebruikers.userName",
    "type": "date",
    "src": "GmDoelstelling",
    "col": "createdBy_userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-597",
    "name": "closedBy_userName",
    "desc": "Gesloten door (gebruiker). Verwijssleutel naar Gebruikers.userName",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "closedBy_userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-598",
    "name": "closedOn",
    "desc": "Datum sluiten doel",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "closedOn",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-599",
    "name": "plan_id",
    "desc": "Verwijssleutel naar Plan.id",
    "type": "int",
    "src": "GmDoelstelling",
    "col": "plan_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-600",
    "name": "progressStatus",
    "desc": "Status van het doel: CONCEPT, FINALIZED of EXECUTION",
    "type": "varchar",
    "src": "GmDoelstelling",
    "col": "progressStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-601",
    "name": "gmClientGroupMember_id",
    "desc": "Groepslid aan wie het doel eventueel gekoppeld is. Verwijssleutel naar GmClientGroepPersoon.id",
    "type": "int",
    "src": "GmDoelstelling",
    "col": "gmClientGroupMember_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-602",
    "name": "clientGroupConcern",
    "desc": "Code van het leefgebied",
    "type": "varchar",
    "src": "GmLeefgebied",
    "col": "clientGroupConcern",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-603",
    "name": "description",
    "desc": "Omschrijving van het leefgebied",
    "type": "varchar",
    "src": "GmLeefgebied",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-604",
    "name": "sortID",
    "desc": "Volgordenummer van het leefgebied (zoals weergegeven in de applicatie MensCentraal)",
    "type": "varchar",
    "src": "GmLeefgebied",
    "col": "sortID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-605",
    "name": "standardized",
    "desc": "Is het leefgebied generiek? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "GmLeefgebied",
    "col": "standardized",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-606",
    "name": "Regio",
    "desc": "Regio",
    "type": "varchar",
    "src": "GmLeefgebied",
    "col": "Regio",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-607",
    "name": "beneficiary_id",
    "desc": "Verwijssleutel naar Beneficiary.id",
    "type": "int",
    "src": "GmClientGroep",
    "col": "beneficiary_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-608",
    "name": "active",
    "desc": "Actief? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "GmClientGroep",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-609",
    "name": "creationdate",
    "desc": "Aanmaakdatum van de groep",
    "type": "date",
    "src": "GmClientGroep",
    "col": "creationdate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-610",
    "name": "name",
    "desc": "Naam van de groep",
    "type": "varchar",
    "src": "GmClientGroep",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-611",
    "name": "ClientGroupType_id",
    "desc": "Verwijssleutel naar GmClientGroepType.id",
    "type": "int",
    "src": "GmClientGroep",
    "col": "ClientGroupType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-612",
    "name": "client_clientID",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. persoon.clientID.",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "client_clientID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-613",
    "name": "primaryAlternateID",
    "desc": "Het Burgerservicenummer (BSN), dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "primaryAlternateID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-614",
    "name": "gmAnonymousClient_id",
    "desc": "Verwijssleutel naar GmAnonymousClient.id",
    "type": "int",
    "src": "GmClientGroepPersoon",
    "col": "gmAnonymousClient_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-615",
    "name": "gmClientGroup_id",
    "desc": "Verwijssleutel naar GmClientGroep.id",
    "type": "int",
    "src": "GmClientGroepPersoon",
    "col": "gmClientGroup_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-616",
    "name": "gmClientGroupRole_id",
    "desc": "Verwijssleutel in MensCentraal naar GmClientGroupRole.id. Wordt niet gebruikt binnen de MI.",
    "type": "int",
    "src": "GmClientGroepPersoon",
    "col": "gmClientGroupRole_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-617",
    "name": "groupRole",
    "desc": "De groepsrol van de persoon. Wordt gebruikt in de XML vanuit MensCentraal die gebruikt wordt voor bijv. documentsjablonen.",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "groupRole",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-618",
    "name": "groupRoleDescription",
    "desc": "De groepsrol van de persoon",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "groupRoleDescription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-619",
    "name": "gmMaritalStatus_id",
    "desc": "Verwijssleutel in MensCentraal naar gmMaritalStatus.id, wordt niet gebruikt binnen de MI.",
    "type": "int",
    "src": "GmClientGroepPersoon",
    "col": "gmMaritalStatus_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-620",
    "name": "maritalStatus",
    "desc": "Burgerlijke staat van groepslid, wordt ook gebruikt om de woonstatus aan te geven. Wordt gebruikt in de XML vanuit MensCentraal die gebruikt wordt voor bijv. documentsjablonen.",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "maritalStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-621",
    "name": "maritalStatusdescription",
    "desc": "Burgerlijke staat van groepslid, wordt ook gebruikt om de woonstatus aan te geven. (omschrijving voor de gebruiker)",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "maritalStatusdescription",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-622",
    "name": "district_id",
    "desc": "Verwijssleutel in MensCentraal naar District.id. Wordt niet gebruikt binnen de MI.",
    "type": "int",
    "src": "GmClientGroepPersoon",
    "col": "district_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-623",
    "name": "district",
    "desc": "De woonplaats van het groepslid",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "district",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-624",
    "name": "characteristic",
    "desc": "Eigenschap van groepslid, ingevoerd door gebruiker in MensCentraal",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "characteristic",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-625",
    "name": "moreInfo",
    "desc": "Eigenschap van/meer informatie over het groepslid, ingevoerd door gebruiker in MensCentraal.",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "moreInfo",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-626",
    "name": "partner",
    "desc": "Heeft het groepslid een partner? Kan Yes of No zijn",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "partner",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-627",
    "name": "aanvrager",
    "desc": "Is aanvrager van dienstverlening? 1= ja of 0= nee",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "aanvrager",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-628",
    "name": "gmMemberStatus",
    "desc": "Status van het groepslid, kan zijn: CONNECTED of DISCONNECTED (functionele ontkoppeling van groepslid)",
    "type": "varchar",
    "src": "GmClientGroepPersoon",
    "col": "gmMemberStatus",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-629",
    "name": "gmClientGroup_id",
    "desc": "Verwijssleutel naar GmClientGroep.id",
    "type": "int",
    "src": "GmContactMoment",
    "col": "gmClientGroup_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-630",
    "name": "registrator_userName",
    "desc": "De gebruiker die het contactmoment heeft geregistreerd. Verwijssleutel naar (o.a.) Gebruikers.userName",
    "type": "varchar",
    "src": "GmContactMoment",
    "col": "registrator_userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-631",
    "name": "date",
    "desc": "De datum waarop het contact gevoerd is",
    "type": "date",
    "src": "GmContactMoment",
    "col": "date",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-632",
    "name": "description",
    "desc": "Omschrijving van het contact",
    "type": "varchar",
    "src": "GmContactMoment",
    "col": "description",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-633",
    "name": "contactType",
    "desc": "Soort contact",
    "type": "varchar",
    "src": "GmContactMoment",
    "col": "contactType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-634",
    "name": "subject",
    "desc": "Onderwerp",
    "type": "varchar",
    "src": "GmContactMoment",
    "col": "subject",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-635",
    "name": "process_id",
    "desc": "Verwijssleutel naar ZaakOverzicht.id",
    "type": "int",
    "src": "GmContactMoment",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-636",
    "name": "gmClientGroupMember_id",
    "desc": "Verwijssleutel naar gmClientGroupMember.id",
    "type": "int",
    "src": "GmContactMoment",
    "col": "gmClientGroupMember_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-637",
    "name": "region_organisationGroupCode",
    "desc": "Regio/gemeente waar het doeltype bij hoort. Verwijssleutel naar tabel OrganisationGroup",
    "type": "varchar",
    "src": "GmDoelType",
    "col": "region_organisationGroupCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-638",
    "name": "name",
    "desc": "Naam van het voor-gedefinieerde doel",
    "type": "varchar",
    "src": "GmDoelType",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-639",
    "name": "active",
    "desc": "Is het doel actief? Ja (1) of nee (0)",
    "type": "boolean",
    "src": "GmDoelType",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-640",
    "name": "gmLeefgebied_id",
    "desc": "Verwijssleutel naar GmLeefgebied.id",
    "type": "int",
    "src": "GmDoelType",
    "col": "gmLeefgebied_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-641",
    "name": "client_id",
    "desc": "Koppeling naar persoon.clientID",
    "type": "int",
    "src": "BelanghebbendenPersoon",
    "col": "client_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-642",
    "name": "BSN",
    "desc": "Het Burgerservicenummer. Dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "BSN",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-643",
    "name": "dateOfBirth",
    "desc": "Geboortedatum",
    "type": "date",
    "src": "BelanghebbendenPersoon",
    "col": "dateOfBirth",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-644",
    "name": "firstnames",
    "desc": "Alle voornamen van de persoon",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "firstnames",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-645",
    "name": "initials",
    "desc": "Initialen",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "initials",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-646",
    "name": "surnamePrefix",
    "desc": "Tussenvoegsel",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "surnamePrefix",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-647",
    "name": "surname",
    "desc": "Achternaam",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "surname",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-648",
    "name": "gender",
    "desc": "Geslacht",
    "type": "date",
    "src": "BelanghebbendenPersoon",
    "col": "gender",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-649",
    "name": "email",
    "desc": "Emailadres",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "email",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-650",
    "name": "stakeHolderRole",
    "desc": "Rol van de belanghebbende",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "stakeHolderRole",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-651",
    "name": "stakeHolderPerson_id",
    "desc": "Verwijssleutel naar GmAnoniemPersoon.person_id",
    "type": "int",
    "src": "BelanghebbendenPersoon",
    "col": "stakeHolderPerson_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-652",
    "name": "createdByUser",
    "desc": "Gebruikersnaam van creator",
    "type": "date",
    "src": "BelanghebbendenPersoon",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-653",
    "name": "active",
    "desc": "0 = verwijderd door gebruiker, 1 = actief",
    "type": "varchar",
    "src": "BelanghebbendenPersoon",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-654",
    "name": "address_id",
    "desc": "Verwijssleutel naar Address.id",
    "type": "int",
    "src": "BelanghebbendenPersoon",
    "col": "address_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-655",
    "name": "stakeHolderRole",
    "desc": "Rol van de belanghebbende",
    "type": "varchar",
    "src": "BelanghebbendenOrganisatie",
    "col": "stakeHolderRole",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-656",
    "name": "Persoon_clientID",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. persoon.clientID",
    "type": "varchar",
    "src": "BelanghebbendenOrganisatie",
    "col": "Persoon_clientID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-657",
    "name": "createdByUser",
    "desc": "Gebruikersnaam van creator",
    "type": "date",
    "src": "BelanghebbendenOrganisatie",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-658",
    "name": "stakeHolderInstitutionName",
    "desc": "Naam van de organisatie",
    "type": "varchar",
    "src": "BelanghebbendenOrganisatie",
    "col": "stakeHolderInstitutionName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-659",
    "name": "stakeHolderInstitutionPhoneNumber",
    "desc": "Telefoonnummer van de organisatie",
    "type": "int",
    "src": "BelanghebbendenOrganisatie",
    "col": "stakeHolderInstitutionPhoneNumber",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-660",
    "name": "kvknummer",
    "desc": "KVK-nummer van de organisatie",
    "type": "int",
    "src": "BelanghebbendenOrganisatie",
    "col": "kvknummer",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-661",
    "name": "active",
    "desc": "0 = verwijderd door gebruiker, 1 = actief",
    "type": "varchar",
    "src": "BelanghebbendenOrganisatie",
    "col": "active",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-662",
    "name": "clientID",
    "desc": "Verwijssleutel naar o.a. persoon.clientID",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "clientID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-663",
    "name": "organisation",
    "desc": "Naam van organisatie",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "organisation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-664",
    "name": "reviewDate",
    "desc": "Datum en tijd van review",
    "type": "datetime",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "reviewDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-665",
    "name": "reviewer",
    "desc": "Naam van de reviewer",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "reviewer",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-666",
    "name": "saveDate",
    "desc": "Datum en tijd bewaard",
    "type": "datetime",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "saveDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-667",
    "name": "srmAgeType0_12Years",
    "desc": "Indicator leeftijd tussen 0 en 12 jaar. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmAgeType0_12Years",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-668",
    "name": "srmAgeType12_18Years",
    "desc": "Indicator leeftijd tussen 12 en 18 jaar. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmAgeType12_18Years",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-669",
    "name": "srmAgeTypePregnant",
    "desc": "Indicator leeftijd, type zwanger. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmAgeTypePregnant",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-670",
    "name": "srmChildrenYesOrNo",
    "desc": "Indicator kinderen. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmChildrenYesOrNo",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-671",
    "name": "srmCognitiveAbility",
    "desc": "Cognitieve vaardigheden\n0 = leeg\n1 = geen belemmering\n2 = nader te onderzoeken\n3 = belemmering",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmCognitiveAbility",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-672",
    "name": "srmHealthInsurance",
    "desc": "ZiektekostenverzekeringsrmHealthInsurance\n0 = leeg\n1 = ja\n2 = in aanvraag\n3 = nee\n4 = onbekend",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmHealthInsurance",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-673",
    "name": "srmLanguageTypeNoLimitations",
    "desc": "Indicator taal, type geen limitaties. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmLanguageTypeNoLimitations",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-674",
    "name": "srmLanguageTypeRead",
    "desc": "Indicator taal, type lezen. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmLanguageTypeRead",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-675",
    "name": "srmLanguageTypeSpeak",
    "desc": "Indicator taal, type spreken. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmLanguageTypeSpeak",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-676",
    "name": "srmLanguageTypeUnderstand",
    "desc": "Indicator taal, type begrijpen. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmLanguageTypeUnderstand",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-677",
    "name": "srmLanguageTypeWrite",
    "desc": "Indicator taal, type schrijven. Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmLanguageTypeWrite",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-678",
    "name": "srmReviewType",
    "desc": "Review type",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "srmReviewType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-679",
    "name": "temporarilySaved",
    "desc": "Tijdelijk bewaard? Ja (1) of nee (0)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "temporarilySaved",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-680",
    "name": "organisation2_organisationCode",
    "desc": "Code van de organisatie",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "organisation2_organisationCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-681",
    "name": "reviewer2_userName",
    "desc": "Gebruikersnaam van de reviewer. Verwijssleutel naar (o.a.)\nGebruikers.userName",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "reviewer2_userName",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-682",
    "name": "process_id",
    "desc": "Verwijssleutel naar meerdere tabellen, o.a. naar ZaakOverzicht.id",
    "type": "int",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-683",
    "name": "gmClientGroup_id",
    "desc": "Verwijssleutel naar GmClientGroep.id",
    "type": "int",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "gmClientGroup_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-684",
    "name": "laborDispensation",
    "desc": "Arbeidsontheffing",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "laborDispensation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-685",
    "name": "transportLimitation",
    "desc": "Vervoerslimitatie",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "transportLimitation",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-686",
    "name": "transportAid",
    "desc": "Vervoersondersteuning",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrix",
    "col": "transportAid",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-687",
    "name": "srmDomainComment",
    "desc": "Vrij invoerveld voor commentaar",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "srmDomainComment",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-688",
    "name": "srmDomainHelpNeeded",
    "desc": "Hulp nodig. 0 = ja, 1 = nee, 2 = in aanvraag",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "srmDomainHelpNeeded",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-689",
    "name": "srmDomainScore",
    "desc": "Domeinscore (0 t/m 5)",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "srmDomainScore",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-690",
    "name": "zelfRedzaamheidsMatrix_id",
    "desc": "Verwijssleutel naar ZelfRedzaamheidsMatrix.id",
    "type": "int",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "zelfRedzaamheidsMatrix_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-691",
    "name": "selfRelianceMatrixDomainType",
    "desc": "Domeintype van de zelfredzaamheidsmatrix",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "selfRelianceMatrixDomainType",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-692",
    "name": "srmSpecialistSupport",
    "desc": "Ondersteuning specialist. 0 = leeg, 1 = ja, prio 1, 2= ja, prio 2, 3 = ja, prio 3, 4 = nee",
    "type": "varchar",
    "src": "ZelfRedzaamheidsMatrixScore",
    "col": "srmSpecialistSupport",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-693",
    "name": "Signaal_ID",
    "desc": "Primaire sleutel van de tabel",
    "type": "int",
    "src": "Signaal",
    "col": "Signaal_ID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-694",
    "name": "Signaal_code",
    "desc": "Code signaal",
    "type": "varchar",
    "src": "Signaal",
    "col": "Signaal_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-695",
    "name": "Signaal",
    "desc": "Omschrijving van het signaal",
    "type": "varchar",
    "src": "Signaal",
    "col": "Signaal",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-696",
    "name": "Aanleidingsgebied",
    "desc": "Omschrijving van het aanleidingsgebied",
    "type": "varchar",
    "src": "Signaal",
    "col": "Aanleidingsgebied",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-697",
    "name": "AanleidingsgebiedCode",
    "desc": "Code van het aanleidingsgebied",
    "type": "varchar",
    "src": "Signaal",
    "col": "AanleidingsgebiedCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-698",
    "name": "Signaal_Status_code",
    "desc": "Code van de status vna het signaal",
    "type": "varchar",
    "src": "Signaal",
    "col": "Signaal_Status_code",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-699",
    "name": "Signaal_Status",
    "desc": "Omschrijving van de status van het signaal",
    "type": "varchar",
    "src": "Signaal",
    "col": "Signaal_Status",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-700",
    "name": "Klant_BSN",
    "desc": "BSN van de klant. Dit kunt u eventueel ook gebruiken als verwijssleutel naar meerdere tabellen.",
    "type": "varchar",
    "src": "Signaal",
    "col": "Klant_BSN",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-701",
    "name": "Gebruiker",
    "desc": "Gebruiker",
    "type": "varchar",
    "src": "Signaal",
    "col": "Gebruiker",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-702",
    "name": "Timestamp",
    "desc": "Datum",
    "type": "varchar",
    "src": "Signaal",
    "col": "Timestamp",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-703",
    "name": "Signal_ID",
    "desc": "",
    "type": "int",
    "src": "Signaal",
    "col": "Signal_ID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-704",
    "name": "Organisatie",
    "desc": "Omschrijving organisatie",
    "type": "varchar",
    "src": "Signaal",
    "col": "Organisatie",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-705",
    "name": "OrganisatieCode",
    "desc": "Code van de organisatie",
    "type": "varchar",
    "src": "Signaal",
    "col": "OrganisatieCode",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-706",
    "name": "GroupID",
    "desc": "Id van de groep",
    "type": "varchar",
    "src": "Signaal",
    "col": "GroupID",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-707",
    "name": "Client_id",
    "desc": "Verwijssleutel naar persoon.clientID",
    "type": "int",
    "src": "Signaal",
    "col": "Client_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-708",
    "name": "orderUuid",
    "desc": "Verwijssleutel naar pdc_Orders.uuid",
    "type": "varchar",
    "src": "PdcOrder",
    "col": "orderUuid",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-709",
    "name": "process_id",
    "desc": "Verwijssleutel naar ZaakOverzicht.id",
    "type": "int",
    "src": "PdcOrder",
    "col": "process_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-710",
    "name": "assignedTask_id",
    "desc": "Verwijssleutel naar taak_id",
    "type": "int",
    "src": "PdcOrder",
    "col": "assignedTask_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-711",
    "name": "createdByUser",
    "desc": "Aanmaker van het record",
    "type": "date",
    "src": "PdcOrder",
    "col": "createdByUser",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-712",
    "name": "doel_id",
    "desc": "Verwijssleutel naar RegieDoel",
    "type": "int",
    "src": "PdcOrder",
    "col": "doel_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-713",
    "name": "deletionDate",
    "desc": "Datum van verwijderen van de order",
    "type": "date",
    "src": "PdcOrder",
    "col": "deletionDate",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-714",
    "name": "Clientnummer",
    "desc": "Elke burger heeft een uniek nummer bij haar of zijn gemeente. Klantnummer van MC",
    "type": "int",
    "src": "PdcOrder",
    "col": "Clientnummer",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-715",
    "name": "amountToReclaim",
    "desc": "Bedrag (in euro's) dat opgevoerd kan worden bij een order. Dit is het bedrag dat uiteindelijk naar PDC verstuurd wordt, zodat dit teruggevorderd kan worden.",
    "type": "decimal",
    "src": "PdcOrder",
    "col": "amountToReclaim",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-716",
    "name": "creditAmount",
    "desc": "Dit is het bedrag (in euro’s) dat ingetrokken wordt op het teruggevorderde bedrag. Ook dit wordt naar PDC gestuurd, zodat dit verhaald kan worden.",
    "type": "decimal",
    "src": "PdcOrder",
    "col": "creditAmount",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-717",
    "name": "productSpecificationType_id",
    "desc": "Id van het product specificatie typeVerwijssleutel binnen de PDC naar productSpecificationType.id, wordt niet gebruikt binnen de MI",
    "type": "int",
    "src": "Pdc_ProductSpecification",
    "col": "productSpecificationType_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-718",
    "name": "productSpecificationType_type",
    "desc": "Het type productspecificatie",
    "type": "varchar",
    "src": "Pdc_ProductSpecification",
    "col": "productSpecificationType_type",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-719",
    "name": "name",
    "desc": "Naam van de productspecificatie",
    "type": "varchar",
    "src": "Pdc_ProductSpecification",
    "col": "name",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-720",
    "name": "producttype_id",
    "desc": "Verwijssleutel naar pdc_ProductType.id",
    "type": "int",
    "src": "Pdc_ProductSpecification",
    "col": "producttype_id",
    "values": "",
    "ext": false
  },
  {
    "id": "DF-721",
    "name": "producttype_name",
    "desc": "Naam van het producttype",
    "type": "varchar",
    "src": "Pdc_ProductSpecification",
    "col": "producttype_name",
    "values": "",
    "ext": false
  }
];

function loadDvData() {
  dvEntries = JSON.parse(JSON.stringify(DV_DEFAULT));
}

function saveDvData() { /* no-op: data lives in HTML */ }

function nextDvId() {
  const nums = dvEntries.map(e => parseInt(e.id.replace('DF-',''))).filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return 'DF-' + String(max + 1).padStart(3,'0');
}

function typeBadgeHtml(t) {
  const cls = ['date','datetime','varchar','decimal','bigint','int','tinyint','bit'].includes(t) ? t : 'varchar';
  return `<span class="dtype-badge ${cls}">${t || '—'}</span>`;
}

function dvUsedIn(dvId) {
  return entries.filter(e => {
    const chips = e.fieldChips || [];
    return chips.some(c => c.type === 'catalog' && c.id === dvId);
  });
}

function renderDvTable() {
  const tbody = document.getElementById('dvTableBody');
  const noRes = document.getElementById('dvNoResults');
  const q = (document.getElementById('dvSearch').value || '').toLowerCase().trim();
  const ft = document.getElementById('dvFilterType').value;
  const fs = document.getElementById('dvFilterSrc').value;
  const fc = (document.getElementById('dvFilterCat') || {}).value || '';

  const filtered = dvEntries.filter(e => {
    if (ft && e.type !== ft) return false;
    if (fs && e.src !== fs) return false;
    if (fc && e.cat !== fc) return false;
    if (q) {
      const hay = [e.id, e.name, e.desc, e.src, e.col].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  document.getElementById('dvCountLabel').textContent = filtered.length + ' velden';
  if (typeof updateHeaderCounts === 'function') updateHeaderCounts();

  if (!filtered.length) { tbody.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  tbody.innerHTML = filtered.map(e => {
    const used = dvUsedIn(e.id);
    const usedHtml = used.length
      ? used.slice(0,3).map(u => `<span class="dv-used">${u.id}</span>`).join(' · ') + (used.length > 3 ? ` · +${used.length-3}` : '')
      : '<span style="color:var(--bd);">—</span>';
    const extBadge = e.ext ? `<span class="dv-ext-badge" style="margin-left:4px;">Eigen</span>` : '';
    const catHtml = (() => {
      if (!e.cat) return '<span style="color:var(--bd);font-size:.65rem;">—</span>';
      const c = (typeof dvCats !== 'undefined') ? dvCats.find(x => x.name === e.cat) : null;
      const s = (typeof COLOR_MAP !== 'undefined') ? (COLOR_MAP[c ? c.color : 'gray'] || COLOR_MAP.gray) : {bg:'#F2F5F9',color:'#4A6180'};
      return `<span style="display:inline-flex;padding:2px 7px;border-radius:8px;font-size:.6rem;font-weight:600;background:${s.bg};color:${s.color};">${escDvHtml(e.cat)}</span>`;
    })();
    return `<tr data-id="${e.id}" onclick="selectDvEntry('${e.id}')" class="${e.id === currentDvId ? 'selected' : ''}">
      <td class="dv-id">${e.id}</td>
      <td><span class="dv-name">${escDvHtml(e.name)}</span>${extBadge}<div class="dv-src">${e.src || '—'}</div></td>
      <td>${typeBadgeHtml(e.type)}</td>
      <td class="dv-src">${e.src || '<em style="color:var(--bd)">—</em>'}</td>
      <td>${catHtml}</td>
      <td style="font-size:.65rem;">${usedHtml}</td>
    </tr>`;
  }).join('');
}

function escDvHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function selectDvEntry(id) {
  currentDvId = id;
  const e = dvEntries.find(x => x.id === id); if (!e) return;
  closeDvEdit();
  document.getElementById('dvDetailEmpty').style.display = 'none';
  const dc = document.getElementById('dvDetailContent');
  dc.style.display = 'flex'; dc.style.flexDirection = 'column';

  document.getElementById('dvDId').textContent = e.id;
  document.getElementById('dvDName').textContent = e.name || '—';
  const catPillDv = (() => {
    if (!e.cat) return '';
    const c = (typeof dvCats !== 'undefined') ? dvCats.find(x => x.name === e.cat) : null;
    const s = (typeof COLOR_MAP !== 'undefined') ? (COLOR_MAP[c ? c.color : 'gray'] || COLOR_MAP.gray) : {bg:'#F2F5F9',color:'#4A6180'};
    return ` <span class="bdg" style="background:${s.bg};color:${s.color};">${escDvHtml(e.cat)}</span>`;
  })();
  document.getElementById('dvDBadges').innerHTML = typeBadgeHtml(e.type) + (e.ext ? ' <span class="dv-ext-badge">Eigen veld</span>' : '') + catPillDv;
  document.getElementById('dvDDesc').textContent = e.desc || '—';
  document.getElementById('dvDType').textContent = e.type || '—';
  document.getElementById('dvDSrc').textContent = e.src || '—';
  document.getElementById('dvDCol').textContent = e.col || '—';
  document.getElementById('dvDExt').textContent = e.ext ? 'Ja — niet in bronsysteem' : 'Nee';

  const valsEl = document.getElementById('dvDValues');
  const valsSec = document.getElementById('dvDValuesSection');
  if (e.values && e.values.trim()) {
    valsSec.style.display = '';
    valsEl.innerHTML = e.values.trim().split('\n').map(line => {
      const [code, ...rest] = line.split('—');
      return `<div class="dv-value-row"><span class="dv-value-code">${escDvHtml(code.trim())}</span><span class="dv-value-desc">${escDvHtml(rest.join('—').trim())}</span></div>`;
    }).join('');
  } else {
    valsSec.style.display = 'none';
  }

  const used = dvUsedIn(e.id);
  document.getElementById('dvDUsed').innerHTML = used.length
    ? used.map(u => `<span class="dv-used-chip" onclick="switchMainTab('definities');setTimeout(()=>selectEntry('${u.id}'),100)">${u.id} ${escDvHtml(u.term)}</span>`).join('')
    : '<span style="font-size:.68rem;color:var(--bd);">Nog niet gekoppeld aan definities</span>';

  renderDvTable();
}

function openDvEdit(id) {
  const e = dvEntries.find(x => x.id === id); if (!e) return;
  dvIsNew = false;
  document.getElementById('dvEditTitle').textContent = 'Dataveld bewerken — ' + e.id;
  document.getElementById('dvEId').value = e.id;
  document.getElementById('dvEName').value = e.name || '';
  document.getElementById('dvEDesc').value = e.desc || '';
  document.getElementById('dvEType').value = e.type || 'varchar';
  document.getElementById('dvESrc').value = e.src || '';
  document.getElementById('dvECol').value = e.col || '';
  document.getElementById('dvEValues').value = e.values || '';
  document.getElementById('dvEExt').checked = !!e.ext;
  const catSel = document.getElementById('dvECat');
  if (catSel) catSel.value = e.cat || '';
  document.getElementById('dvDetailContent').style.display = 'none';
  document.getElementById('dvDetailEmpty').style.display = 'none';
  document.getElementById('dvEditPanel').classList.add('open');
}

function openDvNew() {
  dvIsNew = true;
  currentDvId = null;
  document.getElementById('dvEditTitle').textContent = 'Nieuw dataveld';
  document.getElementById('dvEId').value = nextDvId();
  document.getElementById('dvEName').value = '';
  document.getElementById('dvEDesc').value = '';
  document.getElementById('dvEType').value = 'varchar';
  document.getElementById('dvESrc').value = '';
  document.getElementById('dvECol').value = '';
  document.getElementById('dvEValues').value = '';
  document.getElementById('dvEExt').checked = false;
  const catSel = document.getElementById('dvECat');
  if (catSel) catSel.value = '';
  document.getElementById('dvDetailEmpty').style.display = 'none';
  document.getElementById('dvDetailContent').style.display = 'none';
  document.getElementById('dvEditPanel').classList.add('open');
}

function closeDvEdit() {
  document.getElementById('dvEditPanel').classList.remove('open');
  if (currentDvId) {
    document.getElementById('dvDetailContent').style.display = 'flex';
  } else {
    document.getElementById('dvDetailEmpty').style.display = 'flex';
  }
}

function saveDvEntry() {
  const name = document.getElementById('dvEName').value.trim();
  if (!name) { alert('Veldnaam is verplicht.'); return; }
  const catSel = document.getElementById('dvECat');
  const obj = {
    id: document.getElementById('dvEId').value,
    name,
    desc: document.getElementById('dvEDesc').value.trim(),
    type: document.getElementById('dvEType').value,
    src:  document.getElementById('dvESrc').value.trim(),
    col:  document.getElementById('dvECol').value.trim(),
    values: document.getElementById('dvEValues').value.trim(),
    ext: document.getElementById('dvEExt').checked,
    cat: catSel ? catSel.value : '',
  };
  if (dvIsNew) {
    dvEntries.push(obj);
  } else {
    const idx = dvEntries.findIndex(e => e.id === obj.id);
    if (idx >= 0) dvEntries[idx] = obj;
  }
  saveDvData();
  currentDvId = obj.id;
  closeDvEdit();
  rebuildDvFilterSrc();
  renderDvTable();
  selectDvEntry(obj.id);
}

function deleteDvEntry(id) {
  const e = dvEntries.find(x => x.id === id); if (!e) return;
  if (!confirm(`Dataveld "${e.name}" (${e.id}) verwijderen?`)) return;
  dvEntries = dvEntries.filter(x => x.id !== id);
  saveDvData();
  currentDvId = null;
  document.getElementById('dvDetailEmpty').style.display = 'flex';
  document.getElementById('dvDetailContent').style.display = 'none';
  renderDvTable();
}

function rebuildDvFilterSrc() {
  const sel = document.getElementById('dvFilterSrc');
  const cur = sel.value;
  const srcs = [...new Set(dvEntries.map(e => e.src).filter(Boolean))].sort();
  sel.innerHTML = '<option value="">Alle bronnen</option>' +
    srcs.map(s => `<option value="${escDvHtml(s)}"${s===cur?' selected':''}>${escDvHtml(s)}</option>`).join('');
}

// ── Begrippen dataveld chip picker ────────────────────────────────
// fieldChips: [{type:'catalog'|'custom', id?:string, label:string}]
let currentFieldChips = [];

function initFieldChips(fieldsStr, chipsArr) {
  // Migrate old comma-string to chips if no chipsArr
  if (chipsArr && chipsArr.length) {
    currentFieldChips = JSON.parse(JSON.stringify(chipsArr));
  } else if (fieldsStr) {
    // Try to match against catalog
    currentFieldChips = fieldsStr.split(',').map(s => s.trim()).filter(Boolean).map(label => {
      const match = dvEntries.find(d => d.name.toLowerCase() === label.toLowerCase() || (d.id + ' ' + d.name).toLowerCase() === label.toLowerCase());
      return match ? {type:'catalog', id:match.id, label:match.id + ' ' + match.name} : {type:'custom', label};
    });
  } else {
    currentFieldChips = [];
  }
  renderFieldChips();
}

function renderFieldChips() {
  const wrap = document.getElementById('eFieldsChips');
  if (!wrap) return;
  wrap.innerHTML = currentFieldChips.map((c, i) =>
    `<span class="df-chip ${c.type}"><span>${escDvHtml(c.label)}</span><button type="button" onclick="removeFieldChip(${i})">×</button></span>`
  ).join('');
}

function removeFieldChip(i) {
  currentFieldChips.splice(i, 1);
  renderFieldChips();
}

function filterDfPicker(q) {
  const resultsEl = document.getElementById('df-results');
  if (!resultsEl) return;
  const term = q.trim().toLowerCase();
  resultsEl.style.display = 'block';

  const linked = currentFieldChips.filter(c => c.type === 'catalog').map(c => c.id);
  const filtered = dvEntries.filter(e => {
    if (!term) return true;
    return (e.id + ' ' + e.name).toLowerCase().includes(term);
  }).slice(0, 15);

  let html = filtered.map(e => {
    const already = linked.includes(e.id);
    return `<div class="df-result-item${already ? '" style="opacity:.4;pointer-events:none;"' : '"'} onclick="addFieldChipCatalog('${e.id}')">
      <span class="df-result-id">${e.id}</span>
      <span style="flex:1;">${escDvHtml(e.name)}</span>
      <span class="df-result-type">${e.type}</span>
      ${already ? '<span style="color:var(--zg);">✓</span>' : ''}
    </div>`;
  }).join('');

  if (term && !filtered.find(e => e.name.toLowerCase() === term)) {
    html += `<div class="df-result-custom" onclick="addFieldChipCustom('${q.replace(/'/g,"\\'")}')">+ "${escDvHtml(q)}" als eigen veld toevoegen</div>`;
  }

  if (!html) {
    html = `<div class="df-no-results">Geen velden gevonden</div>
      <div class="df-result-custom" onclick="addFieldChipCustom('${q.replace(/'/g,"\\'")}')">+ "${escDvHtml(q)}" als eigen veld toevoegen</div>`;
  }

  resultsEl.innerHTML = html;
}

function addFieldChipCatalog(dvId) {
  const e = dvEntries.find(x => x.id === dvId); if (!e) return;
  if (currentFieldChips.some(c => c.type === 'catalog' && c.id === dvId)) return;
  currentFieldChips.push({type:'catalog', id:dvId, label: dvId + ' ' + e.name});
  renderFieldChips();
  const inp = document.getElementById('eFieldsSearch');
  if (inp) { inp.value = ''; }
  const res = document.getElementById('df-results');
  if (res) res.style.display = 'none';
}

function addFieldChipCustom(label) {
  const l = label.trim(); if (!l) return;
  if (currentFieldChips.some(c => c.label === l)) return;
  currentFieldChips.push({type:'custom', label: l});
  renderFieldChips();
  const inp = document.getElementById('eFieldsSearch');
  if (inp) { inp.value = ''; }
  const res = document.getElementById('df-results');
  if (res) res.style.display = 'none';
}

// ── Procescategorieën ─────────────────────────────────────────────
const PROC_CAT_KEY = 'medemblik_proc_cats_v9';
let procCats = [];
let tempProcCats = [];

const DEFAULT_PROC_CATS = [
  {
    "name": "Jeugd",
    "color": "green"
  },
  {
    "name": "WMO",
    "color": "blue"
  },
  {
    "name": "Toegang",
    "color": "orange"
  },
  {
    "name": "Sociaal Domein",
    "color": "purple"
  }
];

function loadProcCats() {
  try {
    const s = localStorage.getItem(PROC_CAT_KEY);
    procCats = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_PROC_CATS));
  } catch(e) { procCats = JSON.parse(JSON.stringify(DEFAULT_PROC_CATS)); }
}

function saveProcCatsData() { try { localStorage.setItem(PROC_CAT_KEY, JSON.stringify(procCats)); } catch(e) {} }

function rebuildProcCatDropdowns() {
  const f = document.getElementById('procFilterCat');
  const e = document.getElementById('proc-cat-select');
  if (f) f.innerHTML = '<option value="">Alle categorieën</option>' +
    procCats.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  if (e) e.innerHTML = '<option value="">— categorie —</option>' +
    procCats.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

function openProcCatModal() {
  tempProcCats = JSON.parse(JSON.stringify(procCats));
  renderProcCatList();
  document.getElementById('procCatModal').classList.add('open');
}
function closeProcCatModal() { document.getElementById('procCatModal').classList.remove('open'); }

function renderProcCatList() {
  document.getElementById('procCatList').innerHTML = tempProcCats.map((c, i) => {
    const s = COLOR_MAP[c.color] || COLOR_MAP.gray;
    const cnt = processes.filter(p => p.cat === c.name).length;
    return `<div class="item-row">
      <span class="color-dot" style="background:${s.dot};"></span>
      <input class="item-name-input" value="${c.name.replace(/"/g,'&quot;')}" onchange="tempProcCats[${i}].name=this.value" placeholder="Categorienaam">
      <select class="color-sel" onchange="tempProcCats[${i}].color=this.value;renderProcCatList()">${colorOptions(c.color)}</select>
      <span class="item-count">${cnt}</span>
      <button class="btn-del-item" onclick="tempProcCats.splice(${i},1);renderProcCatList();" title="Verwijder">${delIcon()}</button>
    </div>`;
  }).join('');
}

function addProcCatRow() {
  const inp = document.getElementById('newProcCatName');
  const name = inp.value.trim();
  if (!name) { inp.focus(); return; }
  if (tempProcCats.find(c => c.name.toLowerCase() === name.toLowerCase())) { alert('Naam bestaat al.'); return; }
  tempProcCats.push({ name, color: document.getElementById('newProcCatColor').value });
  inp.value = '';
  renderProcCatList();
}

function saveProcCats() {
  procCats = JSON.parse(JSON.stringify(tempProcCats));
  saveProcCatsData();
  rebuildProcCatDropdowns();
  closeProcCatModal();
}

function saveProcCategory() {
  const p = processes.find(x => x.id === currentProcId);
  if (!p) return;
  p.cat = document.getElementById('proc-cat-select').value;
  saveProcesses();
}

// ── Dataveld categorieën ──────────────────────────────────────────
const DV_CAT_KEY = 'medemblik_dv_cats_v9';
let dvCats = [];
let tempDvCats = [];

const DEFAULT_DV_CATS = [
  {
    "name": "iJW",
    "color": "teal"
  },
  {
    "name": "iWmo",
    "color": "blue"
  },
  {
    "name": "Gemeente",
    "color": "purple"
  },
  {
    "name": "CBS",
    "color": "green"
  },
  {
    "name": "Extern",
    "color": "orange"
  }
];

function loadDvCats() {
  try {
    const s = localStorage.getItem(DV_CAT_KEY);
    dvCats = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_DV_CATS));
  } catch(e) { dvCats = JSON.parse(JSON.stringify(DEFAULT_DV_CATS)); }
}

function saveDvCatsData() { try { localStorage.setItem(DV_CAT_KEY, JSON.stringify(dvCats)); } catch(e) {} }

function rebuildDvCatDropdowns() {
  const f = document.getElementById('dvFilterCat');
  const e = document.getElementById('dvECat');
  if (f) f.innerHTML = '<option value="">Alle categorieën</option>' +
    dvCats.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  if (e) e.innerHTML = '<option value="">— kies —</option>' +
    dvCats.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

function openDvCatModal() {
  tempDvCats = JSON.parse(JSON.stringify(dvCats));
  renderDvCatList();
  document.getElementById('dvCatModal').classList.add('open');
}
function closeDvCatModal() { document.getElementById('dvCatModal').classList.remove('open'); }

function renderDvCatList() {
  document.getElementById('dvCatList').innerHTML = tempDvCats.map((c, i) => {
    const s = COLOR_MAP[c.color] || COLOR_MAP.gray;
    const cnt = dvEntries.filter(d => d.cat === c.name).length;
    return `<div class="item-row">
      <span class="color-dot" style="background:${s.dot};"></span>
      <input class="item-name-input" value="${c.name.replace(/"/g,'&quot;')}" onchange="tempDvCats[${i}].name=this.value" placeholder="Categorienaam">
      <select class="color-sel" onchange="tempDvCats[${i}].color=this.value;renderDvCatList()">${colorOptions(c.color)}</select>
      <span class="item-count">${cnt}</span>
      <button class="btn-del-item" onclick="tempDvCats.splice(${i},1);renderDvCatList();" title="Verwijder">${delIcon()}</button>
    </div>`;
  }).join('');
}

function addDvCatRow() {
  const inp = document.getElementById('newDvCatName');
  const name = inp.value.trim();
  if (!name) { inp.focus(); return; }
  if (tempDvCats.find(c => c.name.toLowerCase() === name.toLowerCase())) { alert('Naam bestaat al.'); return; }
  tempDvCats.push({ name, color: document.getElementById('newDvCatColor').value });
  inp.value = '';
  renderDvCatList();
}

function saveDvCats() {
  dvCats = JSON.parse(JSON.stringify(tempDvCats));
  saveDvCatsData();
  rebuildDvCatDropdowns();
  closeDvCatModal();
  renderDvTable();
}

// ── Overschrijf renderTable om volledigheidskolom toe te voegen ───
// Score wordt al direct in renderTable geïnjecteerd via scoreHtml()
// injectScoreAndCounts is beschikbaar maar niet meer nodig als aparte aanroep

// ── Modal close on overlay click ─────────────────────────────────
document.getElementById('procCatModal').addEventListener('click', function(e) { if (e.target === this) closeProcCatModal(); });
document.getElementById('dvCatModal').addEventListener('click', function(e) { if (e.target === this) closeDvCatModal(); });

function switchMainTab(tab) {
  ['view-definities','view-processen','view-datavelden','view-dashboards','view-vraagsteller'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  ['navDefinities','navProcessen','navDatavelden','navDashboards','navVraagsteller'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  var tb = document.querySelector('.toolbar');
  if (tb) tb.style.display = 'none';

  if (tab === 'definities') {
    document.getElementById('view-definities').style.display = 'flex';
    document.getElementById('navDefinities').classList.add('active');
    if (tb) tb.style.display = 'flex';
  } else if (tab === 'processen') {
    document.getElementById('view-processen').style.display = 'flex';
    document.getElementById('navProcessen').classList.add('active');
    renderProcLibrary();
  } else if (tab === 'datavelden') {
    document.getElementById('view-datavelden').style.display = 'flex';
    document.getElementById('navDatavelden').classList.add('active');
    rebuildDvFilterSrc();
    renderDvTable();
  } else if (tab === 'dashboards') {
    var el = document.getElementById('view-dashboards');
    if (el) el.style.display = 'flex';
    document.getElementById('navDashboards').classList.add('active');
    renderDashTable();
  } else if (tab === 'vraagsteller') {
    var el = document.getElementById('view-vraagsteller');
    if (el) el.style.display = 'flex';
    document.getElementById('navVraagsteller').classList.add('active');
  }
}

// Footer date
document.getElementById('ftrDate').textContent = 'Bijgewerkt op ' + new Date().toLocaleDateString('nl-NL', {day:'2-digit',month:'long',year:'numeric'});

// ── Publiceer naar GitHub: exporteer index.html met live data ────
function exportHTMLFile() {
  const liveEntries   = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(entries));
  const liveProcs     = JSON.parse(localStorage.getItem(PROC_KEY)    || JSON.stringify(processes));
  const liveCats      = JSON.parse(localStorage.getItem(CAT_KEY)     || JSON.stringify(categories));
  const liveTeams     = JSON.parse(localStorage.getItem(TEAM_KEY)    || JSON.stringify(teams));
  const liveStatuses  = JSON.parse(localStorage.getItem(STATUS_KEY)  || JSON.stringify(statuses));
  const liveProcCats  = JSON.parse(localStorage.getItem(PROC_CAT_KEY)|| JSON.stringify(procCats));
  const liveDvCats    = JSON.parse(localStorage.getItem(DV_CAT_KEY)  || JSON.stringify(dvCats));
  const liveDvEntries = JSON.parse(localStorage.getItem(DV_KEY)      || JSON.stringify(dvEntries));

  let html = document.documentElement.outerHTML;

  // Helper: vervang een const array/object definitie
  function replaceConst(h, name, value) {
    const json = JSON.stringify(value, null, 2);
    // Match: const NAME = [ ... ]; or const NAME = { ... };
    const re = new RegExp('(const\\s+' + name + '\\s*=\\s*)(\\[[\\s\\S]*?\\]|\\{[\\s\\S]*?\\})(\\s*;)', 'm');
    return h.replace(re, '$1' + json + '$3');
  }

  html = replaceConst(html, 'DEFAULT_DATA',      liveEntries);
  html = replaceConst(html, 'DEFAULT_CATS',      liveCats);
  html = replaceConst(html, 'DEFAULT_TEAMS',     liveTeams);
  html = replaceConst(html, 'DEFAULT_STATUSES',  liveStatuses);
  html = replaceConst(html, 'DEFAULT_PROC_CATS', liveProcCats);
  html = replaceConst(html, 'DEFAULT_DV_CATS',   liveDvCats);
  html = replaceConst(html, 'DV_DEFAULT',         liveDvEntries);

  // Vervang loadProcesses zodat processen direct geladen worden
  const procsJson = JSON.stringify(liveProcs, null, 2);
  html = html.replace(
    /function loadProcesses\(\)\s*\{[\s\S]*?^}/m,
    'function loadProcesses() {\n  try {\n    const s = localStorage.getItem(PROC_KEY);\n    if (s) { processes = JSON.parse(s); } else { processes = ' + procsJson + ';\n      try { localStorage.setItem(PROC_KEY, JSON.stringify(processes)); } catch(e) {} }\n  } catch(e) { processes = []; }\n}'
  );

  const blob = new Blob([html], {type: 'text/html;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

// Data loaded directly from HTML constants — no localStorage
// Init — load all data directly from HTML constants
loadMeta();
loadData();
rebuildCatDropdowns();
renderTable();
loadProcesses();
loadDvData();
rebuildDvFilterSrc();
loadProcCats();
loadDvCats();
rebuildProcCatDropdowns();
rebuildDvCatDropdowns();
updateHeaderCounts();
// Force re-render to make sure data is visible
setTimeout(function() {
  if (typeof renderTable === 'function') renderTable();
  if (typeof updateHeaderCounts === 'function') updateHeaderCounts();
}, 100);


// ═══════════════════════════════════════════════════════════════
//  DASHBOARDS
// ═══════════════════════════════════════════════════════════════
const DASH_KEY = 'medemblik_dashboards_v9';
const DASH_DEFAULT = [
  {
    "id": "DB-001",
    "name": "Sturing Toegang Jeugd",
    "type": "intern",
    "desc": "Overzicht van aanvragen in triage, verdeellijst en beslistermijnoverschrijdingen. Stuurt op doorlooptijden en wachtlijsten bij de gemeentelijke toegang jeugdzorg.",
    "loc": "Power BI Workspace – Sociaal Domein",
    "team": "Jeugd",
    "link": "",
    "updated": "2025-01-15"
  },
  {
    "id": "DB-002",
    "name": "Uitstroom & Instroom Monitor",
    "type": "intern",
    "desc": "Stromenoverzicht per periode (nieuwe, terugkerende cliënten; uitstroom naar lichtere/zwaardere zorg). Inclusief saldo-formule en vergelijking met voorgaande periodes.",
    "loc": "Power BI Workspace – Sociaal Domein",
    "team": "WMO & Backoffice",
    "link": "",
    "updated": "2025-03-01"
  },
  {
    "id": "DB-003",
    "name": "Contractmonitor Zorgaanbieders",
    "type": "intern",
    "desc": "Uitnutting per aanbieder en productcategorie (ZIN). Signalering onder/overbenutting. Inclusief wachttijden bij aanbieders na toewijzing.",
    "loc": "Power BI Workspace – Contractbeheer",
    "team": "Contractbeheer & Inkoop",
    "link": "",
    "updated": "2025-02-20"
  },
  {
    "id": "DB-004",
    "name": "Gemeentelijke Monitor Sociaal Domein (CBS)",
    "type": "extern",
    "desc": "Landelijk benchmarkdashboard van het CBS met kernindicatoren WMO en Jeugdwet. Vergelijking met gemeenten van vergelijkbare omvang (peer-groep). Jaarlijkse aanlevering via GMSD-koppeling.",
    "loc": "CBS StatLine / hard-copy rapportage",
    "team": "Datateam",
    "link": "https://www.cbs.nl/nl-nl/maatschappij/zorg-en-welzijn",
    "updated": "2025-04-01"
  },
  {
    "id": "DB-005",
    "name": "Waarstaatjegemeente.nl",
    "type": "extern",
    "desc": "Benchmarkportaal met prestatie-indicatoren per gemeente, inclusief tevredenheid WMO-cliënten en Jeugdwet-cliënten (cliëntonderzoek). Jaarlijkse update.",
    "loc": "waarstaatjegemeente.nl",
    "team": "Bedrijfsvoering",
    "link": "https://www.waarstaatjegemeente.nl",
    "updated": "2025-01-01"
  },
  {
    "id": "DB-006",
    "name": "Financieel Dashboard Sociaal Domein",
    "type": "intern",
    "desc": "Budgetuitputting per kostensoort (WMO, Jeugd, Participatie) ten opzichte van begroting. Inclusief prognoses en afwijkingsanalyse per kwartaal.",
    "loc": "Power BI Workspace – Bedrijfsvoering",
    "team": "Bedrijfsvoering",
    "link": "",
    "updated": "2025-04-15"
  }
];

let dashboards = [];
let selectedDashId = null;

function loadDashboards() {
  dashboards = JSON.parse(JSON.stringify(DASH_DEFAULT));
}
function saveDashboards() {
  try { localStorage.setItem(DASH_KEY, JSON.stringify(dashboards)); } catch(e) {}
}
function nextDashId() {
  const nums = dashboards.map(d => parseInt((d.id||'DB-000').replace('DB-',''))).filter(n => !isNaN(n));
  return 'DB-' + String(Math.max(0, ...nums) + 1).padStart(3,'0');
}

function renderDashTable() {
  const q    = ((document.getElementById('dashSearch')||{}).value||'').toLowerCase().trim();
  const type = ((document.getElementById('dashFilterType')||{}).value||'');
  const team = ((document.getElementById('dashFilterTeam')||{}).value||'');
  const filtered = dashboards.filter(d => {
    if (type && d.type !== type) return false;
    if (team && d.team !== team) return false;
    if (q) {
      const hay = ((d.name||'') + ' ' + (d.desc||'') + ' ' + (d.team||'') + ' ' + (d.loc||'')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const lbl = document.getElementById('dashCountLabel');
  if (lbl) lbl.textContent = filtered.length + ' dashboard' + (filtered.length !== 1 ? 's' : '');
  const tbody = document.getElementById('dashTableBody');
  if (!tbody) return;
  tbody.innerHTML = filtered.map(d => {
    const sel = d.id === selectedDashId ? 'selected' : '';
    const badge = `<span class="dash-badge ${d.type||'intern'}">${(d.type||'intern').charAt(0).toUpperCase()+(d.type||'intern').slice(1)}</span>`;
    const nameCell = d.type === 'extern' && d.link
      ? `<a href="${escHtml(d.link)}" target="_blank" rel="noopener">${escHtml(d.name)}</a>`
      : escHtml(d.name||'');
    return `<tr data-id="${d.id}" class="${sel}" onclick="selectDash('${d.id}')">
      <td class="dash-id">${escHtml(d.id)}</td>
      <td><span class="dash-name">${nameCell}</span></td>
      <td>${badge}</td>
      <td class="dash-team">${escHtml(d.team||'')}</td>
      <td style="font-size:.7rem;color:var(--sub);">${escHtml((d.loc||'').substring(0,30)+(d.loc&&d.loc.length>30?'…':''))}</td>
      <td style="font-size:.7rem;color:var(--sub);">${escHtml(d.updated||'')}</td>
    </tr>`;
  }).join('');
}

function selectDash(id) {
  selectedDashId = id;
  renderDashTable();
  const d = dashboards.find(x => x.id === id);
  if (!d) return;
  document.getElementById('dashDetailEmpty').style.display = 'none';
  const content = document.getElementById('dashDetailContent');
  content.style.display = 'block';
  const badge = `<span class="dash-badge ${d.type||'intern'}">${(d.type||'intern').charAt(0).toUpperCase()+(d.type||'intern').slice(1)}</span>`;
  const linkHtml = d.link
    ? `<a class="dash-link" href="${escHtml(d.link)}" target="_blank" rel="noopener">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        ${escHtml(d.link)}
      </a>` : '<span style="color:var(--bd);font-size:.75rem;">Intern – geen externe link</span>';
  content.innerHTML = `
    <div class="dash-detail-header">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">${badge}<span class="dash-id">${escHtml(d.id)}</span></div>
      <div class="dash-detail-title">${escHtml(d.name||'')}</div>
    </div>
    <div class="dash-detail-body">
      <div><div class="dash-meta-label">Beschrijving inhoud</div><div class="dash-meta-val">${escHtml(d.desc||'')}</div></div>
      <div><div class="dash-meta-label">Locatie / te vinden op</div><div class="dash-meta-val">${escHtml(d.loc||'')}</div></div>
      <div><div class="dash-meta-label">Externe link</div><div class="dash-meta-val">${linkHtml}</div></div>
      <div><div class="dash-meta-label">Verantwoordelijk team</div><div class="dash-meta-val">${escHtml(d.team||'')}</div></div>
      <div><div class="dash-meta-label">Bijgewerkt op</div><div class="dash-meta-val">${escHtml(d.updated||'')}</div></div>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button class="btn-dv-add" onclick="openDashEdit('${d.id}')">✏️ Bewerken</button>
        <button class="btn-del-proc" onclick="deleteDash('${d.id}')">Verwijderen</button>
      </div>
    </div>`;
}

function openDashNew() {
  const d = { id: nextDashId(), name:'', type:'intern', desc:'', loc:'', team:'', link:'', updated: new Date().toISOString().slice(0,10) };
  dashboards.push(d);
  saveDashboards();
  renderDashTable();
  openDashEdit(d.id);
}

function openDashEdit(id) {
  const d = dashboards.find(x => x.id === id);
  if (!d) return;
  selectedDashId = id;
  document.getElementById('dashDetailEmpty').style.display = 'none';
  const content = document.getElementById('dashDetailContent');
  content.style.display = 'block';
  content.innerHTML = `
    <div class="dash-detail-header">
      <div class="dash-detail-title">${escHtml(d.id)} bewerken</div>
    </div>
    <div class="dash-detail-body" style="gap:10px;">
      <div><div class="dash-meta-label">Naam *</div>
        <input id="deNaam" class="nd-input" value="${escHtml(d.name||'')}" placeholder="Naam dashboard"></div>
      <div><div class="dash-meta-label">Type</div>
        <select id="deType" class="dv-fi-sel" style="width:100%;">
          <option value="intern"${d.type==='intern'?' selected':''}>Intern</option>
          <option value="extern"${d.type==='extern'?' selected':''}>Extern</option>
        </select></div>
      <div><div class="dash-meta-label">Beschrijving inhoud</div>
        <textarea id="deDesc" class="nd-input" rows="4" style="resize:vertical;">${escHtml(d.desc||'')}</textarea></div>
      <div><div class="dash-meta-label">Locatie / te vinden op</div>
        <input id="deLoc" class="nd-input" value="${escHtml(d.loc||'')}" placeholder="bijv. Power BI Workspace – Sociaal Domein"></div>
      <div><div class="dash-meta-label">Externe link (URL)</div>
        <input id="deLink" class="nd-input" value="${escHtml(d.link||'')}" placeholder="https://..."></div>
      <div><div class="dash-meta-label">Verantwoordelijk team</div>
        <input id="deTeam" class="nd-input" value="${escHtml(d.team||'')}" placeholder="bijv. Jeugd"></div>
      <div><div class="dash-meta-label">Bijgewerkt op</div>
        <input id="deUpdated" class="nd-input" type="date" value="${escHtml(d.updated||'')}"></div>
      <div style="display:flex;gap:8px;margin-top:4px;">
        <button class="btn-dv-add" onclick="saveDashEdit('${id}')">💾 Opslaan</button>
        <button class="btn-del-proc" onclick="selectDash('${id}')">Annuleren</button>
      </div>
    </div>`;
}

function saveDashEdit(id) {
  const d = dashboards.find(x => x.id === id);
  if (!d) return;
  d.name    = (document.getElementById('deNaam')||{}).value || '';
  d.type    = (document.getElementById('deType')||{}).value || 'intern';
  d.desc    = (document.getElementById('deDesc')||{}).value || '';
  d.loc     = (document.getElementById('deLoc')||{}).value || '';
  d.link    = (document.getElementById('deLink')||{}).value || '';
  d.team    = (document.getElementById('deTeam')||{}).value || '';
  d.updated = (document.getElementById('deUpdated')||{}).value || '';
  saveDashboards();
  renderDashTable();
  selectDash(id);
}

function deleteDash(id) {
  const d = dashboards.find(x => x.id === id);
  if (!confirm('Dashboard "' + (d ? d.name : id) + '" verwijderen?')) return;
  dashboards = dashboards.filter(x => x.id !== id);
  selectedDashId = null;
  saveDashboards();
  renderDashTable();
  document.getElementById('dashDetailEmpty').style.display = 'flex';
  document.getElementById('dashDetailContent').style.display = 'none';
}

// Init dashboards on load
loadDashboards();


// ═══════════════════════════════════════════════════════════════
//  VRAAGSTELLER
// ═══════════════════════════════════════════════════════════════
const VQ_HISTORY = [];
const VQ_KEYWORD_MAP = {
  'gesprek':        ['D-012','D-003'],  'gesprekken':  ['D-012','D-003'],
  'nieuwe aanvraag':['D-058','D-036','D-035'], 'aanvraag':['D-058','D-059','D-035'],
  'wijziging':      ['D-036','D-048'],  'segment b':   ['D-066','D-069','D-070','D-071'],
  'segment c':      ['D-067','D-083'],  'segment v':   ['D-068'],
  'beschikking':    ['D-035','D-017','D-036'], 'afgegeven':['D-035','D-037'],
  'cliënt':         ['D-023','D-053'],  'client':      ['D-023','D-053'],
  'inwoner':        ['D-023','D-040'],  'uniek':       ['D-023','D-040'],
  'instroom':       ['D-053','D-056'],  'uitstroom':   ['D-002','D-015','D-055'],
  'lichtere zorg':  ['D-055'],          'zwaardere':   ['D-056'],
  'verwijzing':     ['D-009','D-059'],  'doorverwijz': ['D-009','D-059','D-010'],
  'huisarts':       ['D-059','D-009'],  'arts':        ['D-059','D-009'],
  'jeugdzorg':      ['D-025','D-026'],  'wachttijd':   ['D-016','D-062','D-063'],
  'wachtlijst':     ['D-062','D-063'],  'doorlooptijd':['D-003','D-060'],
  'beslistermijn':  ['D-060','D-061'],  'wmo':         ['D-081','D-030','D-082'],
  'jeugd':          ['D-025','D-026','D-027'], 'pleegzorg':['D-076'],
  'gezinshuis':     ['D-077'],          'verblijf':    ['D-068'],
  'dagbesteding':   ['D-074'],          'crisis':      ['D-075'],
  'kosten':         ['D-051','D-049'],  'uitnutting':  ['D-052'],
  'toewijzing':     ['D-036','D-024'],  'arrangement': ['D-071','D-069'],
  'profiel':        ['D-069','D-072'],  'caseload':    ['D-044','D-041'],
};
const VQ_FIELD_MAP = {
  'gesprek':    ['ZaakOverzicht.processType_code','Zaakstap.startDate'],
  'segment b':  ['Pdc_Orders.productType_id','Pdc_ProductType.productCategory_id'],
  'segment c':  ['Pdc_ProductType.specificity','Pdc_Orders.maxCost'],
  'beschikking':['Pdc_CareAllocationProduct.disposalNr','Disposition.issueDate'],
  'verwijzer':  ['Pdc_Orders.referrerType','Pdc_CareRequestProduct.referrerTypeCode'],
  'wachttijd':  ['Pdc_Orders.orderDate','Pdc_Orders.deliveryDateStart','Term.experationDate'],
  'kosten':     ['Pdc_Orders.maxCost','Pdc_Declaration.declaredAmount'],
  'uitstroom':  ['Pdc_Orders.deliveryDateEnd','ZaakOverzicht.processEndDate'],
  'instroom':   ['Pdc_Orders.deliveryDateStart','ZaakOverzicht.processStartDate'],
  'cliënt':     ['Pdc_Client.bsn','Persoon.Klant_BSN'],
};
const VQ_FORMULA_MAP = {
  'gesprekken': '<p>Schatting gesprekken per zaaktype (pas norm aan naar eigen ervaring):</p><div class="vq-formula-box"><code>Totaal = &Sigma; (zaken_per_type &times; norm_gesprekken_per_type)</code><br><br>Richtwaarden:<br>&bull; Nieuwe aanvraag: <code>3&ndash;5 gesprekken</code><br>&bull; Wijziging: <code>1&ndash;2 gesprekken</code><br>&bull; Segment B laag: <code>4&ndash;8 gesprekken</code><br>&bull; Segment B midden: <code>8&ndash;15 gesprekken</code><br>&bull; Segment C: <code>10&ndash;20+ gesprekken</code><br><br>Per cliënt: <code>GROUP BY Persoon.Klant_BSN</code></div>',
  'verwijzer':  '<p>Trend doorverwijzingen huisarts &rarr; jeugdzorg:</p><div class="vq-formula-box"><strong>Stap 1:</strong> Filter <code>referrerTypeCode = &apos;arts&apos;</code><br><strong>Stap 2:</strong> Groepeer op <code>referrerAGBCode</code><br><strong>Stap 3:</strong> Vergelijk over periodes voor trend<br><strong>Effect:</strong> Koppel aan <code>D-052 Uitnutting</code> en <code>D-055 Uitstroom lichtere zorg</code></div>',
  'beschikking':'<p>Telling beschikkingen per segment:</p><div class="vq-formula-box"><strong>Segment B:</strong> <code>productCategory_id IN (41, 45)</code><br><strong>Segment C:</strong> <code>productCategory_id IN (50, 55)</code> + <code>specificity = &apos;ASPECIFIC&apos;</code><br><strong>Per periode:</strong> <code>WHERE allocationDate BETWEEN [start] AND [eind]</code></div>',
  'wachttijd':  '<div class="vq-formula-box"><strong>Wachttijd aanbieder:</strong> <code>deliveryDateStart &minus; orderDate</code><br><strong>Beslistermijn:</strong> <code>Term.experationDate &minus; Term.startDate</code><br>Norm: max. <code>42 dagen</code> (jeugd)</div>',
};

function vqFillExample(el) { document.getElementById('vqInput').value = el.textContent.trim(); }
function vqClear() {
  document.getElementById('vqInput').value = '';
  ['vqAnswerSummary','vqAnswerFormula','vqAnswerDefs','vqAnswerProcs','vqAnswerFields'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.classList.remove('visible');
  });
  document.getElementById('vqLoading').classList.remove('active');
}
function vqAnalyze() {
  var raw = (document.getElementById('vqInput').value||'').trim();
  if (!raw) { alert('Voer een vraag in.'); return; }
  document.getElementById('vqLoading').classList.add('active');
  document.getElementById('vqSubmitBtn').disabled = true;
  ['vqAnswerSummary','vqAnswerFormula','vqAnswerDefs','vqAnswerProcs','vqAnswerFields'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.classList.remove('visible');
  });
  setTimeout(function(){ vqDoAnalyze(raw); document.getElementById('vqLoading').classList.remove('active'); document.getElementById('vqSubmitBtn').disabled=false; }, 600);
}
function vqDoAnalyze(raw) {
  var q = raw.toLowerCase();
  var liveEntries = (typeof entries!=='undefined') ? entries : [];
  var liveProcs   = (typeof processes!=='undefined') ? processes : [];
  var matchedDefIds = {};
  Object.keys(VQ_KEYWORD_MAP).forEach(function(kw){ if(q.includes(kw)) VQ_KEYWORD_MAP[kw].forEach(function(id){ matchedDefIds[id]=1; }); });
  var qWords = q.split(/\s+/).filter(function(w){return w.length>3;});
  liveEntries.forEach(function(e){
    var hay=((e.term||'')+(e.def||'')+(e.ctx||'')).toLowerCase();
    if(qWords.filter(function(w){return hay.includes(w);}).length>=2) matchedDefIds[e.id]=1;
  });
  var matchedDefs = liveEntries.filter(function(e){return matchedDefIds[e.id];});
  var matchedProcs = liveProcs.filter(function(p){
    var hay=((p.name||'')+(p.cat||'')).toLowerCase();
    var linked=(p.nodes||[]).some(function(n){return (n.defs||[]).some(function(d){return matchedDefIds[d.split(' ')[0]];});});
    return linked || qWords.some(function(w){return hay.includes(w);});
  });
  var matchedFields = {};
  Object.keys(VQ_FIELD_MAP).forEach(function(kw){ if(q.includes(kw)) VQ_FIELD_MAP[kw].forEach(function(f){ matchedFields[f]=1; }); });
  matchedDefs.forEach(function(e){ (e.fieldChips||[]).forEach(function(c){ matchedFields[c.label]=1; }); });
  var fieldsArr = Object.keys(matchedFields);
  var formulaKey = null;
  if(q.includes('gesprek')) formulaKey='gesprekken';
  else if(q.includes('huisarts')||q.includes('doorverwijz')||q.includes('verwijz')) formulaKey='verwijzer';
  else if(q.includes('beschikking')||(q.includes('segment')&&q.includes('afgegeven'))) formulaKey='beschikking';
  else if(q.includes('wacht')) formulaKey='wachttijd';
  var summary = 'Op basis van je vraag heb ik <strong>'+matchedDefs.length+' begrippen</strong>'+(matchedProcs.length?' , <strong>'+matchedProcs.length+' processen</strong>':'')+' en <strong>'+fieldsArr.length+' datavelden</strong> gevonden.';
  if(matchedDefs.length===0) summary='Weinig directe matches gevonden. Probeer de vraag specifieker of gebruik een voorbeeldvraag als startpunt.';
  document.getElementById('vqAnswerText').innerHTML = summary;
  document.getElementById('vqAnswerSummary').classList.add('visible');
  if(formulaKey && VQ_FORMULA_MAP[formulaKey]){
    document.getElementById('vqFormulaContent').innerHTML = VQ_FORMULA_MAP[formulaKey];
    document.getElementById('vqAnswerFormula').classList.add('visible');
  }
  if(matchedDefs.length>0){
    document.getElementById('vqDefBadge').textContent = matchedDefs.length+' gevonden';
    document.getElementById('vqDefList').innerHTML = matchedDefs.slice(0,8).map(function(e){
      return '<div class="vq-def-item" onclick="vqGoToDef(\''+e.id+'\')"><div class="vq-def-item-id">'+escHtml(e.id)+'</div><div class="vq-def-item-term">'+escHtml(e.term)+'</div><div class="vq-def-item-desc">'+escHtml((e.def||'').substring(0,120))+'</div></div>';
    }).join('');
    document.getElementById('vqAnswerDefs').classList.add('visible');
  }
  if(matchedProcs.length>0){
    document.getElementById('vqProcBadge').textContent = matchedProcs.length+' gevonden';
    document.getElementById('vqProcList').innerHTML = matchedProcs.slice(0,4).map(function(p){
      return '<div class="vq-proc-item" onclick="switchMainTab(\'processen\');setTimeout(function(){openProcess(\''+p.id+'\')},100)"><div class="vq-proc-item-name">&#x2B21; '+escHtml(p.name||'Naamloos')+'</div><div class="vq-proc-item-desc">'+((p.nodes||[]).length)+' stappen'+(p.cat?' &middot; '+escHtml(p.cat):'')+'</div></div>';
    }).join('');
    document.getElementById('vqAnswerProcs').classList.add('visible');
  }
  if(fieldsArr.length>0){
    document.getElementById('vqFieldBadge').textContent = fieldsArr.length+' gevonden';
    document.getElementById('vqFieldList').innerHTML = fieldsArr.map(function(f){
      return '<span class="vq-field-chip" onclick="switchMainTab(\'datavelden\')" title="Naar datavelden">'+escHtml(f)+'</span>';
    }).join('');
    document.getElementById('vqAnswerFields').classList.add('visible');
  }
  VQ_HISTORY.unshift({q:raw.substring(0,80), time:new Date().toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit'})});
  var histEl = document.getElementById('vqHistory');
  if(histEl) histEl.innerHTML = VQ_HISTORY.slice(0,5).map(function(h){
    return '<div class="vq-history-item" onclick="document.getElementById(\'vqInput\').value=\''+h.q.replace(/'/g,"\\'")+'\'">' +escHtml(h.q)+(h.q.length>=80?'&hellip;':'')+'<div class="vq-history-time">'+h.time+'</div></div>';
  }).join('');
}
function vqGoToDef(id) {
  switchMainTab('definities');
  setTimeout(function(){ if(typeof selectEntry==='function') selectEntry(id); }, 150);
}/* ════════════════════════════════════════════════════════════
   FASE-FLOW ENGINE
   Voor lineaire processen (Jeugd 3.0, WMO 3.0)
   Canvas-editor blijft voor GPK en andere processen
   ════════════════════════════════════════════════════════════ */

/* IDs van processen die de fase-flow gebruiken */
var FASE_PROC_IDS = ['proc-jeugd-30', 'proc-wmo-30'];

var _currentFaseId = null; /* id van de fase die nu bewerkt wordt */

/* ── Intercept openProcess ── */
var _origOpenProcess = openProcess;
openProcess = function(id) {
  if (FASE_PROC_IDS.indexOf(id) >= 0) {
    openFaseProc(id);
  } else {
    _origOpenProcess.apply(this, arguments);
  }
};

function openFaseProc(id) {
  currentProcId = id;
  var p = processes.find(function(x){ return x.id === id; });
  if (!p) return;

  /* init fasen array if missing */
  if (!p.fasen) p.fasen = buildDefaultFasen(id);

  document.getElementById('proc-library').style.display = 'none';
  document.getElementById('proc-editor').style.display  = 'none';
  var fv = document.getElementById('fase-flow-editor');
  fv.style.display = 'flex';

  document.getElementById('fase-name-input').value  = p.name || '';
  var cs = document.getElementById('fase-cat-select');
  if (cs) cs.value = p.cat || '';

  closeFaseEdit();
  renderFaseFlow();
}

function saveFaseProc() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  p.name = document.getElementById('fase-name-input').value;
  p.cat  = (document.getElementById('fase-cat-select') || {}).value || '';
  saveProcesses();
  renderProcLibrary();
}

function deleteFaseProc() {
  var p = processes.find(function(x){ return x.id === currentProcId; });
  if (!confirm('Proces "' + (p ? p.name : '') + '" verwijderen?')) return;
  processes = processes.filter(function(x){ return x.id !== currentProcId; });
  saveProcesses();
  procShowLibrary();
  renderProcLibrary();
}

/* patch procShowLibrary to also hide fase-flow */
var _origProcShowLibrary = procShowLibrary;
procShowLibrary = function() {
  _origProcShowLibrary.apply(this, arguments);
  var fv = document.getElementById('fase-flow-editor');
  if (fv) fv.style.display = 'none';
};

/* ── Render the flow ── */
function renderFaseFlow() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var container = document.getElementById('fase-flow-content'); if (!container) return;
  var fasen = p.fasen || [];

  var html = '';
  var i = 0;
  while (i < fasen.length) {
    var fase = fasen[i];
    var nextFase = fasen[i+1];
    var isOpt = fase.optional;

    /* check if next is also optional (side-by-side with current) */
    if (isOpt && i > 0) { i++; continue; } /* handled by previous iteration */

    /* connector before (except first) */
    if (i > 0 && !isOpt) {
      html += '<div class="ff-conn"><div class="ff-arr"></div></div>';
    }

    /* check if next phase is optional — render as split */
    if (!isOpt && nextFase && nextFase.optional) {
      html += '<div class="ff-split">';
      html += '<div class="ff-split-main">' + renderFaseBlock(fase) + '</div>';
      html += '<div class="ff-split-side">';
      html += '<div class="ff-side-label" style="color:' + (nextFase.kleur || '#94A3B8') + ';">Optioneel pad</div>';
      html += '<div class="ff-side-vline" style="background:' + (nextFase.kleur || '#94A3B8') + ';"></div>';
      html += '<div class="ff-side-card">' + renderFaseBlock(nextFase, true) + '</div>';
      html += '</div></div>';
      i += 2;
    } else {
      html += renderFaseBlock(fase);
      i++;
    }
  }

  /* end pill */
  html += '<div class="ff-conn"><div class="ff-arr"></div></div>';
  html += '<div class="ff-einde"><div class="ff-einde-pill">Zaak gesloten</div></div>';

  container.innerHTML = html;
}

function renderFaseBlock(fase, compact) {
  var k = fase.kleur || '#005496';
  var selected = _currentFaseId === fase.id;
  var secties = fase.secties || [];

  /* count total vragen */
  var totalVragen = 0;
  secties.forEach(function(s){ totalVragen += (s.vragen || []).length; });

  var tagMap = {g:'ff-tg', b:'ff-tb', o:'ff-to', p:'ff-tp'};

  var html = '<div class="ff-fase' + (compact ? ' ff-fase-compact' : '') + (selected ? ' ff-fase-selected' : '') + '" onclick="openFaseEdit(\'' + fase.id + '\')" style="border-left:4px solid ' + k + ';">';
  html += '<div class="ff-fase-tag" style="background:' + k + ';">' + escHtml(fase.faselabel || '') + '</div>';
  html += '<div class="ff-fase-body">';
  /* header */
  html += '<div class="ff-stap" style="background:' + k + ';">';
  html += '<div class="ff-stap-l"><span class="ff-num">' + escHtml(fase.num || '') + '</span><div><div class="ff-title">' + escHtml(fase.naam || 'Naamloos') + '</div>';
  if (fase.ctx) html += '<div class="ff-sub">' + escHtml(fase.ctx) + '</div>';
  html += '</div></div>';
  if (fase.badge) html += '<span class="ff-badge">' + escHtml(fase.badge) + '</span>';
  html += '</div>';

  /* sections */
  if (!compact) {
    secties.forEach(function(sec, si) {
      if (!(sec.vragen && sec.vragen.length)) return;
      html += '<div class="ff-data' + (si > 0 ? ' ff-data-sep' : '') + '">';
      if (sec.titel) html += '<div class="ff-data-title">' + escHtml(sec.titel) + '</div>';
      html += '<div class="ff-tags">';
      var show = sec.vragen.slice(0, 5);
      var more = sec.vragen.length - 5;
      show.forEach(function(v) {
        html += '<span class="ff-tag ' + (tagMap[v.type] || 'ff-tb') + '">' + escHtml(v.label) + '</span>';
      });
      if (more > 0) html += '<span class="ff-tag ff-tc">+' + more + ' meer</span>';
      html += '</div></div>';
    });
  } else {
    /* compact: just show total count */
    if (totalVragen > 0) {
      html += '<div class="ff-data"><div class="ff-tags"><span class="ff-tag ff-tc">' + totalVragen + ' vragen</span></div></div>';
    }
  }

  /* paden */
  if (fase.paden && fase.paden.length) {
    html += '<div class="ff-paden">';
    fase.paden.forEach(function(pad) {
      html += '<span class="ff-pad" style="border-color:' + escHtml(pad.kleur || '#64748B') + ';color:' + escHtml(pad.kleur || '#64748B') + ';">\u2192 ' + escHtml(pad.label) + '</span>';
    });
    html += '</div>';
  }

  html += '</div></div>'; /* end fase-body + fase */
  return html;
}

/* ── Edit panel ── */
function openFaseEdit(faseId) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === faseId; }); if (!fase) return;
  _currentFaseId = faseId;

  var panel = document.getElementById('fase-edit-panel');
  panel.style.display = 'flex';

  /* header color */
  var hdr = document.getElementById('fep-header');
  hdr.style.background = fase.kleur || '#005496';
  document.getElementById('fep-title').textContent = fase.naam || 'Fase bewerken';
  document.getElementById('fep-sub').textContent   = fase.num  || '';

  /* fields */
  document.getElementById('fep-naam').value      = fase.naam       || '';
  document.getElementById('fep-num').value        = fase.num        || '';
  document.getElementById('fep-faselabel').value  = fase.faselabel  || '';
  document.getElementById('fep-badge').value      = fase.badge      || '';
  document.getElementById('fep-kleur').value      = fase.kleur      || '#005496';
  document.getElementById('fep-ctx').value        = fase.ctx        || '';
  document.getElementById('fep-optional').checked = !!fase.optional;

  renderFepSecties(fase);
  renderFepPaden(fase);
  renderFaseFlow(); /* highlight selected */
}

function closeFaseEdit() {
  _currentFaseId = null;
  var panel = document.getElementById('fase-edit-panel');
  if (panel) panel.style.display = 'none';
  renderFaseFlow();
}

function updateFase() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;

  fase.naam      = document.getElementById('fep-naam').value;
  fase.num       = document.getElementById('fep-num').value;
  fase.faselabel = document.getElementById('fep-faselabel').value;
  fase.badge     = document.getElementById('fep-badge').value;
  fase.kleur     = document.getElementById('fep-kleur').value;
  fase.ctx       = document.getElementById('fep-ctx').value;
  fase.optional  = document.getElementById('fep-optional').checked;

  /* update header color live */
  document.getElementById('fep-header').style.background = fase.kleur;
  document.getElementById('fep-title').textContent = fase.naam || 'Fase bewerken';

  saveProcesses();
  renderFaseFlow();
}

function deleteFase() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; });
  if (!confirm('Fase "' + (fase ? fase.naam : '') + '" verwijderen?')) return;
  p.fasen = (p.fasen || []).filter(function(f){ return f.id !== _currentFaseId; });
  saveProcesses();
  closeFaseEdit();
}

function addFase() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  if (!p.fasen) p.fasen = [];
  var newFase = {
    id: 'fase-' + Date.now(),
    num: 'Zaakstap ' + ((p.fasen.length + 1) * 10),
    naam: 'Nieuwe fase',
    faselabel: 'Stap',
    badge: '',
    kleur: '#005496',
    ctx: '',
    optional: false,
    secties: [{titel: 'Vragen', vragen: []}],
    paden: []
  };
  p.fasen.push(newFase);
  saveProcesses();
  renderFaseFlow();
  setTimeout(function(){ openFaseEdit(newFase.id); }, 50);
}

/* ── Secties in edit panel ── */
function renderFepSecties(fase) {
  var container = document.getElementById('fep-secties'); if (!container) return;
  var secties = fase.secties || [];
  var tagLabels = {g:'Datum',b:'Beslissing',o:'Optioneel',p:'Uitkomst'};
  var tagColors = {g:'#1D9E75',b:'#005496',o:'#F26722',p:'#7F77DD'};

  var html = secties.map(function(sec, si) {
    var vragenHtml = (sec.vragen || []).map(function(v, vi) {
      return '<div class="fep-vraag-row">'
        + '<select class="fep-type-sel" onchange="updateVraagType(' + si + ',' + vi + ',this.value)">'
        + ['g','b','o','p'].map(function(t){ return '<option value="' + t + '"' + (v.type===t?' selected':'') + '>' + tagLabels[t] + '</option>'; }).join('')
        + '</select>'
        + '<input class="fep-v-inp" value="' + escHtml(v.label) + '" oninput="updateVraagLabel(' + si + ',' + vi + ',this.value)" placeholder="Vraag…">'
        + '<button onclick="removeVraag(' + si + ',' + vi + ')" class="fep-del-btn">\u00d7</button>'
        + '</div>';
    }).join('');

    return '<div class="fep-sectie">'
      + '<div class="fep-sectie-hdr">'
      + '<input class="fep-sec-title-inp" value="' + escHtml(sec.titel || '') + '" oninput="updateSectieTitel(' + si + ',this.value)" placeholder="Sectietitel…">'
      + '<button onclick="removeSectie(' + si + ')" class="fep-del-btn">\u00d7</button>'
      + '</div>'
      + vragenHtml
      + '<button onclick="addVraag(' + si + ')" class="fep-add-vraag">+ Vraag</button>'
      + '</div>';
  }).join('');

  container.innerHTML = html;
}

function addSectie() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (!fase.secties) fase.secties = [];
  fase.secties.push({titel: 'Nieuwe sectie', vragen: []});
  saveProcesses(); renderFepSecties(fase); renderFaseFlow();
}

function removeSectie(si) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  fase.secties.splice(si, 1);
  saveProcesses(); renderFepSecties(fase); renderFaseFlow();
}

function updateSectieTitel(si, val) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.secties[si]) fase.secties[si].titel = val;
  saveProcesses();
}

function addVraag(si) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (!fase.secties[si]) return;
  if (!fase.secties[si].vragen) fase.secties[si].vragen = [];
  fase.secties[si].vragen.push({label: '', type: 'b'});
  saveProcesses(); renderFepSecties(fase); renderFaseFlow();
}

function removeVraag(si, vi) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.secties[si]) fase.secties[si].vragen.splice(vi, 1);
  saveProcesses(); renderFepSecties(fase); renderFaseFlow();
}

function updateVraagLabel(si, vi, val) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.secties[si] && fase.secties[si].vragen[vi]) fase.secties[si].vragen[vi].label = val;
  saveProcesses();
}

function updateVraagType(si, vi, val) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.secties[si] && fase.secties[si].vragen[vi]) fase.secties[si].vragen[vi].type = val;
  saveProcesses(); renderFaseFlow();
}

/* ── Paden in edit panel ── */
function renderFepPaden(fase) {
  var container = document.getElementById('fep-paden'); if (!container) return;
  var paden = fase.paden || [];
  if (!paden.length) {
    container.innerHTML = '<div style="font-size:.62rem;color:var(--bd);padding:2px 0;">Nog geen paden — klik + Pad</div>';
    return;
  }
  container.innerHTML = paden.map(function(pad, i) {
    return '<div class="fep-pad-row">'
      + '<input type="color" value="' + escHtml(pad.kleur || '#64748B') + '" onchange="updatePadKleur(' + i + ',this.value)" style="width:26px;height:26px;border:1px solid var(--bd);border-radius:5px;padding:1px;cursor:pointer;flex-shrink:0;">'
      + '<input class="fep-v-inp" value="' + escHtml(pad.label || '') + '" oninput="updatePadLabel(' + i + ',this.value)" placeholder="Label bijv. Goedgekeurd">'
      + '<button onclick="removePad(' + i + ')" class="fep-del-btn">\u00d7</button>'
      + '</div>';
  }).join('');
}

function addPad() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (!fase.paden) fase.paden = [];
  fase.paden.push({label: 'Nieuw pad', kleur: '#1D9E75'});
  saveProcesses(); renderFepPaden(fase); renderFaseFlow();
}

function removePad(i) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  fase.paden.splice(i, 1);
  saveProcesses(); renderFepPaden(fase); renderFaseFlow();
}

function updatePadLabel(i, val) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.paden[i]) fase.paden[i].label = val;
  saveProcesses(); renderFaseFlow();
}

function updatePadKleur(i, val) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen || []).find(function(f){ return f.id === _currentFaseId; }); if (!fase) return;
  if (fase.paden[i]) fase.paden[i].kleur = val;
  saveProcesses(); renderFaseFlow();
}

/* ── Canvas node popup (for GPK etc.) ── */
var _popupNodeId = null;

var _origRenderCanvas = renderCanvas;
renderCanvas = function() {
  var p = currentProc();
  if (!p) return _origRenderCanvas.apply(this, arguments);
  var canvas = document.getElementById('proc-canvas');
  var hint   = document.getElementById('canvas-hint');
  if (hint) hint.style.display = p.nodes.length ? 'none' : 'flex';
  if (!canvas) return;
  canvas.innerHTML = '';
  p.nodes.forEach(function(n) {
    var el = document.createElement('div');
    el.className = 'cn type-' + n.type + (n.id === selectedNodeId ? ' selected' : '');
    el.id = 'cn-' + n.id;
    el.style.left = n.x + 'px';
    el.style.top  = n.y + 'px';
    el.innerHTML = '<div class="cn-inner"><span class="cn-name">' + escHtml(n.name || '\u2026') + '</span>'
      + (n.sub ? '<span class="cn-sub">' + escHtml(n.sub) + '</span>' : '') + '</div>'
      + '<div class="cn-link-dot bottom" data-dir="bottom" data-id="' + n.id + '"></div>'
      + '<div class="cn-link-dot top"    data-dir="top"    data-id="' + n.id + '"></div>'
      + '<div class="cn-link-dot right"  data-dir="right"  data-id="' + n.id + '"></div>'
      + '<div class="cn-link-dot left"   data-dir="left"   data-id="' + n.id + '"></div>';

    var moved = false;
    el.addEventListener('mousedown', function(ev) {
      if (ev.target.classList.contains('cn-link-dot')) return;
      if (connectMode) { handleConnectClick(n.id); ev.preventDefault(); return; }
      selectNode(n.id);
      var sx=ev.clientX-n.x, sy=ev.clientY-n.y;
      moved = false;
      function onMove(e){ moved=true; n.x=Math.max(0,e.clientX-sx); n.y=Math.max(0,e.clientY-sy); el.style.left=n.x+'px'; el.style.top=n.y+'px'; renderEdges(); }
      function onUp(){ document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp); if(moved){ saveProcesses(); } else { openNodePopup(n.id); } }
      document.addEventListener('mousemove',onMove); document.addEventListener('mouseup',onUp); ev.preventDefault();
    });
    el.querySelectorAll('.cn-link-dot').forEach(function(dot){ dot.addEventListener('mousedown',function(ev){ ev.stopPropagation(); if(!connectMode)toggleConnectMode(); handleConnectClick(n.id); }); });
    canvas.appendChild(el);
  });
  renderEdges();
};

function openNodePopup(id) {
  var p = currentProc(); if (!p) return;
  var n = p.nodes.find(function(x){ return x.id===id; }); if (!n) return;
  _popupNodeId = id;
  var TC={'start':'#1D9E75','step':'#005496','decision':'#F26722','action':'#7F77DD','end':'#1D9E75'};
  var TL={'start':'Start / melding','step':'Processtap','decision':'Beslissing','action':'Actie / taak','end':'Einde / besluit'};
  document.getElementById('np-hdr').style.background = TC[n.type]||'#005496';
  document.getElementById('np-type').textContent = TL[n.type]||'';
  document.getElementById('np-name').textContent = n.name||'';
  var body='';
  if(n.ctx) body+='<div class="np-sec"><div class="np-sec-title">Context</div><div style="font-size:.72rem;color:var(--sub);line-height:1.5;">'+escHtml(n.ctx)+'</div></div>';
  var myEdges=(p.edges||[]).filter(function(e){return e.from===id||e.to===id;});
  if(myEdges.length){
    body+='<div class="np-sec"><div class="np-sec-title">Verbindingen</div>';
    myEdges.forEach(function(e){
      var other=e.from===id?e.to:e.from; var on=p.nodes.find(function(x){return x.id===other;});
      body+='<div style="font-size:.68rem;color:var(--n);">'+(e.from===id?'\u2192':'\u2190')+' '+escHtml(on?on.name:'?')+(e.label?' <span style="opacity:.55;font-size:.6rem;">['+escHtml(e.label)+']</span>':'')+'</div>';
    });
    body+='</div>';
  }
  if(!body) body='<div class="np-sec"><div style="font-size:.68rem;color:var(--bd);">Geen extra informatie — klik Bewerken.</div></div>';
  document.getElementById('np-body').innerHTML=body;
  document.getElementById('node-popup').style.display='flex';
  document.body.style.overflow='hidden';
}

function closeNodePopup(){ var p=document.getElementById('node-popup'); if(p){p.style.display='none';} document.body.style.overflow=''; }
function popupEdit(){ closeNodePopup(); if(_popupNodeId) showNodeDetail(_popupNodeId); }
function popupDelete(){
  closeNodePopup();
  if(!_popupNodeId) return;
  var p=currentProc(); if(!p) return;
  var n=p.nodes.find(function(x){return x.id===_popupNodeId;});
  if(!confirm('Stap "'+(n?n.name:'')+'" verwijderen?')) return;
  p.nodes=p.nodes.filter(function(x){return x.id!==_popupNodeId;});
  p.edges=(p.edges||[]).filter(function(e){return e.from!==_popupNodeId&&e.to!==_popupNodeId;});
  selectedNodeId=null; saveProcesses(); renderCanvas(); showNodeDetail(null);
}
document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeNodePopup(); closeFaseEdit(); } });

/* ── Build default fasen from existing node-based data ── */
function buildDefaultFasen(procId) {
  /* returns pre-built fasen for known processes */
  if (procId === 'proc-jeugd-30') return buildJeugdFasen();
  if (procId === 'proc-wmo-30')   return buildWmoFasen();
  return [];
}

function mkFase(id,num,naam,faselabel,badge,kleur,ctx,secties,paden,optional) {
  return {id:id,num:num,naam:naam,faselabel:faselabel,badge:badge,kleur:kleur,ctx:ctx||'',secties:secties||[],paden:paden||[],optional:!!optional};
}
function mkSec(titel,vragen){ return {titel:titel, vragen:vragen}; }
function v(label,type){ return {label:label,type:type||'b'}; }
function pad(label,kleur){ return {label:label,kleur:kleur||'#64748B'}; }

function buildJeugdFasen() { return [
  mkFase('jf1','Zaakstap 10','Melding','Toegang','iJw \u00a7 Toegang','#005496',
    'Registratie hulpvraag, woonplaatsbeginsel, triage en gezinsgegevens.',
    [mkSec('Melding',[v('Datum ontvangst melding','g'),v('Woonplaatsbeginsel: Is Medemblik de uitvoerende gemeente?'),v('Woonplaatsbeginsel in CMG gecontroleerd op','g'),v('Is de jeugdige jonger dan 18 jaar?'),v('Type melding'),v('Is er toestemming van de gezaghebbenden?'),v('Aanmelding via'),v('Datum verhuizing naar gemeente Medemblik','g'),v('Uitkomst triage')]),
     mkSec('Ouders / Verzorgers',[v('Zijn de ouders op de hoogte van de aangevraagde zorg?'),v('Voor- en achternaam ouder/verzorger','g'),v('Rol'),v('Gezag'),v('Wil je nog een ouder / verzorger toevoegen?')]),
     mkSec('Contactpersonen',[v('Naam school','g'),v('Naam huisarts','g'),v('Naam medisch specialist','g')])],
    [pad('Onderzoek','#005496'),pad('Direct Besluitvorming','#F26722'),pad('Archiveren','#4A6180')]),
  mkFase('jf2','Zaakstap 20','Onderzoek','Toegang','iJw \u00a7 Onderzoek','#005496',
    'Gesprekken, leefgebieden, veiligheid, hulpvraag en resultaten vastleggen.',
    [mkSec('Gesprekken',[v('Om welk Perspectiefplan gaat het?'),v('Datum gesprek','g'),v('Datum tussenevaluatie','g'),v('Datum eindevaluatie','g'),v('Wil je een vervolggesprek toevoegen?')]),
     mkSec('Inhoud',[v('Kan er hulp geboden worden uit het voorliggende veld?'),v('Zijn er zorgen om de Veiligheid?'),v('Hoe gaat het op dit moment met: (leefgebieden)'),v('Resultaat 1 + wie helpt + begin/eind','g'),v('Wil je nog een resultaat toevoegen?'),v('Is er sprake van een ingekochte zorgaanbieder?')]),
     mkSec('Evaluatie vervolgdeel PP',[v('1. Zijn de resultaten uit het perspectiefplan behaald?'),v('2. Kan de indicatie gesloten worden?'),v('3. Per wanneer is de nieuwe situatie ontstaan?','g'),v('Datum ontvangst Vervolgdeel PP','g'),v('Wil je terug naar Melding voor een correctie?'),v('Wordt de melding ingetrokken?')])],
    [pad('Besluitvorming','#F26722'),pad('PP opstellen','#1D9E75'),pad('\u2190 Melding correctie','#4A6180'),pad('Ingetrokken','#94A3B8')]),
  mkFase('jf3','Zaakstap 30','PP opstellen','Toeleiden','iJw \u00a7 Toeleiden','#1D9E75',
    'Hulp, zorgaanbieder, indicatie en motivering perspectiefplan vastleggen.',
    [mkSec('Check',[v('Welk Perspectiefplan wil je opstellen?'),v('Er is gecontroleerd op lopende voorzieningen'),v('Er is gecontroleerd op stapeling')]),
     mkSec('Indicatie',[v('Startdatum','g'),v('Einddatum','g'),v('Zorgaanbieder','g'),v('Segment/Perceel','g'),v('Product','g'),v('Volume/eenheid/frequentie','g')]),
     mkSec('Motivering',[v('1. Stel vast wat de hulpvraag is','o'),v('2. Stel stoornissen/problemen vast','o'),v('3. Welke hulp is nodig?','o'),v('6. Individuele voorziening en in welke mate?','o')])],
    [pad('Controle Kwaliteit','#7F77DD'),pad('PP versturen','#1D9E75')]),
  mkFase('jf4','Zaakstap 40','Controle PP Kwaliteit','Kwaliteit','Kwaliteitsborging','#7F77DD',
    'Interne kwaliteitscheck v\u00f3\u00f3r verzending perspectiefplan aan inwoner.',
    [mkSec('Check',[v('Is de inhoud van het Perspectiefplan akkoord?'),v('Zijn er aanpassingen op het Perspectiefplan nodig?')])],
    [pad('PP versturen','#1D9E75'),pad('\u21A9 PP aanpassen','#F26722')]),
  mkFase('jf5','Zaakstap 50','PP versturen naar inwoner','Toeleiden','iJw \u00a7 Toeleiden','#1D9E75',
    'Verzending PP, akkoord inwoner en toestemming voor delen met zorgaanbieder.',
    [mkSec('Versturen',[v('Perspectiefplan is verstuurd op','g'),v('Verstuurd naar'),v('Is de inwoner akkoord met het Perspectiefplan?'),v('Wordt er een zorgaanbieder ingezet?'),v('Is er (mede) sprake van Pgb?')]),
     mkSec('Akkoord',[v('Akkoord op Perspectiefplan ontvangen op','g'),v('Toestemming voor het delen van het PP met de zorgaanbieder'),v('PGB-plan ontvangen op','g')])],
    [pad('Besluitvorming','#F26722')]),
  mkFase('jf6','Zaakstap 60','Besluitvorming','Besluit','iJw \u00a7 Besluit','#F26722',
    'Toekenning, afwijzing of intrekking per segment vastleggen, ZIN of PGB.',
    [mkSec('Besluit',[v('Besluit:'),v('Zijn wettelijke vertegenwoordigers vastgelegd in MC?'),v('Gecontroleerd op lopende voorzieningen?'),v('Gecontroleerd op stapeling?'),v('Is er medisch advies ingewonnen?')]),
     mkSec('Toekenning ZIN',[v('Leveringsvorm'),v('Segment / Aanvullende producten'),v('Ondersteuningsprofiel'),v('Startdatum 1','g'),v('Einddatum 1','g')]),
     mkSec('PGB',[v('Berekeningsformulier pgb toegevoegd?'),v('Startdatum PGB','g'),v('Einddatum PGB','g')])],
    [pad('Toekenning \u2192 Bestelling','#005496'),pad('Afwijzing','#E24B4A'),pad('Intrekking','#4A6180'),pad('Maatwerkovereenkomst','#94A3B8')]),
  mkFase('jf7','Zaakstap 70/80','Aanvraag + Controle maatwerkovereenkomst','Optioneel','Optioneel pad','#94A3B8',
    'Nieuwe aanbieder: maatwerkovereenkomst aanvragen, controleren en verwerken in PDC.',
    [mkSec('Aanvraag',[v('Aanbieder voldoet aan voorwaarden?'),v('KVK uittreksel toegevoegd?'),v('Begindatum','g'),v('Einddatum','g'),v('Datum start zorg','g'),v('Productcode + tarief + frequentie')]),
     mkSec('Controle',[v('Zijn gegevens compleet en correct?'),v('Datum verstuurd','g'),v('Datum retour ontvangst','g'),v('Maatwerkovereenkomst akkoord en ondertekend?'),v('Gegevens ingevoerd in PDC?')])],
    [pad('Bestelling plaatsen','#005496')],true),
  mkFase('jf8','Zaakstap 100','Bestelling plaatsen','Leveren','iJw \u00a7 Leveren','#005496',
    'Voorziening of PGB bestellen in productshop, verlenging duurzaam verwerken.',
    [mkSec('Verlenging duurzaam',[v('Is er sprake van Verlenging duurzaam?'),v('Voldoet de Verlenging duurzaam aan de voorwaarden?'),v('Eerste dag van verlenging arrangement','g'),v('Nieuwe einddatum arrangement','g')]),
     mkSec('Bestelling',[v('De voorziening / PGB is besteld in de productshop'),v('Bestelling komt overeen met gegevens Besluitvorming?'),v('Naar welk adres moet de beschikking gestuurd worden?'),v('Betreft het crisis?'),v('Is er (mede) sprake van Pgb?')])],
    [pad('Bestelling controleren','#005496'),pad('PGB berekening controleren','#94A3B8')]),
  mkFase('jf8b','Zaakstap 110','PGB: Berekening controleren','Optioneel','Optioneel \u2014 bij PGB','#94A3B8',
    'Berekeningsformulier PGB en bestelling controleren op juistheid.',
    [mkSec('Controle',[v('Zijn PGB berekeningsformulier en bestelling juist ingevuld?')])],
    [pad('Bestelling controleren','#005496')],true),
  mkFase('jf9','Zaakstap 120','Bestelling controleren','Leveren','Backoffice controle','#005496',
    'Backoffice controle van de bestelling v\u00f3\u00f3r definitieve verwerking.',
    [mkSec('Controle',[v('Is de bestelling akkoord?'),v('Correctie nodig door:')])],
    [pad('Opstellen beschikking','#005496'),pad('\u21A9 Correctie','#F26722')]),
  mkFase('jf10','Zaakstap 130','Opstellen beschikking','Leveren','iJw \u00a7 Leveren','#005496',
    'Beschikking opmaken en verzenden naar inwoner via post, e-mail of DigiD.',
    [mkSec('Beschikking',[v('Is de beschikking verzonden?'),v('Beschikking verzonden op:','g'),v('Verstuurd via (post/e-mail/DigiD)'),v('e-mailadres is gecontroleerd'),v('Is er alsnog een correctie van de bestelling nodig?'),v('Is er sprake van ASH zonder crisis?'),v('Is er (mede) sprake van Pgb?')])],
    [pad('Regie en Monitoren','#1D9E75'),pad('PGB: Controle PDC','#94A3B8')]),
  mkFase('jf10b','Zaakstap 140','PGB: Controle verwerking PDC','Optioneel','Optioneel \u2014 bij PGB','#94A3B8',
    'Verificatie PGB verwerking in PDC en melding PGB bij SVB.',
    [mkSec('Controle',[v('PGB correct verwerkt in de PDC?'),v('Datum melding pgb bij SVB','g'),v('Zaak doorzetten naar Regie en Monitoren?')])],
    [pad('Regie en Monitoren','#1D9E75')],true),
  mkFase('jf11','Zaakstap 150','Regie en Monitoren','Regie','iJw \u00a7 Regie','#1D9E75',
    'Lopend toezicht op zorglevering, periodieke evaluatie en terugkoppeling.',
    [mkSec('Evaluatie',[v('Wat wil je vastleggen?'),v('Datum evaluatie','g'),v('Startdatum huidige toewijzing','g'),v('Is er een onafhankelijke cli\u00ebntondersteuner aanwezig?'),v('Wat is het vervolg?')])],
    [pad('\u21A9 Regie voortzetten','#1D9E75'),pad('Besluitvorming','#F26722'),pad('Archiveren','#4A6180')]),
  mkFase('jf12','Zaakstap 160','Archiveren','Afsluiting','Afsluiting dossier','#4A6180',
    'Beschikkingen, PP en documenten aangevinkt. Zaak gereed voor sluiting.',
    [mkSec('Afsluiting',[v('Zijn beschikking(en), PP en documenten aangevinkt?'),v('Kan de zaak afgesloten worden?')])],
    [pad('Toetsing Kwaliteit','#7F77DD'),pad('Sluit Zaak','#002E56')]),
  mkFase('jf12b','Zaakstap 170','Toetsing Kwaliteit (Jeugd)','Kwaliteit','Optioneel \u2014 1 op 10','#7F77DD',
    'Steekproefsgewijze kwaliteitstoetsing (1 op de 10 zaken).',
    [mkSec('Toetsing',[v('Wordt deze zaak getoetst?'),v('Is het Toetsplan ingevuld en toegevoegd?')])],
    [pad('Sluit Zaak','#002E56')],true),
  mkFase('jf13','Zaakstap 221','Sluit Zaak','Afsluiting','Definitieve afsluiting','#002E56',
    'Definitieve afsluiting met afsluitreden en zaakresultaat in MensCentraal.',
    [mkSec('Sluiting',[v('Afsluitreden MC'),v('Zaakresultaat')])],[])
];}

function buildWmoFasen() { return [
  mkFase('wf1','Zaakstap 10','Toegang \u2013 Melding','Beoordelen','iWmo \u00a7 Beoordelen','#005496',
    'Eerste contact, registratie hulpvraag, screening en triage.',
    [mkSec('Melding',[v('Soort melding'),v('Datum melding','g'),v('Melding door (cli\u00ebnt / verwijzer / aanbieder)'),v('Heeft u al eerder Wmo ondersteuning gehad?'),v('Wat is het vervolg?'),v('Resultaat screening'),v('Mate van regie voering'),v('Wil je een afspraak plannen / Onderzoek / Heronderzoek','o'),v('Eventuele toelichting bij Informatie en Advies','o')])],
    [pad('Afspraak maken','#005496'),pad('Direct archiveren','#4A6180')]),
  mkFase('wf2','Zaakstap 20','Afspraak maken / Gesprek','Beoordelen','iWmo \u00a7 Beoordelen','#005496',
    'Contact leggen, afspraak inplannen, afspraakbevestiging versturen.',
    [mkSec('Afspraak',[v('Contact gekregen met inwoner?'),v('Wanneer eerste contact gezocht?','g'),v('Datum afspraak','g'),v('Tijdstip afspraak','g'),v('Afspraak is (soort)'),v('Wie gaat er op huisbezoek?'),v('Datum afspraakbevestiging verstuurd','g'),v('Wil je een afspraakbevestiging sturen?','o'),v('Aanwezigen gesprek','o')])],
    [pad('Onderzoek','#005496')]),
  mkFase('wf3','Zaakstap 30','Onderzoek \u2013 Keukentafelgesprek','Beoordelen','iWmo \u00a7 Beoordelen','#005496',
    'Beoordeling hulpbehoefte, leefgebieden, resultaten en financieringsvorm.',
    [mkSec('Gesprek',[v('Datum gesprek','g'),v('Was de afspraak fysiek of digitaal?'),v('Identiteitscheck uitgevoerd?'),v('Is er aanleiding om een Wlz-check uit te voeren?'),v('Datum Wlz-check uitgevoerd','g'),v('Uitkomst Wlz-check'),v('Over welke leefgebieden is gesproken?'),v('Wmo-voorziening inzetten?'),v('Eigen bijdrage van toepassing?'),v('Financieringsvorm toekenning (ZIN / PGB SVB / PGB Eenmalig)'),v('Evaluatiedatum (verwacht)','g'),v('1-5 Resultaat + wie ondersteunt + verwacht begin/eind','o'),v('Afspraken rondom regie','o')])],
    [pad('Vervolgdeel PP','#16BECF'),pad('Intrekking','#F26722'),pad('Direct Besluitvorming','#002E56')]),
  mkFase('wf4','Zaakstap 40','Intrekking','Optioneel','Optioneel \u2014 v\u00f3\u00f3r besluit','#F26722',
    'Aanvraag ingetrokken voor besluit. Datum, voorziening en reden vastleggen.',
    [mkSec('Intrekking',[v('Datum telefoongesprek intrekking','g'),v('Welke voorziening was aangevraagd?'),v('Reden intrekking')])],
    [pad('Archiveren','#4A6180')],true),
  mkFase('wf5','Zaakstap 60','Vervolgdeel Perspectiefplan','Toeleiden','iWmo \u00a7 Toeleiden','#16BECF',
    'Evaluatie resultaten, vervolgbesluit en nieuwe indicatie vastleggen.',
    [mkSec('Evaluatie',[v('Welke evaluatie vastleggen (start/tussenevaluatie/eindevaluatie)?'),v('Datum evaluatie','g'),v('Datum start arrangement','g'),v('Datum eindevaluatie','g'),v('Cli\u00ebntondersteuner aanwezig?'),v('Zijn de resultaten uit het perspectiefplan behaald?'),v('Kan de indicatie gesloten worden?'),v('Worden er nieuwe resultaten afgesproken?'),v('Wat is het vervolg?'),v('Geplande datum volgende evaluatie','g')])],
    [pad('PP versturen','#16BECF')]),
  mkFase('wf6','Zaakstap 70','Versturen Perspectiefplan','Toeleiden','iWmo \u00a7 Toeleiden','#16BECF',
    'PP ondertekend retour ontvangen, bevestiging verzenden.',
    [mkSec('Versturen',[v('Datum versturen perspectiefplan','g'),v('Perspectiefplan retour ontvangen?'),v('Datum perspectiefplan retour ontvangen','g'),v('Is het perspectiefplan ondertekend?'),v('Datum ondertekening door inwoner','g'),v('Ondertekend perspectiefplan ge\u00fcpload?')])],
    [pad('Besluitvorming','#002E56'),pad('PGB Controle','#F26722')]),
  mkFase('wf7','Zaakstap 80','PGB Controle','Optioneel','Optioneel \u2014 bij PGB','#F26722',
    'Volledigheidscheck PGB documenten (budgetplan, VOG, KVK, offerte).',
    [mkSec('PGB documenten',[v('Waarvoor PGB aangevraagd?'),v('Perspectiefplan aanwezig?'),v('Berekening aanwezig + correct?'),v('PGB Budgetplan ge\u00fcpload?'),v('Zorgplan aanwezig?'),v('VOG aanwezig?'),v('KVK uittreksel aanwezig?'),v('Offerte aanwezig?'),v('PGB akkoord?')])],
    [pad('Besluitvorming','#002E56')],true),
  mkFase('wf8','Zaakstap 90','Besluitvorming','Toeleiden','iWmo \u00a7 Toeleiden','#002E56',
    'Toekennen, deels toekennen of afwijzen, financieringsvorm vastleggen.',
    [mkSec('Besluit',[v('Besluit (toekenning / deels / afwijzing)'),v('Betreft het een herziening?'),v('Is er (medisch) advies ingewonnen?'),v('Eigen bijdrage van toepassing?'),v('Financieringsvorm toekenning (ZIN / PGB SVB / PGB Eenmalig)'),v('Toekenning: HO / Begeleiding / HHT / Dagbesteding / Kortdurend verblijf'),v('Startdatum / Einddatum per voorziening','g'),v('Niveau + Zorgaanbieder per voorziening'),v('Wat hebben wij besloten? (in te zetten zorg)'),v('Waarom hebben wij dit besloten? (motivering)'),v('Startdatum ondersteuning','g'),v('Tot wanneer is het besluit geldig?','g')])],
    [pad('Toekenning \u2192 Beschikken','#21B685'),pad('Afwijzing \u2192 Beschikken','#F26722'),pad('Maatwerkovereenkomst','#64748B')]),
  mkFase('wf8b','Zaakstap 100/110/120','Aanvraag maatwerkovereenkomst','Optioneel','Optioneel pad','#64748B',
    'Incidentele maatwerkovereenkomst aanvragen, controleren en verwerken.',
    [mkSec('Aanvraag',[v('Aanbieder voldoet aan voorwaarden?'),v('KVK uittreksel aanwezig?','g'),v('Datum start / einddatum zorg','g'),v('Productcode + tarief + frequentie'),v('Datum verstuurd / retour ontvangen','g'),v('Maatwerkovereenkomst akkoord en ondertekend?')])],
    [pad('Beschikken','#21B685')],true),
  mkFase('wf9','Zaakstap 130','Beschikken','Leveren','iWmo \u00a7 Leveren','#21B685',
    'Beschikking opmaken en versturen naar inwoner, normenkader aanbieder zenden.',
    [mkSec('Beschikking',[v('Datum besluit','g'),v('Beschikking gemaakt en verstuurd?'),v('Heb je Normenkader verstuurd aan zorgaanbieder (HO)?'),v('Het vervolg (volgende zaakstap)'),v('Is dit een zaak langs kwaliteit? (1 op de 10)')])],
    [pad('Archiveren & Sluiten','#4A6180')]),
  mkFase('wf10','Zaakstap 190/251','Archiveren & Zaak sluiten','Afsluiting','iWmo \u00a7 Afsluiting','#4A6180',
    'Dossier afsluiten: beschikkingen aangevinkt, zaakresultaat vastleggen.',
    [mkSec('Afsluiting',[v('Kan de zaak gesloten worden?'),v('Datum sluiting','g'),v('Ondernomen actie (bij sluiting)','o'),v('Bijzonderheden sluit zaak','o'),v('Doorlooptijd totaal (datum melding \u2192 datum sluiting)','g')])],[])
];}

/* ── Inject WMO + Jeugd processes ── */
(function() {
  var ADD = [
    {id:'proc-wmo-30',   name:'WMO 3.0 Toegang', cat:'WMO'},
    {id:'proc-jeugd-30', name:'Toegang Jeugd 3.0', cat:'Jeugd'}
  ];
  var REMOVE = ['proc-1781248424957']; /* old "WMO melding" duplicate */

  function inject() {
    REMOVE.forEach(function(rid){
      var idx=processes.findIndex(function(p){return p.id===rid;}); if(idx>=0) processes.splice(idx,1);
    });
    var changed=false;
    ADD.forEach(function(def){
      if(!processes.find(function(p){return p.id===def.id;})){
        processes.push({id:def.id,name:def.name,cat:def.cat,nodes:[],edges:[],fasen:null});
        changed=true;
      }
    });
    if(changed) saveProcesses();
    if(typeof renderProcLibrary==='function') renderProcLibrary();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',inject);
  else setTimeout(inject,0);
})();
/* ════════════════════════════════════════════════════════════
   CANVAS ZOOM + PAN
   - Scroll wheel: zoom op muiscursor
   - Rechtermuisknop drag: pan
   - Klik op lege canvas ruimte + drag: pan
   - Spatie + drag: pan
   ════════════════════════════════════════════════════════════ */
(function() {
  var scale = 1, offsetX = 0, offsetY = 0;
  var MIN = 0.15, MAX = 2.0;
  var isPanning = false, spaceDown = false;
  var panSX = 0, panSY = 0, panOX = 0, panOY = 0;

  function wrap()   { return document.getElementById('proc-canvas-wrap'); }
  function canvas() { return document.getElementById('proc-canvas'); }

  function apply() {
    var c = canvas(); if (!c) return;
    c.style.transform = 'translate(' + offsetX + 'px,' + offsetY + 'px) scale(' + scale + ')';
    c.style.transformOrigin = '0 0';
    var ind = document.getElementById('canvas-zoom-pct');
    if (ind) ind.textContent = Math.round(scale * 100) + '%';
    if (typeof renderEdges === 'function') renderEdges();
  }

  function startPan(clientX, clientY) {
    isPanning = true;
    panSX = clientX; panSY = clientY;
    panOX = offsetX; panOY = offsetY;
    var w = wrap(); if (w) w.style.cursor = 'grabbing';
  }

  function doPan(clientX, clientY) {
    offsetX = panOX + (clientX - panSX);
    offsetY = panOY + (clientY - panSY);
    apply();
  }

  function endPan() {
    isPanning = false;
    var w = wrap(); if (w) w.style.cursor = spaceDown ? 'grab' : '';
  }

  function zoomAt(cx, cy, delta) {
    var w = wrap(); if (!w) return;
    var r = w.getBoundingClientRect();
    var mx = cx - r.left, my = cy - r.top;
    var ns = Math.min(MAX, Math.max(MIN, scale * delta));
    var sc = ns / scale;
    offsetX = mx - sc * (mx - offsetX);
    offsetY = my - sc * (my - offsetY);
    scale = ns;
    apply();
  }

  window.canvasReset = function() { scale=1; offsetX=0; offsetY=0; apply(); };
  window.canvasZoomIn  = function() { var w=wrap(); if(!w) return; var r=w.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 1.2); };
  window.canvasZoomOut = function() { var w=wrap(); if(!w) return; var r=w.getBoundingClientRect(); zoomAt(r.left+r.width/2, r.top+r.height/2, 0.83); };
  window.canvasFit = function() {
    var w = wrap(); if (!w) return;
    var p = typeof currentProc === 'function' ? currentProc() : null;
    if (!p || !p.nodes || !p.nodes.length) { window.canvasReset(); return; }
    var minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9;
    p.nodes.forEach(function(n) {
      minX=Math.min(minX,n.x); minY=Math.min(minY,n.y);
      maxX=Math.max(maxX,n.x+260); maxY=Math.max(maxY,n.y+130);
    });
    var pad=40;
    scale = Math.min(MAX, Math.max(MIN, Math.min((w.clientWidth-pad*2)/(maxX-minX), (w.clientHeight-pad*2)/(maxY-minY))));
    offsetX = pad - minX*scale;
    offsetY = pad - minY*scale;
    apply();
  };

  function init() {
    var w = wrap();
    if (!w) { setTimeout(init, 200); return; }

    /* ── Wheel zoom ── */
    w.addEventListener('wheel', function(e) {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 0.89);
    }, {passive: false});

    /* ── Mousedown: start pan on right-click, middle-click, space+left, or empty canvas left-click ── */
    w.addEventListener('mousedown', function(e) {
      var isRightOrMiddle = e.button === 1 || e.button === 2;
      var isSpaceLeft     = e.button === 0 && spaceDown;
      /* left-click on the wrap or canvas background (not on a node) */
      var isEmptyLeft     = e.button === 0 && (e.target === w || e.target.id === 'proc-canvas');

      if (isRightOrMiddle || isSpaceLeft || isEmptyLeft) {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
      }
    });

    /* suppress context menu so right-drag doesn't open menu */
    w.addEventListener('contextmenu', function(e) { e.preventDefault(); });

    document.addEventListener('mousemove', function(e) {
      if (!isPanning) return;
      doPan(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', function(e) {
      if (isPanning) endPan();
    });

    /* ── Space key ── */
    document.addEventListener('keydown', function(e) {
      if (e.code === 'Space' && !e.target.matches('input,textarea,select')) {
        e.preventDefault();
        if (!spaceDown) { spaceDown = true; var w2=wrap(); if(w2) w2.style.cursor='grab'; }
      }
    });
    document.addEventListener('keyup', function(e) {
      if (e.code === 'Space') {
        spaceDown = false;
        var w3 = wrap(); if (w3 && !isPanning) w3.style.cursor = '';
      }
    });

    /* ── Fit when process opens ── */
    var _origOP = openProcess;
    openProcess = function(id) {
      _origOP.apply(this, arguments);
      setTimeout(window.canvasFit, 100);
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 0);
})();
/* ════════════════════════════════════════════════════════════
   UPDATES v3 — bugfixes + 3-kolom optioneel layout
   ════════════════════════════════════════════════════════════ */

var _wizType = 'canvas';
var _currentFaseEditId = null; /* separate name to avoid conflict with fase_flow.js */

/* ── Wizard ── */
createProcess = function() { openProcWizard(); };

function openProcWizard() {
  _wizType = 'canvas';
  var el = document.getElementById('wiz-naam');
  var cs = document.getElementById('wiz-cat');
  if (el) el.value = '';
  if (cs) cs.value = '';
  selectWizType('canvas');
  var wiz = document.getElementById('proc-wizard');
  if (wiz) { wiz.style.display = 'flex'; setTimeout(function(){ if(el) el.focus(); }, 80); }
}

function closeProcWizard() {
  var wiz = document.getElementById('proc-wizard');
  if (wiz) wiz.style.display = 'none';
}

function selectWizType(type) {
  _wizType = type;
  var cc = document.getElementById('wiz-choice-canvas');
  var cf = document.getElementById('wiz-choice-flow');
  if (cc) cc.classList.toggle('active', type === 'canvas');
  if (cf) cf.classList.toggle('active',  type === 'flow');
}

function confirmCreateProc() {
  var naamEl = document.getElementById('wiz-naam');
  var catEl  = document.getElementById('wiz-cat');
  var naam = naamEl ? (naamEl.value.trim() || 'Nieuw proces') : 'Nieuw proces';
  var cat  = catEl  ? catEl.value : '';
  closeProcWizard();
  if (_wizType === 'flow') {
    var pf = {id: newProcId(), name: naam, cat: cat, type: 'flow', nodes: [], edges: [], fasen: []};
    processes.push(pf);
    saveProcesses();
    openFaseProc(pf.id);
  } else {
    var pc = {id: newProcId(), name: naam, cat: cat, type: 'canvas', nodes: [], edges: []};
    processes.push(pc);
    saveProcesses();
    currentProcId = pc.id;
    selectedNodeId = null;
    connectMode = false;
    connectFrom = null;
    document.getElementById('proc-name-input').value = pc.name || '';
    var cSel = document.getElementById('proc-cat-select');
    if (cSel) cSel.value = pc.cat || '';
    procShowEditor();
    if (typeof rebuildDefPicker === 'function') rebuildDefPicker();
    renderCanvas();
    showNodeDetail(null);
  }
}

/* ── renderProcLibrary: type badges ── */
var _origRPL = renderProcLibrary;
renderProcLibrary = function() {
  _origRPL.apply(this, arguments);
  var grid = document.getElementById('proc-grid');
  if (!grid) return;
  grid.querySelectorAll('.proc-card:not(.proc-card-new):not(.proc-card-jeugd)').forEach(function(card) {
    if (card.querySelector('.proc-type-badge')) return;
    var m = (card.getAttribute('onclick') || '').match(/'([^']+)'/);
    if (!m) return;
    var p = processes.find(function(x){ return x.id === m[1]; });
    if (!p) return;
    var isFlow = p.type === 'flow' || (typeof FASE_PROC_IDS !== 'undefined' && FASE_PROC_IDS.indexOf(m[1]) >= 0);
    var badge = document.createElement('div');
    badge.className = 'proc-type-badge ' + (isFlow ? 'proc-type-flow-badge' : 'proc-type-schema-badge');
    badge.innerHTML = isFlow ? '\u2261 Stapsgewijs' : '\u29c6 Schema';
    card.insertBefore(badge, card.firstChild);
    if (isFlow) card.classList.add('proc-card-flow');
  });
};

/* ── renderFaseFlow: 3-kolom optioneel layout ── */
renderFaseFlow = function() {
  var p = processes.find(function(x){ return x.id === currentProcId; });
  if (!p) return;
  var container = document.getElementById('fase-flow-content');
  if (!container) return;
  var fasen = p.fasen || [];

  /* Group optionals with NEXT main fase */
  var groups = [];
  var pending = [];
  fasen.forEach(function(f) {
    if (f.optional) { pending.push(f); }
    else { groups.push({main: f, opts: pending}); pending = []; }
  });
  if (pending.length) groups.push({main: null, opts: pending});

  var html = '';
  groups.forEach(function(grp, gi) {
    if (gi > 0) html += '<div class="ff-conn"><div class="ff-arr"></div></div>';

    var hasOpts = grp.opts.length > 0;
    var hasMain = !!grp.main;

    if (hasMain && !hasOpts) {
      /* Simple main fase */
      html += '<div class="ff-row-single" onclick="openFaseEditPopup(\'' + grp.main.id + '\')">';
      html += renderFaseBlock(grp.main);
      html += '</div>';
    } else if (hasMain && hasOpts) {
      /* Find next main for "returns to" */
      var nextMain = null;
      for (var ni = gi + 1; ni < groups.length; ni++) {
        if (groups[ni].main) { nextMain = groups[ni].main; break; }
      }
      /* 3-column grid: main + up to 2 optional columns */
      html += '<div class="ff-3col">';
      /* main col */
      html += '<div class="ff-3col-main" onclick="openFaseEditPopup(\'' + grp.main.id + '\')">';
      html += renderFaseBlock(grp.main);
      html += '</div>';
      /* optional cols */
      grp.opts.forEach(function(opt) {
        var k = opt.kleur || '#94A3B8';
        html += '<div class="ff-3col-opt">';
        html += '<div class="ff-opt-header2">'
          + '<span class="ff-opt-dot" style="background:' + k + ';"></span>'
          + '<span class="ff-opt-lbl" style="color:' + k + ';">Optioneel</span>'
          + '<div class="ff-opt-hline2" style="border-color:' + k + '40;"></div>'
          + '</div>';
        html += '<div onclick="openFaseEditPopup(\'' + opt.id + '\')">';
        html += renderFaseBlockOpt(opt, nextMain);
        html += '</div>';
        html += '</div>';
      });
      html += '</div>'; /* ff-3col */
    } else {
      /* Only optionals (no main) */
      grp.opts.forEach(function(opt, oi) {
        if (oi > 0) html += '<div class="ff-conn"><div class="ff-arr"></div></div>';
        html += '<div onclick="openFaseEditPopup(\'' + opt.id + '\')">' + renderFaseBlock(opt) + '</div>';
      });
    }
  });

  html += '<div class="ff-conn"><div class="ff-arr"></div></div>';
  html += '<div class="ff-einde"><div class="ff-einde-pill">Zaak gesloten</div></div>';
  container.innerHTML = html;
};

function renderFaseBlockOpt(fase, nextMain) {
  var k = fase.kleur || '#94A3B8';
  var secties = fase.secties || [];
  var tagMap = {g:'ff-tg',b:'ff-tb',o:'ff-to',p:'ff-tp'};
  var allV = secties.reduce(function(a,s){ return a.concat(s.vragen||[]); }, []);

  var html = '<div class="ff-fase ff-fase-opt" style="border:1.5px dashed ' + k + ';border-left:4px dashed ' + k + ';">';
  html += '<div class="ff-fase-tag" style="background:' + k + ';opacity:.8;">' + escHtml(fase.faselabel || 'Opt') + '</div>';
  html += '<div class="ff-fase-body">';
  html += '<div class="ff-stap" style="background:' + k + ';opacity:.88;">';
  html += '<div class="ff-stap-l"><span class="ff-num">' + escHtml(fase.num || '') + '</span><div>';
  html += '<div class="ff-title">' + escHtml(fase.naam || '') + '</div>';
  if (fase.ctx) html += '<div class="ff-sub">' + escHtml(fase.ctx) + '</div>';
  html += '</div></div>';
  if (fase.badge) html += '<span class="ff-badge">' + escHtml(fase.badge) + '</span>';
  html += '</div>';

  var firstSec = secties[0];
  if (firstSec && firstSec.vragen && firstSec.vragen.length) {
    html += '<div class="ff-data">';
    if (firstSec.titel) html += '<div class="ff-data-title">' + escHtml(firstSec.titel) + '</div>';
    html += '<div class="ff-tags">';
    firstSec.vragen.slice(0, 3).forEach(function(v) {
      html += '<span class="ff-tag ' + (tagMap[v.type]||'ff-tb') + '">' + escHtml(v.label) + '</span>';
    });
    if (allV.length > 3) html += '<span class="ff-tag ff-tc">+' + (allV.length-3) + '</span>';
    html += '</div></div>';
  }

  if (fase.paden && fase.paden.length) {
    html += '<div class="ff-paden">';
    fase.paden.forEach(function(pad) {
      html += '<span class="ff-pad" style="border-color:' + escHtml(pad.kleur||'#64748B') + ';color:' + escHtml(pad.kleur||'#64748B') + ';">\u2192 ' + escHtml(pad.label) + '</span>';
    });
    html += '</div>';
  }

  if (nextMain) {
    html += '<div class="ff-opt-return">\u21A9 ' + escHtml(nextMain.naam || '') + '</div>';
  }
  html += '</div></div>';
  return html;
}

/* ── Fase edit popup (centered) ── */
openFaseEdit = function(id) { openFaseEditPopup(id); };
closeFaseEdit = function() { closeFaseEditPopup(); };

function openFaseEditPopup(faseId) {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var fase = (p.fasen||[]).find(function(f){ return f.id === faseId; }); if (!fase) return;
  _currentFaseEditId = faseId;
  /* hide right panel */
  var rp = document.getElementById('fase-edit-panel');
  if (rp) rp.style.display = 'none';

  var popup = document.getElementById('fase-edit-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'fase-edit-popup';
    popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,46,86,.45);z-index:600;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);';
    popup.onclick = function(e){ if(e.target===popup) closeFaseEditPopup(); };
    popup.innerHTML = buildFasePopupHTML();
    document.body.appendChild(popup);
  }
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  fillFasePopup(fase);
}

function buildFasePopupHTML() {
  return '<div style="background:var(--w);border-radius:14px;width:100%;max-width:700px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,46,86,.35);overflow:hidden;animation:npIn .18s ease;" onclick="event.stopPropagation()">'
    + '<div id="fpp-hdr" style="padding:14px 18px;display:flex;align-items:center;gap:10px;flex-shrink:0;">'
    + '<div style="flex:1;min-width:0;">'
    + '<div id="fpp-num-lbl" style="font-size:.6rem;background:rgba(255,255,255,.2);display:inline-block;padding:1px 8px;border-radius:6px;color:rgba(255,255,255,.85);margin-bottom:3px;"></div>'
    + '<input id="fpp-naam" style="font-family:inherit;font-size:.95rem;font-weight:700;color:#fff;background:none;border:none;outline:none;width:100%;display:block;" placeholder="Naam fase…" oninput="updateFasePopup()">'
    + '</div>'
    + '<button onclick="closeFaseEditPopup()" style="background:rgba(255,255,255,.15);border:none;border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;flex-shrink:0;">'
    + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    + '</button></div>'
    + '<div style="flex:1;min-height:0;display:grid;grid-template-columns:220px 1fr;overflow:hidden;">'
    /* LEFT: meta fields */
    + '<div style="padding:14px 14px;border-right:1px solid var(--bd);overflow-y:auto;display:flex;flex-direction:column;gap:9px;background:var(--lg);">'
    + '<div><label class="fep-label">Zaakstap nr.</label><input class="fep-input" id="fpp-num" placeholder="Zaakstap 10" oninput="updateFasePopup()"></div>'
    + '<div><label class="fep-label">Fase-label</label><input class="fep-input" id="fpp-faselabel" placeholder="Toegang" oninput="updateFasePopup()"></div>'
    + '<div><label class="fep-label">Badge</label><input class="fep-input" id="fpp-badge" placeholder="iJw § Toegang" oninput="updateFasePopup()"></div>'
    + '<div style="display:flex;gap:8px;align-items:flex-end;"><div style="flex:1;"><label class="fep-label">Kleur</label><input type="color" id="fpp-kleur" onchange="updateFasePopup()" style="width:100%;height:34px;border:1px solid var(--bd);border-radius:7px;padding:2px;cursor:pointer;"></div></div>'
    + '<div><label class="fep-label">Context</label><textarea class="fep-input" id="fpp-ctx" rows="3" style="resize:none;line-height:1.5;" oninput="updateFasePopup()"></textarea></div>'
    + '<div style="display:flex;align-items:center;gap:7px;"><input type="checkbox" id="fpp-optional" onchange="updateFasePopup()" style="width:14px;height:14px;cursor:pointer;"><label for="fpp-optional" style="font-size:.68rem;color:var(--sub);cursor:pointer;">Optioneel pad</label></div>'
    + '<div><label class="fep-label">Vervolgpaden <button onclick="addFppPad()" style="font-family:inherit;font-size:.58rem;background:var(--s);color:#fff;border:none;border-radius:5px;padding:2px 7px;cursor:pointer;margin-left:4px;">+ Pad</button></label><div id="fpp-paden" style="display:flex;flex-direction:column;gap:4px;margin-top:4px;"></div></div>'
    + '<div style="margin-top:auto;padding-top:6px;"><button onclick="deleteFasePopup()" style="font-family:inherit;font-size:.67rem;font-weight:600;border:1.5px solid var(--bd);border-radius:8px;padding:6px 10px;cursor:pointer;color:#993C1D;background:none;width:100%;" onmouseover="this.style.borderColor=\'#E24B4A\'" onmouseout="this.style.borderColor=\'var(--bd)\'">Fase verwijderen</button></div>'
    + '</div>'
    /* RIGHT: secties + vragen */
    + '<div style="padding:14px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">'
    + '<span class="fep-label" style="margin-bottom:0;">Vragen per sectie</span>'
    + '<button onclick="addFppSectie()" style="font-family:inherit;font-size:.62rem;background:var(--s);color:#fff;border:none;border-radius:6px;padding:3px 9px;cursor:pointer;">+ Sectie</button>'
    + '</div>'
    + '<div id="fpp-secties"></div>'
    + '</div>'
    + '</div></div>';
}

function fillFasePopup(fase) {
  var hdr = document.getElementById('fpp-hdr'); if (!hdr) return;
  hdr.style.background = fase.kleur || '#005496';
  document.getElementById('fpp-num-lbl').textContent  = fase.num || '';
  document.getElementById('fpp-naam').value           = fase.naam || '';
  document.getElementById('fpp-num').value            = fase.num || '';
  document.getElementById('fpp-faselabel').value      = fase.faselabel || '';
  document.getElementById('fpp-badge').value          = fase.badge || '';
  document.getElementById('fpp-kleur').value          = fase.kleur || '#005496';
  document.getElementById('fpp-ctx').value            = fase.ctx || '';
  document.getElementById('fpp-optional').checked     = !!fase.optional;
  renderFppPaden(fase);
  renderFppSecties(fase);
}

function updateFasePopup() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var f = (p.fasen||[]).find(function(x){ return x.id === _currentFaseEditId; }); if (!f) return;
  f.naam       = document.getElementById('fpp-naam').value;
  f.num        = document.getElementById('fpp-num').value;
  f.faselabel  = document.getElementById('fpp-faselabel').value;
  f.badge      = document.getElementById('fpp-badge').value;
  f.kleur      = document.getElementById('fpp-kleur').value;
  f.ctx        = document.getElementById('fpp-ctx').value;
  f.optional   = document.getElementById('fpp-optional').checked;
  var hdr = document.getElementById('fpp-hdr');
  if (hdr) hdr.style.background = f.kleur;
  document.getElementById('fpp-num-lbl').textContent = f.num || '';
  saveProcesses(); renderFaseFlow();
}

function closeFaseEditPopup() {
  _currentFaseEditId = null;
  var pop = document.getElementById('fase-edit-popup');
  if (pop) pop.style.display = 'none';
  document.body.style.overflow = '';
  renderFaseFlow();
}

function deleteFasePopup() {
  var p = processes.find(function(x){ return x.id === currentProcId; }); if (!p) return;
  var f = (p.fasen||[]).find(function(x){ return x.id === _currentFaseEditId; });
  if (!confirm('Fase "' + (f ? f.naam : '') + '" verwijderen?')) return;
  p.fasen = (p.fasen||[]).filter(function(x){ return x.id !== _currentFaseEditId; });
  saveProcesses(); closeFaseEditPopup();
}

/* Paden in popup */
function renderFppPaden(fase) {
  var el = document.getElementById('fpp-paden'); if (!el) return;
  var paden = fase.paden || [];
  if (!paden.length) { el.innerHTML = '<span style="font-size:.62rem;color:var(--bd);">Nog geen paden</span>'; return; }
  el.innerHTML = paden.map(function(pad, i) {
    return '<div style="display:flex;align-items:center;gap:4px;">'
      + '<input type="color" value="' + escHtml(pad.kleur||'#64748B') + '" onchange="updateFppPadKleur('+i+',this.value)" style="width:26px;height:26px;border:1px solid var(--bd);border-radius:5px;padding:1px;cursor:pointer;flex-shrink:0;">'
      + '<input class="fep-v-inp" value="' + escHtml(pad.label||'') + '" oninput="updateFppPadLabel('+i+',this.value)" placeholder="Label…">'
      + '<button onclick="removeFppPad('+i+')" class="fep-del-btn">\u00d7</button></div>';
  }).join('');
}
function addFppPad() {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(!f.paden) f.paden=[];
  f.paden.push({label:'Nieuw pad',kleur:'#1D9E75'});
  saveProcesses(); renderFppPaden(f); renderFaseFlow();
}
function removeFppPad(i) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  f.paden.splice(i,1); saveProcesses(); renderFppPaden(f); renderFaseFlow();
}
function updateFppPadLabel(i,val) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.paden[i]) f.paden[i].label=val; saveProcesses(); renderFaseFlow();
}
function updateFppPadKleur(i,val) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.paden[i]) f.paden[i].kleur=val; saveProcesses(); renderFaseFlow();
}

/* Secties in popup */
function renderFppSecties(fase) {
  var el = document.getElementById('fpp-secties'); if (!el) return;
  var secs = fase.secties || [];
  var TL = {g:'Datum',b:'Beslissing',o:'Optioneel',p:'Uitkomst'};
  el.innerHTML = secs.map(function(sec, si) {
    return '<div class="fep-sectie">'
      + '<div class="fep-sectie-hdr"><input class="fep-sec-title-inp" value="'+escHtml(sec.titel||'')+'" oninput="updateFppSecTitel('+si+',this.value)" placeholder="Sectietitel…"><button onclick="removeFppSec('+si+')" class="fep-del-btn">\u00d7</button></div>'
      + (sec.vragen||[]).map(function(v,vi){
          return '<div class="fep-vraag-row">'
            + '<select class="fep-type-sel" onchange="updateFppVraagType('+si+','+vi+',this.value)">'
            + ['g','b','o','p'].map(function(t){ return '<option value="'+t+'"'+(v.type===t?' selected':'')+'>'+TL[t]+'</option>'; }).join('')
            + '</select>'
            + '<input class="fep-v-inp" value="'+escHtml(v.label||'')+'" oninput="updateFppVraagLabel('+si+','+vi+',this.value)" placeholder="Vraag…">'
            + '<button onclick="removeFppVraag('+si+','+vi+')" class="fep-del-btn">\u00d7</button></div>';
        }).join('')
      + '<button onclick="addFppVraag('+si+')" class="fep-add-vraag">+ Vraag</button></div>';
  }).join('');
}
function addFppSectie() {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(!f.secties) f.secties=[];
  f.secties.push({titel:'Nieuwe sectie',vragen:[]});
  saveProcesses(); renderFppSecties(f);
}
function removeFppSec(si) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  f.secties.splice(si,1); saveProcesses(); renderFppSecties(f); renderFaseFlow();
}
function updateFppSecTitel(si,val) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.secties[si]) f.secties[si].titel=val; saveProcesses();
}
function addFppVraag(si) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(!f.secties[si]) return;
  if(!f.secties[si].vragen) f.secties[si].vragen=[];
  f.secties[si].vragen.push({label:'',type:'b'});
  saveProcesses(); renderFppSecties(f); renderFaseFlow();
}
function removeFppVraag(si,vi) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.secties[si]) f.secties[si].vragen.splice(vi,1);
  saveProcesses(); renderFppSecties(f); renderFaseFlow();
}
function updateFppVraagLabel(si,vi,val) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.secties[si]&&f.secties[si].vragen[vi]) f.secties[si].vragen[vi].label=val; saveProcesses();
}
function updateFppVraagType(si,vi,val) {
  var p=processes.find(function(x){return x.id===currentProcId;}); if(!p) return;
  var f=(p.fasen||[]).find(function(x){return x.id===_currentFaseEditId;}); if(!f) return;
  if(f.secties[si]&&f.secties[si].vragen[vi]) f.secties[si].vragen[vi].type=val;
  saveProcesses(); renderFaseFlow();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('proc-wizard') && document.getElementById('proc-wizard').style.display !== 'none') { closeProcWizard(); return; }
    var fpp = document.getElementById('fase-edit-popup');
    if (fpp && fpp.style.display !== 'none') { closeFaseEditPopup(); return; }
    closeNodePopup();
  }
});
