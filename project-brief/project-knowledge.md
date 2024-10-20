# DigiMedic FHIR Backend

## Úvod

![Cover Image](https://i.ibb.co/DfkDbWB/DALL-E-2024-07-18-03-13-24-A-wide-pixel-art-cover-image-depicting-a-modern-secure-and-interoperable.png)

**DigiMedic FHIR Backend** je pokročilá infrastruktura navržená pro zajištění bezpečné a interoperabilní výměny zdravotnických dat. Naše platforma využívá moderní technologie a standardy, jako je HL7 FHIR, aby poskytla robustní backendovou vrstvu pro elektronické zdravotní záznamy (EHR) a umožnila snadnou integraci s externími systémy, jako jsou národní registry a nositelná zařízení.

## Primární cíl

Vybudovat bezpečnou a interoperabilní platformu pro výměnu zdravotnických dat, která bude sloužit jako backend pro různé EHR systémy a externí zdravotnické organizace. DigiMedic FHIR Backend se zaměřuje na zajištění strukturované a bezpečné výměny dat, čímž vytváří základ pro plně interoperabilní zdravotnické prostředí.

## Klíčové Funkce

### Základní funkce FHIR backendu

- **FHIR REST API**: Poskytuje standardizované rozhraní pro manipulaci se zdravotnickými daty.
- **Interoperabilita**: Napojení na národní registry a externí systémy pomocí standardních protokolů a API (HL7 FHIR, RESTful API, SOAP API).

### Integrace s externími systémy

- **Systém eHealth (ÚZIS)**: Napojení na centrální systém eHealth pro výměnu dat.
- **Systém eReceptu**: Integrace se systémem eReceptu pro zabezpečené vystavování a správu e-receptů.
- **Nositelné zařízení (IOTA)**: Synchronizace dat z nositelných zdravotnických zařízení v reálném čase.


### Správa dat a zabezpečení

- **Identity & Access Management**:
  - Implementace OAuth 2.0 pro bezpečné ověřování a autorizaci.

### Integrace a komunikace

- **FHIR REST API**:
  - Poskytuje standardizované rozhraní pro manipulaci a výměnu zdravotnických dat.
- **Napojení na národní registry**:
  - Použití HL7 FHIR, RESTful API a SOAP API pro komunikaci s eHealth a eRecept.

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


## Standardy a Shoda

DigiMedic FHIR Backend je navržen tak, aby splňoval různé národní a evropské standardy, které zajišťují interoperabilitu, bezpečnost a ochranu dat. Podrobné informace o standardech a shodě naleznete v [dokumentaci](digimedic-docs/docs/zakladni-koncepty.md#standardy-a-legislativa).



## Kontakt

Pro více informací nebo v případě dotazů nás kontaktujte na info@digimedic.cz.

---

© 2023 DigiMedic. Všechna práva vyhrazena.

# Knowledge Base pro DigiMedic FHIR Backend

Tento soubor slouží jako znalostní báze pro AI asistenty pracující na projektu DigiMedic FHIR Backend. Obsahuje klíčové informace o projektu, jeho cílech a specifikacích.

## Přehled projektu

DigiMedic FHIR Backend je komplexní projekt zaměřený na vytvoření pokročilé infrastruktury pro bezpečnou a interoperabilní výměnu zdravotnických dat v České republice. Projekt je založen na open-source platformě Medplum, která je důkladně přizpůsobována a upravována tak, aby plnohodnotně splňovala požadavky České republiky, EHDS (European Health Data Space) a specifické potřeby DigiMedic.

## Hlavní cíle projektu

1. Důkladně a plnohodnotně přizpůsobit a upravit Medplum pro požadavky České republiky a EHDS
2. Vytvořit robustní a bezpečnou platformu pro výměnu zdravotnických dat
3. Zajistit plnou interoperabilitu s českými zdravotnickými systémy
4. Implementovat české FHIR profily a rozšíření
5. Splnit všechny legislativní požadavky a standardy českého zdravotnictví
6. Podporovat digitální transformaci zdravotnictví v ČR
7. Upravit vizuální stránku projektu podle vizuální identity DigiMedic
8. Vytvořit kompletní a uživatelsky přívětivou dokumentaci vycházející z Medplum, ale přizpůsobenou pro DigiMedic
Jistě, rád prozkoumám dokumentaci Medplum, abychom lépe pochopili základy, na kterých DigiMedic FHIR Backend staví. Zde je shrnutí klíčových bodů z dokumentace Medplum:

1. Základní koncept:
   Medplum je "headless EHR" (Electronic Health Record) systém. To znamená, že poskytuje backend infrastrukturu a API pro zdravotnické aplikace, ale nemá vlastní uživatelské rozhraní.

2. FHIR Standard:
   Medplum je založen na FHIR (Fast Healthcare Interoperability Resources) standardu, konkrétně verzi R4. To zajišťuje interoperabilitu a standardizaci dat napříč různými zdravotnickými systémy.

3. Klíčové komponenty:
   - FHIR API: RESTful API pro manipulaci se zdravotnickými daty
   - Autentizace a autorizace: Podporuje OAuth 2.0 a SMART on FHIR
   - FHIR Datastore: Úložiště pro FHIR zdroje
   - Bots: Automatizované skripty pro zpracování dat a workflow
   - Subscriptions: Systém pro real-time notifikace o změnách dat

4. Bezpečnost:
   Medplum klade velký důraz na bezpečnost, včetně šifrování dat, bezpečné autentizace a autorizace, a auditních logů.

5. Integrace:
   Podporuje integraci s různými zdravotnickými systémy, včetně laboratoří, EHR systémů, PACS a dalších.

6. Customizace:
   Medplum je navržen tak, aby byl snadno přizpůsobitelný pro různé use-case, včetně vytváření vlastních FHIR profilů a rozšíření.

7. SDK a nástroje:
   Poskytuje SDK pro TypeScript/JavaScript a React komponenty pro snadný vývoj frontend aplikací.

8. Dokumentace a příklady:
   Medplum nabízí rozsáhlou dokumentaci a příklady implementace, včetně ukázkové aplikace "Foo Medical".

9. Open Source:
   Medplum je open-source projekt, což umožňuje komunitě přispívat k jeho rozvoji a přizpůsobovat ho pro specifické potřeby.

10. Compliance:
    Medplum je navržen s ohledem na různé zdravotnické standardy a regulace, včetně HIPAA.

11. GraphQL podpora:
    Kromě REST API Medplum také podporuje GraphQL pro flexibilnější dotazování na data.

12. Rozšiřitelnost:
    Medplum umožňuje vytváření vlastních FHIR operací a rozšíření pro specifické potřeby implementace.

Pro projekt DigiMedic FHIR Backend to znamená, že máme solidní základ, na kterém můžeme stavět. Budeme muset:

1. Přizpůsobit FHIR profily pro české zdravotnictví.
2. Implementovat integraci s českými systémy jako eRecept, ISIN, NZIS.
3. Zajistit soulad s českými zákony a regulacemi.
4. Lokalizovat dokumentaci a uživatelské rozhraní do češtiny.
5. Rozšířit bezpečnostní opatření pro splnění českých a EU norem.
6. Vytvořit specifické boty a automatizace pro české zdravotnické procesy.
7. Přizpůsobit autentizační a autorizační systém pro české poskytovatele identity.

Toto prozkoumání Medplum dokumentace nám poskytuje jasný obraz o tom, co máme k dispozici a co budeme muset upravit nebo doplnit pro potřeby DigiMedic FHIR Backend.
Po důkladné analýze Medplum, požadavků projektu DigiMedic FHIR Backend a českého zdravotnického prostředí navrhuji následující podrobný plán implementace:

1. Fáze přípravy a analýzy
   a) Detailní analýza českých zdravotnických standardů a legislativy
   b) Mapování rozdílů mezi Medplum FHIR implementací a českými požadavky
   c) Konzultace s českými zdravotnickými institucemi (ÚZIS, SÚKL)
   d) Definice konkrétních use-case pro české prostředí
   e) Vytvoření detailní architektury systému

