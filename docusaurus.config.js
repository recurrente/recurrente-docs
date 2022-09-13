const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Recurrente Docs',
  tagline: 'Acepta pagos en línea',
  url: 'https://docs.recurrente.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'recurrente', // Usually your GitHub org/user name.
  projectName: 'recurrente-docs', // Usually your repo name.
  trailingSlash: true,
  themeConfig: {
    navbar: {
      title: 'Recurrente',
      logo: {
        alt: 'Recurrente Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'https://recurrente.com',
          label: 'Página Web',
          position: 'left',
        },
        {
          to: 'https://public.3.basecamp.com/p/gn3Tw4xcJxe2aNBjwM2WUn87',
          label: 'Documentación API',
          position: 'left',
        },
        {
          to: 'mailto:soporte@recurrente.com',
          label: 'Contacto',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © Recurrente`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/recurrente/recurrente-docs/blob/main',
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
