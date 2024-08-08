import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DigiMedic FHIR Backend',
  tagline: 'Digitální Páteř Českého Zdravotnictví',
  favicon: 'img/FAVICON.png',

  url: 'https://digimedic.cz',
  baseUrl: '/',

  organizationName: 'DigiMedic',
  projectName: 'digimedic-fhir-backend',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/DigiMedic/digimedic-fhir-backend/tree/main/digimedic-docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/DigiMedic/digimedic-fhir-backend/tree/main/digimedic-docs/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/digimedic-social-card.jpg',
    navbar: {
      title: 'DigiMedic FHIR Backend',
      logo: {
        alt: 'DigiMedic Logo',
        src: 'img/DigiMedic-logo-long.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Dokumentace',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/DigiMedic/digimedic-fhir-backend',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentace',
          items: [
            {
              label: 'Úvod',
              to: '/docs/uvod',
            },
            {
              label: 'Instalace',
              to: '/docs/instalace-a-nastaveni',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
          ],
        },
        {
          title: 'Komunita',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DigiMedic/digimedic-fhir-backend',
            },
          ],
        },
        {
          title: 'Více',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'DigiMedic',
              href: 'https://digimedic.cz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DigiMedic. Všechna práva vyhrazena.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
