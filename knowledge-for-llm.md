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

## Klíčové funkce

- FHIR REST API pro standardizovanou manipulaci se zdravotnickými daty
- Implementace českých FHIR profilů a rozšíření
- Integrace s českými systémy (eHealth, eRecept, ISIN, NZIS, DRG, DASTA)
- Plná podpora EHDS (European Health Data Space) a interoperability
- Bezpečné ukládání dat s šifrováním AES-256
- Systém notifikací využívající WebSockets a MQTT
- Autentizace a autorizace pomocí Authentik a OAuth 2.0
- Lokalizace a internacionalizace pro české prostředí
- Vizuální přizpůsobení podle identity DigiMedic

## Technologický stack

- Backend: Node.js, Express.js
- Databáze: PostgreSQL
- Autentizace: Authentik, OAuth 2.0
- API: FHIR REST API
- Real-time komunikace: WebSockets, MQTT
- Zabezpečení: TLS, AES-256
- Frontend: React, Next.js
- Dokumentace: Docusaurus

## Standardy a legislativa

Projekt musí být v plném souladu s následujícími standardy a legislativními požadavky:

- HL7 FHIR R4
- HL7 Czech Core Resources IG v0.1.0
- IHE profily relevantní pro české prostředí
- DASTA (Datový standard Ministerstva zdravotnictví ČR)
- Standardy EHDS pro evropskou výměnu zdravotnických dat
- Standardy NCPeH pro přeshraniční výměnu zdravotnických dat
- GDPR a související české zákony o ochraně osobních údajů
- Zákon č. 372/2011 Sb., o zdravotních službách
- Zákon č. 181/2014 Sb., o kybernetické bezpečnosti
- Vyhláška č. 98/2012 Sb., o zdravotnické dokumentaci

## Struktura projektu

Projekt má následující hlavní komponenty:

- `medplum/`: Hlavní repozitář obsahující upravený kód Medplum platformy
  - `packages/`: Různé balíčky projektu
    - `czech-fhir-profiles/`: Implementace českých FHIR profilů
    - `czech-integrations/`: Konfigurace a integrace s českými zdravotnickými systémy
    - `digimedic-docs/`: Česká dokumentace projektu
    - `app/`: Hlavní aplikace
    - `core/`: Jádro systému
    - `react/`: React komponenty
    - `server/`: Serverová část
  - `examples/`: Ukázkové aplikace a demonstrace funkcí
  - `docs/`: Dokumentace (včetně české verze)

## Klíčové funkcionality

1. Správa pacientů a zdravotnických záznamů
2. Elektronické recepty a e-preskripce
3. Plánování a správa návštěv
4. Laboratořní výsledky a diagnostická zobrazování
5. Komunikace mezi poskytovateli zdravotní péče
6. Podpora pro telemedicínu
7. Analýza zdravotnických dat
8. Integrace s externími systémy a registry
9. Plná podpora EHDS a přeshraniční výměny dat

## Lokální nasazení a vývoj

Pro lokální nasazení a vývoj projektu následujte tyto kroky:

### Prerekvizity

1. Git
2. Node.js (verze 18+ požadována, verze 20+ doporučena)
3. Docker

### Instalace

1. Naklonujte repozitář DigiMedic FHIR Backend
2. V kořenovém adresáři spusťte `npm ci` pro instalaci závislostí

### Sestavení

Použijte Turborepo pro sestavení všech balíčků:

```sh
npm run build:fast
```

### Spuštění základních služeb

Použijte Docker Compose pro spuštění PostgreSQL a Redis:

```sh
docker-compose up
```

### Spuštění serverů

1. Spusťte DigiMedic FHIR Backend API server:

```sh
cd packages/server
npm run dev
```

2. Spusťte DigiMedic FHIR Backend Web App:

```sh
cd packages/app
npm run dev
```

Aplikace bude dostupná na http://localhost:3000/

Výchozí přihlašovací údaje budou poskytnuty v separátním, bezpečném kanálu.

## Dokumentace

Projekt využívá Docusaurus pro správu a generování dokumentace. Dokumentace je umístěna v adresáři `digimedic-docs/`. 

### Struktura dokumentace

- `digimedic-docs/`
  - `docs/`: Obsahuje hlavní dokumentační soubory v Markdown formátu
    - `uvod.md`: Úvodní stránka dokumentace
    - `instalace-a-nastaveni.md`: Pokyny pro instalaci a nastavení
    - `zakladni-koncepty.md`: Vysvětlení základních konceptů projektu
    - `api-reference.md`: Reference k API
    - `priklady-pouziti.md`: Příklady použití DigiMedic FHIR Backend
    - `vizualni-identita.md`: Informace o vizuální identitě projektu
  - `src/`: Zdrojové soubory pro React komponenty a CSS
    - `css/`: Obsahuje soubory s CSS styly
    - `components/`: React komponenty používané v dokumentaci
  - `static/`: Statické soubory jako obrázky a ikony
    - `img/`: Adresář s obrázky a ikonami, včetně loga a faviconu
  - `docusaurus.config.ts`: Konfigurační soubor pro Docusaurus
  - `sidebars.ts`: Konfigurace postranního panelu dokumentace

