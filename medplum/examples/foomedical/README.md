<h1 align="center">Foo Medical</h1>
<p align="center">Bezplatná a open-source webová aplikace pro zdravotnictví od týmu Medplum.</p>
<p align="center">
  <a href="https://github.com/medplum/foomedical/actions">
    <img src="https://github.com/medplum/foomedical/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="https://github.com/medplum/foomedical/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-Apache-blue.svg" />
  </a>
  <a href="https://sonarcloud.io/project/overview?id=medplum_foomedical">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=medplum_foomedical&metric=alert_status&token=3760929adde88ce7da87782be8d811f8b5cec0f4" />
  </a>
</p>

![Screenshot Foo Medical](screenshot.png)

### Co je Foo Medical?

[Foo Medical](https://foomedical.com/) je **připravená k použití ukázková aplikace pro lékařskou praxi**, která je open source. Je určena pro vývojáře, kteří ji mohou klonovat, přizpůsobit a spustit.

### Funkce

- Úplně zdarma a open-source
- Bezpečný a kompatibilní backend [Medplum](https://www.medplum.com), který je také open source
- Registrace pacientů a autentizace
- Zdravotní záznamy
  - Výsledky laboratorních testů
  - Léky
  - Očkování
  - Vitální funkce
- Komunikace mezi pacientem a poskytovatelem péče
- Plány péče
- Rozhodování o termínech návštěv
- Všechna data reprezentována v [FHIR](https://hl7.org/FHIR/)

Foo Medical je navržena tak, aby byla forkována a přizpůsobena podle potřeb vaší firmy. Registrovat se na [foomedical.com](https://foomedical.com/) a vidět ji v akci.

### Začínáme

Nejprve [fork](https://github.com/medplum/foomedical/fork) a klonujte repozitář.

Dále nainstalujte aplikaci z terminálu

```bash
npm install
```

Poté spusťte aplikaci!

```bash
npm run dev
```

Tato aplikace by měla běžet na `http://localhost:3000/`

Přihlaste se k aplikaci na localhost pomocí stejných přihlašovacích údajů, které jste vytvořili na [foomedical.com](https://foomedical.com/), a můžete začít s přizpůsobením.

### Nasazování aplikace

Pokud chcete začít nasazovat vaši aplikaci, doporučujeme vytvořit si účet na [Vercel](https://vercel.com/), kde jsou dostupné bezplatné účty.

Můžete tuto aplikaci nasadit [kliknutím sem](https://vercel.com/new/clone?s=https%3A%2F%2Fgithub.com%2Fmedplum%2Ffoomedical&showOptionalTeamCreation=false).

### Nastavení účtu

Ve výchozím nastavení je vaše místně běžící aplikace Foo Medical nastavena tak, aby ukazovala na hostovaný službu Medplum. Foo Medical registruje přihlášení do testovacího projektu.

Pokud chcete posílat pacienty do své vlastní organizace, budete muset [registrovat nový projekt na Medplum](https://docs.medplum.com/tutorials/app/register) a nakonfigurovat své proměnné prostředí tak, aby ukazovaly na váš vlastní projekt (viz [config.ts](https://github.com/medplum/foomedical/blob/main/src/config.ts) pro příklad).

Pokud používáte hostovanou službu Medplum, můžete se přihlásit k vaší instanci Medplum a přidat následující identifikátory do svých [Nastavení webu projektu](https://app.medplum.com/admin/sites)

- Google Client Id
- Google Client Secret
- Recaptcha Site Key
- Recaptcha Secret Key

Pokud máte nějaké dotazy, kontaktujte tým Medplum ([support@medplum.com](mailto:support@medplum.com) nebo [Discord](https://discord.gg/medplum)).

### Nastavení dat

Když se přihlásíte k Foo Medical, je vytvořena sada ukázkových záznamů FHIR na vaši žádost. Možnost spouštět automatizace je součástí platformy Medplum pomocí rámce nazvaného [Bots](https://docs.medplum.com/app/bots). Odkaz na Bot, který vytvořil záznamy v Foo Medical, najdete [zde](https://github.com/medplum/medplum-demo-bots/blob/main/src/examples/sample-account-setup.ts).

### Kompatibilita

Backend Medplum je kompatibilní s HIPAA a certifikován SOC 2. Zřízení účtu vyžaduje registraci na [medplum.com](https://www.medplum.com/). Neváhejte se zeptat nás na dotazy v reálném čase na našem [Discord Serveru](https://discord.gg/medplum).

### O Medplum

[Medplum](https://www.medplum.com/) je open-source, API-first EHR. Medplum usnadňuje stavbu aplikací pro zdravotnictví s méně kódem.

Medplum podporuje samo-hostování a nabízí [hostovanou službu](https://app.medplum.com/). [Foo Medical](https://foomedical.com/) používá hostovanou službu jako backend.

- Přečtěte si [dokumentaci](https://docs.medplum.com/)
- Prohlédněte si [naši knihovnu komponent React](https://docs.medplum.com/storybook/index.html?)
- Připojte se k [našemu Discordu](https://discord.gg/medplum)
