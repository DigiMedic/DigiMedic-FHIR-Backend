# DigiMedic FHIR Backend

![DigiMedic Logo](cesta/k/logu/digimedic.png)

DigiMedic FHIR Backend je projekt založený na platformě Medplum, přizpůsobený pro použití v České republice. Cílem je vytvořit flexibilní a výkonný backend pro zdravotnické aplikace, který splňuje specifické požadavky českého zdravotnictví, evropské standardy a EHDS (European Health Data Space).

## Struktura projektu

- `packages/czech-fhir-profiles/`: Implementace českých FHIR profilů
- `packages/czech-integrations/`: Konfigurace a integrace s českými zdravotnickými systémy
- `packages/digimedic-docs/`: Česká dokumentace projektu

## Hlavní funkce

- Implementace českých FHIR profilů a rozšíření
- Integrace s českými zdravotnickými systémy (ISIN, eRecept, NZIS, DRG, DASTA)
- Podpora EHDS a interoperability
- Lokalizace a internacionalizace
- Bezpečnost a ochrana osobních údajů dle českých norem
- Přizpůsobený uživatelský interface pro české prostředí

## Jak začít

1. Naklonujte repozitář:
   ```
   git clone https://github.com/DigiMedic/DigiMedic-FHIR-Backend.git
   ```
2. Nainstalujte závislosti:
   ```
   npm install
   ```
3. Spusťte vývojový server:
   ```
   npm run dev
   ```

## Dokumentace

Kompletní dokumentace je k dispozici v adresáři `packages/digimedic-docs/`. Začněte souborem `packages/digimedic-docs/docs/cs/uvod.md` pro základní přehled projektu.

## Jak přispět

Vítáme příspěvky od komunity! Pokud chcete přispět k projektu DigiMedic FHIR Backend, postupujte podle následujících kroků:

1. Forkněte tento repozitář
2. Vytvořte novou větev pro vaši funkci (`git checkout -b feature/AmazingFeature`)
3. Commitněte vaše změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do větve (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## Licence

Tento projekt je licencován pod [Apache License 2.0](LICENSE).

## Kontakt

Pro více informací o projektu DigiMedic FHIR Backend nás kontaktujte:

- E-mail: info@digimedic.cz
- Web: https://www.digimedic.cz
- GitHub: https://github.com/DigiMedic/DigiMedic-FHIR-Backend

---

Založeno na [Medplum](https://www.medplum.com) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/medplum/medplum/blob/main/LICENSE.txt)