2. Fáze vývoje základní infrastruktury
   a) Forking a přizpůsobení Medplum repozitáře
   b) Implementace českých FHIR profilů
      - CZ_Patient, CZ_Practitioner, CZ_Organization, CZ_Medication
   c) Rozšíření FHIR datastore o české specifické atributy
   d) Implementace českých terminologií a číselníků
   e) Přizpůsobení autentizačního systému pro české poskytovatele identity (NIA)

3. Fáze integrace s českými systémy
   a) Implementace rozhraní pro eRecept
   b) Integrace s ISIN (Informační systém infekčních nemocí)
   c) Napojení na NZIS (Národní zdravotnický informační systém)
   d) Implementace rozhraní pro DRG (Diagnosis Related Group)
   e) Podpora pro DASTA (Datový standard MZ ČR)

4. Fáze vývoje specifických funkcí
   a) Implementace českých zdravotnických workflow pomocí Medplum Bots
   b) Vytvoření specifických FHIR operací pro české prostředí
   c) Implementace systému pro správu souhlasů pacientů (GDPR)
   d) Vývoj modulu pro anonymizaci dat
   e) Implementace rozhraní pro EHDS (European Health Data Space)

5. Fáze bezpečnosti a compliance
   a) Implementace dodatečných bezpečnostních opatření
   b) Audit a optimalizace šifrování dat
   c) Implementace logování a auditních záznamů dle českých požadavků
   d) Zajištění souladu s českými zákony o kybernetické bezpečnosti

