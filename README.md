# DigiMedic FHIR Backend

DigiMedic FHIR Backend je **open-source** platforma založená na [Medplum](https://github.com/medplum/medplum) přizpůsobená českému zdravotnickému prostředí.  
Poskytuje bezpečné, interoperabilní a škálovatelné API (HL7 FHIR R4) pro správu klinických dat, integraci s národními systémy (eRecept, ISIN, NZIS, NCPeH) a podporu českých FHIR profilů a rozšíření.

---

## Obsah

1. [Klíčové vlastnosti](#klíčové-vlastnosti)  
2. [Architektura a struktura repozitáře](#architektura-a-struktura-repozitáře)  
3. [Požadavky](#požadavky)  
4. [Instalace a lokální vývoj](#instalace-a-lokální-vývoj)  
5. [Příkazy npm / Turbo](#příkazy-npm--turbo)  
6. [Validace českých FHIR profilů](#validace-českých-fhir-profilů)  
7. [Docker & kontejnerizace](#docker--kontejnerizace)  
8. [Deployment](#deployment)  
9. [Bezpečnost a compliance](#bezpečnost-a-compliance)  
10. [Přispívání](#přispívání)  
11. [Licence](#licence)

---

## Klíčové vlastnosti

| Oblast | Popis |
|--------|-------|
| **FHIR R4 API** | Plnohodnotné REST & GraphQL API založené na Medplum serveru. |
| **České profily** | Balík `@digimedic/cz-profiles` obsahuje CZ\_Patient, CZ\_Practitioner, rozšíření rodné číslo, číslo pojištěnce, PSČ aj. |
| **Integrace národních systémů** | Balík `@digimedic/cz-integrations` implementuje klienty (eRecept SOAP/REST, ISIN HL7 V2, NZIS REST, NCPeH XCA). |
| **Bots & Workflow** | Server-side business logika psaná v TypeScriptu (Medplum Bots). |
| **CI/CD** | GitHub Actions – lint, testy, CodeQL, FHIR validace, build & deploy na AWS ECS/EKS. |
| **Bezpečnost** | mTLS, OAuth 2.0/SMART-on-FHIR, DPIA připraveno, auditní logy do Elastic Stack. |
| **Monorepo** | Turborepo + Typescript workspaces, jednotný build a sdílené typy. |

---

## Architektura a struktura repozitáře

```
.
├── packages
│   ├── cz-profiles        # České FHIR profily, extensions, terminologie
│   ├── cz-integrations    # Integrace (eRecept, ISIN, NZIS, NCPeH, …)
│   ├── cz-i18n            # Lokalizační balík (i18next)
│   ├── server             # Fork/extend Medplum server + Bots
│   └── app                # React/Next.js referenční UI
├── project-brief          # Dokumentace a specifikace
├── Dockerfile             # Multi-stage build
├── turbo.json             # Konfigurace monorepa
└── .github/workflows      # CI/CD pipeline
```

---

## Požadavky

| Software | Verze |
|----------|-------|
| **Node.js** | ≥ 20 |
| **npm** | ≥ 10 |
| **Docker** | 20+ (pro kontejnerizaci) |
| **Java 17** | pouze pro FHIR validator |
| OpenSSL, make, g++ | pro native moduly (build stage) |

Volitelné:

* AWS CLI / kubectl – nasazení do cloudu  
* Certifikáty SÚKL mTLS – komunikace s produkčním eReceptem

---

## Instalace a lokální vývoj

```bash
# 1. Klonování repozitáře
git clone https://github.com/DigiMedic/DigiMedic-FHIR-Backend.git
cd DigiMedic-FHIR-Backend

# 2. Instalace závislostí
npm ci

# 3. Spuštění vývojového režimu
npm run dev                     # spustí watch build všech balíků
```

### Konfigurační proměnné (dotenv nebo shell)

| Název | Příklad | Popis |
|-------|---------|-------|
| `MEDPLUM_BASE_URL` | `http://localhost:8103/fhir/R4` | adresa FHIR serveru |
| `EERECEPT_CERT_PATH` | `./certs/sukl/client.p12` | mTLS certifikát |
| `EERECEPT_KEY_PASSWORD` | `changeit` | heslo k privátnímu klíči |
| … | | |

---

## Příkazy npm / Turbo

| Příkaz | Popis |
|--------|-------|
| `npm run build` | build všech balíků (`turbo run build`) |
| `npm run dev` | watch build (`--watch`) |
| `npm run test` | spustí jest testy |
| `npm run lint` | ESLint + Prettier |
| `npm run validate-profiles` | FHIR validator na vygenerované profily |
| `npm run extract-i18n` | i18next scanner (řetězce) |

---

## Validace českých FHIR profilů

```bash
# Build CZ profilů
npm run build -- --filter=@digimedic/cz-profiles

# Spuštění validace
npm run validate-profiles
# Výsledky v ložce ./validation-results
```

Validator (HAPI) se stahuje automaticky v CI a lokálně vyžaduje Java 17.

---

## Docker & kontejnerizace

```bash
# Build multi-stage image
docker build -t digimedic/fhir-backend:latest .

# Lokální běh
docker run -p 8080:8080 \
  -e MEDPLUM_BASE_URL=http://localhost:8080/fhir/R4 \
  digimedic/fhir-backend:latest
```

Image obsahuje:

* Medplum server (fork) + CZ profily  
* Integrační služby (eRecept klient, …)  
* Cert store `/app/certs` pro české CA / SÚKL certifikáty  

---

## Deployment

### Výchozí cloud: **AWS EKS/ECS**

1. Vytvořte ECR repozitář a pushněte image.  
2. Terraform/CDK – definujte VPC, RDS (PostgreSQL 14), EKS cluster.  
3. Helm chart nebo Manifesty (server, Bots, ingress, Cert-manager).  
4. CI workflow (`deploy-staging` / `deploy-production`) provede `aws ecs update-service`  
   nebo `kubectl set image` a spustí **rolling update**.

**Healthcheck**: `GET /healthcheck` (využívá se v Dockerfile a ALB Target Group).  

---

## Bezpečnost a compliance

* **GDPR & DPIA**: modul souhlasů pacientů, anonymizační utility.  
* **mTLS** – certifikáty pro SÚKL/eRecept, komunikace po TLS 1.3.  
* **OAuth 2.0 / SMART-on-FHIR**: Medplum Auth + NIA eID broker.  
* **Auditní logy**: export do Elastic Stack (WORM S3).  
* **CodeQL**, OWASP Dependency-Check – součást CI.  

---

## Přispívání

Rádi uvítáme pull requesty:

1. Fork → nová větev `feature/xyz`  
2. `npm run lint && npm test`  
3. Otevřete PR proti `develop`, popište změny  
4. Maintaineři provedou code-review a merge

Code style – eslint + prettier, commit message [Conventional Commits](https://www.conventionalcommits.org/).

---

## Licence

Projekt je licencován pod **Apache License 2.0** – viz soubor `LICENSE`.
