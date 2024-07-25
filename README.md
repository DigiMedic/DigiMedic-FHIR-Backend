# DigiMedic FHIR Backend

## Úvod

![Cover Image](https://i.ibb.co/DfkDbWB/DALL-E-2024-07-18-03-13-24-A-wide-pixel-art-cover-image-depicting-a-modern-secure-and-interoperable.png)

**DigiMedic FHIR Backend** je pokročilá infrastruktura navržená pro zajištění bezpečné a interoperabilní výměny zdravotnických dat. Naše platforma využívá moderní technologie a standardy, jako je HL7 FHIR, aby poskytla robustní backendovou vrstvu pro elektronické zdravotní záznamy (EHR) a umožnila snadnou integraci s externími systémy, jako jsou národní registry a nositelná zařízení.

## Primární cíl

Vybudovat bezpečnou a interoperabilní platformu pro výměnu zdravotnických dat, která bude sloužit jako backend pro různé EHR systémy a externí zdravotnické organizace. DigiMedic FHIR Backend se zaměřuje na zajištění strukturované a bezpečné výměny dat, čímž vytváří základ pro plně interoperabilní zdravotnické prostředí.

## Klíčové Funkce

### Základní funkce FHIR backendu

- **FHIR REST API**: Poskytuje standardizované rozhraní pro manipulaci se zdravotnickými daty.
- **Identity & Access Management**: Zajišťuje bezpečnou autentizaci a autorizaci uživatelů pomocí Authentik a OAuth 2.0.
- **Data Storage**: Ukládání zdravotnických dat v robustním a škálovatelném úložišti PostgreSQL.
- **Subscriptions**: Real-time aktualizace a notifikace o změnách dat pomocí WebSockets a MQTT.
- **Interoperabilita**: Napojení na národní registry a externí systémy pomocí standardních protokolů a API (HL7 FHIR, RESTful API, SOAP API).

### Integrace s externími systémy

- **Systém eHealth (ÚZIS)**: Napojení na centrální systém eHealth pro výměnu dat.
- **Systém eReceptu**: Integrace se systémem eReceptu pro zabezpečené vystavování a správu e-receptů.
- **Nositelné zařízení (IOTA)**: Synchronizace dat z nositelných zdravotnických zařízení v reálném čase.

## Funkční Rozsah

### Správa dat a zabezpečení

- **Identity & Access Management**:
  - Použití Authentik pro správu uživatelských účtů a přístupových práv.
  - Implementace OAuth 2.0 pro bezpečné ověřování a autorizaci.
- **Data Storage**:
  - Použití PostgreSQL jako robustního a škálovatelného úložiště pro zdravotnická data.
  - Šifrování dat pomocí AES-256 pro zabezpečení uložených dat.
- **Real-time aktualizace a notifikace**:
  - Implementace Subscriptions pomocí WebSockets a MQTT pro real-time komunikaci.

### Integrace a komunikace

- **FHIR REST API**:
  - Poskytuje standardizované rozhraní pro manipulaci a výměnu zdravotnických dat.
- **Napojení na národní registry**:
  - Použití HL7 FHIR, RESTful API a SOAP API pro komunikaci s eHealth a eRecept.
- **Synchronizace s nositelnými zařízeními**:
  - Implementace RESTful API a MQTT pro real-time synchronizaci dat z IOTA zařízení.

### Bezpečnostní opatření

- **Šifrování dat během přenosu**:
  - Použití TLS pro šifrování dat při přenosu.
- **Monitorování a auditování**:
  - Real-time monitoring a centralized logging pro zajištění bezpečnosti a výkonu systému.

## Důvody, cíle a motivace

### Důvody

- Potřeba modernizace infrastruktury pro výměnu zdravotnických dat.
- Nedostatečná integrace a interoperabilita existujících systémů.
- Rostoucí poptávka po bezpečných a interoperabilních řešeních v zdravotnictví.
- Nutnost zajistit vysokou úroveň bezpečnosti a ochrany dat.

### Cíle

- Vybudovat pokročilý FHIR backend speciálně navržený pro zdravotnický sektor.
- Poskytnout robustní a bezpečnou platformu pro výměnu zdravotnických dat.
- Transformovat infrastrukturu zdravotní péče prostřednictvím nejmodernějších technologií.
- Zajistit soulad s národními i evropskými standardy.

### Motivace

- Zvýšení efektivity zdravotnických systémů a zařízení.
- Zlepšení kvality a dostupnosti zdravotní péče prostřednictvím interoperability dat.
- Podpora digitální transformace zdravotnictví.
- Vytvoření infrastruktury pro plnou interoperabilitu zdravotních dat.

## Inspirace a využití existujících platforem

Při vývoji DigiMedic FHIR Backend jsme se inspirovali a částečně vycházíme z následujících platforem:
- **[Medplum](https://github.com/medplum/medplum)**: Open-source platforma pro správu zdravotních záznamů, která poskytuje robustní API a nástroje pro interoperabilitu.
- **[FHIR](https://www.hl7.org/fhir/)**: Standard pro strukturovanou výměnu zdravotnických informací.
- **[Fasten Health](https://github.com/fastenhealth/fasten-onprem/)**: Platforma zaměřená na bezpečnost a ochranu dat ve zdravotnictví.

## Standardy a Shoda

DigiMedic FHIR Backend je navržen tak, aby splňoval různé národní a evropské standardy, které zajišťují interoperabilitu, bezpečnost a ochranu dat. Níže jsou uvedeny klíčové standardy a dokumenty o shodě:

| Logo | Název | Popis |
|------|-------|-------|
| ![HL7 FHIR](link_na_logo) | [HL7 FHIR](standards/HL7_FHIR.md) | Přehled a implementace standardu HL7 FHIR pro výměnu zdravotnických informací. |
| ![HL7 CDA](link_na_logo) | [HL7 CDA](standards/HL7_CDA.md) | Přehled a implementace standardu HL7 CDA pro strukturované zdravotnické dokumenty. |
| ![DICOM](link_na_logo) | [DICOM](standards/DICOM.md) | Přehled a implementace standardu DICOM pro lékařská zobrazovací data. |
| ![SSL/TLS](link_na_logo) | [SSL/TLS](standards/SSL_TLS.md) | Přehled a implementace protokolů SSL/TLS pro zabezpečenou komunikaci. |
| ![AES-256](link_na_logo) | [AES-256](standards/AES_256.md) | Přehled a implementace šifrování AES-256 pro zabezpečení dat. |
| ![GDPR](link_na_logo) | [GDPR](standards/GDPR.md) | Přehled souladu s GDPR a jak DigiMedic FHIR Backend zajišťuje ochranu dat. |
| ![NCPeH API](link_na_logo) | [NCPeH API](standards/NCPeH_API.md) | Přehled a implementace NCPeH API pro národní integraci eHealth. |
| ![CMS 2.0](link_na_logo) | [CMS 2.0](standards/CMS_2.0.md) | Přehled a implementace CMS 2.0 pro bezpečnou výměnu dat ve veřejné správě. |
| ![ISO 27001](link_na_logo) | [ISO 27001](standards/ISO_27001.md) | Přehled souladu s ISO 27001 a proces certifikace. |
| ![Legislativní Požadavky](link_na_logo) | [Legislativní Požadavky](standards/Legislative_Requirements.md) | Přehled národních legislativních požadavků pro zdravotnické služby a dokumentaci v České republice. |

## Tech Stack

### Backend a databáze
| Technologie   | Popis                                                                | Důvod použití                                                             |
|---------------|----------------------------------------------------------------------|---------------------------------------------------------------------------|
| **FHIR REST API**  | Poskytuje standardizované rozhraní pro manipulaci se zdravotnickými daty. | Zajišťuje interoperabilitu a konzistenci dat.                             |
| **Supabase**  | Open-source alternativa Firebase, poskytující real-time databáze, autentizaci a API služby. | Real-time synchronizace databází a uživatelská autentizace, klíčové pro správu pacientských záznamů a zabezpečený přístup. |
| **Authentik** | Open-source### Aktualizovaný README.md pro DigiMedic FHIR Backend
