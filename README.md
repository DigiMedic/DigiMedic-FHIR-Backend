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


### Bezpečnostní opatření

- **Šifrování dat během přenosu**:
  - Použití TLS pro šifrování dat při přenosu.
- **Monitorování a auditování**:
  - Real-time monitoring a centralized logging pro zajištění bezpečnosti a výkonu systému.

## Dokumentace

Kompletní dokumentace DigiMedic FHIR Backend je dostupná v adresáři `digimedic-docs`. Dokumentace je vytvořena pomocí nástroje Docusaurus a obsahuje následující sekce:

- [Úvod](digimedic-docs/docs/uvod.md)
- [Instalace a nastavení](digimedic-docs/docs/instalace-a-nastaveni.md)
- [Základní koncepty](digimedic-docs/docs/zakladni-koncepty.md)
- [API Reference](digimedic-docs/docs/api-reference.md)
- [Příklady použití](digimedic-docs/docs/priklady-pouziti.md)
- [Vizuální identita](digimedic-docs/docs/vizualni-identita.md)

Dokumentace byla aktualizována tak, aby odrážela vizuální identitu DigiMedic, včetně:

- Přizpůsobení barevné palety a typografie
- Použití loga DigiMedic a faviconu
- Vytvoření vlastních SVG ikon pro klíčové funkce
- Aktualizace hlavní stránky a navigace
- Přidání stránky s informacemi o vizuální identitě projektu

### Struktura dokumentace

Dokumentace je strukturována následovně:

- `digimedic-docs/`
  - `docs/`: Obsahuje hlavní dokumentační soubory
  - `src/`: Zdrojové soubory pro React komponenty a CSS
  - `static/`: Statické soubory jako obrázky a ikony, včetně loga a faviconu
  - `docusaurus.config.ts`: Konfigurační soubor pro Docusaurus

### Spuštění dokumentace lokálně

Pro spuštění dokumentace lokálně následujte tyto kroky:

1. Přejděte do adresáře s dokumentací:
   ```
   cd digimedic-docs
   ```

2. Nainstalujte závislosti:
   ```
   npm install
   ```

3. Spusťte vývojový server:
   ```
   npm start
   ```

Dokumentace bude dostupná na adrese `http://localhost:3000`.

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

DigiMedic FHIR Backend je navržen tak, aby splňoval různé národní a evropské standardy, které zajišťují interoperabilitu, bezpečnost a ochranu dat. Podrobné informace o standardech a shodě naleznete v [dokumentaci](digimedic-docs/docs/zakladni-koncepty.md#standardy-a-legislativa).

## Tech Stack

Podrobné informace o použitých technologiích naleznete v [dokumentaci](digimedic-docs/docs/zakladni-koncepty.md#technologický-stack).

## Kontakt

Pro více informací nebo v případě dotazů nás kontaktujte na info@digimedic.cz.

---

© 2023 DigiMedic. Všechna práva vyhrazena.