### Spuštění dokumentace lokálně

Pro spuštění dokumentace lokálně:

1. Přejděte do adresáře dokumentace:
   ```sh
   cd digimedic-docs
   ```

2. Nainstalujte závislosti:
   ```sh
   npm install
   ```

3. Spusťte vývojový server:
   ```sh
   npm start
   ```

Dokumentace bude dostupná na adrese http://localhost:3000

### Přizpůsobení pro DigiMedic FHIR Backend

Dokumentace byla upravena tak, aby odrážela vizuální identitu DigiMedic:

- Přizpůsobení barevné palety a typografie v `src/css/custom.css`
- Použití loga DigiMedic a faviconu v `static/img/`
- Vytvoření vlastních SVG ikon pro klíčové funkce v `static/img/`
- Aktualizace hlavní stránky a navigace v `src/pages/index.tsx`
- Přidání stránky s informacemi o vizuální identitě projektu v `docs/vizualni-identita.md`

## Vizuální identita

Projekt DigiMedic FHIR Backend je vizuálně upraven podle [Brand manuálu DigiMedic](https://github.com/DigiMedic/Brand-manual-DigiMedic). Klíčové aspekty zahrnují:

### Logo

- Primární logo: Černé logo s nápisem "DigiMedic"
- Varianta s modrým symbolem: Logo s modrým symbolem srdce v bublině
- Symbol (Favicon): Modré srdce v bublině
- Dlouhá verze: Logo s nápisem "DigiMedic - Digitální Páteř Českého Zdravotnictví"

### Barevná paleta

| Barva | Hex kód | Použití |
|-------|---------|---------|
| Tmavě modrá | #1B4D6A | Hlavní barva pro logo a důležité prvky |
| Středně modrá | #5B8A9A | Sekundární prvky a zvýraznění |
| Světle modrá | #5BA2C2 | Doplňkové prvky a pozadí |
| Velmi světle modrá | #A8D4E1 | Jemné akcenty a pozadí |
| Nejsvětlejší modrá | #E7F5F8 | Velmi jemné pozadí a oddělovače |

### Typografie

- Nadpisy a logo: Space Bold Regular
- Zvýraznění a podnadpisy: Space Bold Semibold
- Hlavní text: Raleway Regular
- Alternativní font pro delší texty: Open Sans

## Další důležité informace

- Projekt je založen na platformě Medplum, ale je výrazně přizpůsoben a rozšířen pro potřeby českého zdravotnictví a DigiMedic
- Důraz je kladen na bezpečnost, ochranu osobních údajů a plný soulad s GDPR
- Probíhá úzká spolupráce s českými zdravotnickými institucemi a odborníky
- Projekt musí projít certifikací pro použití v českém zdravotnictví
- Součástí projektu jsou různé demo aplikace pro ukázku funkcionalit (např. chat, plánování, příjem pacientů)
- Cílem je vytvořit produkt, který bude možné propagovat jako DigiMedic FHIR Backend

## Vývojové prostředí

- Git pro správu verzí
- Node.js a npm pro správu závislostí
- Docker pro kontejnerizaci
- CI/CD pipeline (pravděpodobně GitHub Actions)
- Testovací nástroje: Jest, Vitest
- Docusaurus pro správu a generování dokumentace

## Aktuální stav a další kroky

1. Analýza požadavků a specifikací pro českou implementaci a EHDS
2. Důkladné přizpůsobování a rozšiřování Medplum platformy
3. Implementace českých FHIR profilů a rozšíření
4. Integrace s českými zdravotnickými systémy a EHDS
5. Vývoj demo aplikací a ukázkových případů použití
6. Aplikace vizuální identity DigiMedic
7. Vytvoření kompletní, uživatelsky přívětivé dokumentace
8. Testování a validace
9. Lokalizace a překlad
10. Certifikace a nasazení
11. Příprava marketingových materiálů pro propagaci DigiMedic FHIR Backend

Tento knowledge base bude průběžně aktualizován s novými informacemi a pokrokem v projektu. Cílem je vytvořit komplexní, bezchybně fungující a plně přizpůsobený produkt DigiMedic FHIR Backend, který bude splňovat všechny požadavky českého zdravotnictví a EHDS.