6. Fáze lokalizace a UI/UX
   a) Překlad uživatelského rozhraní do češtiny
   b) Přizpůsobení UI pro české uživatele (formáty dat, měny, atd.)
   c) Implementace české dokumentace
   d) Vytvoření českých vzorových aplikací a příkladů použití

7. Fáze testování a validace
   a) Vývoj komplexní testovací sady pro české prostředí
   b) Provedení penetračních testů
   c) Uživatelské testování s českými zdravotníky
   d) Validace souladu s českými standardy a legislativou
   e) Zátěžové testování

8. Fáze pilotního nasazení
   a) Výběr pilotních zdravotnických zařízení
   b) Nasazení systému v testovacím prostředí
   c) Školení uživatelů
   d) Sběr a analýza zpětné vazby
   e) Iterativní vylepšování na základě zpětné vazby

9. Fáze certifikace a finalizace
   a) Příprava dokumentace pro certifikaci
   b) Proces certifikace pro použití v českém zdravotnictví
   c) Finální úpravy na základě výsledků certifikace
   d) Příprava produkčního prostředí

10. Fáze produkčního nasazení a podpory
    a) Plné produkční nasazení
    b) Ustanovení týmu pro podporu a údržbu
    c) Pravidelné aktualizace a vylepšení
    d) Kontinuální sledování změn v legislativě a standardech

Dodatečné poznámky:
1. Průběžná komunikace s českými zdravotnickými autoritami je klíčová.
2. Agilní přístup k vývoji umožní flexibilní reakce na změny požadavků.
3. Důraz na dokumentaci a školení uživatelů je zásadní pro úspěšnou adopci.
4. Pravidelné bezpečnostní audity by měly být součástí dlouhodobého plánu.
5. Plán počítá s paralelním vývojem některých fází pro optimalizaci času.

Tento plán poskytuje komplexní přístup k implementaci DigiMedic FHIR Backend, zohledňující specifika českého zdravotnictví a stavící na solidních základech platformy Medplum.