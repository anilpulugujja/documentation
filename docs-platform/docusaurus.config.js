// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GetRightData Docs',
  tagline: 'Unified customer trust, insight, and data exchange documentation',
  url: 'https://docs.getrightdata.com',
  baseUrl: '/',
  favicon: 'img/logo-light.svg',
  organizationName: 'GetRightData',
  projectName: 'docs-platform',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    },
  ],
  customFields: {
    legacyZendeskBaseUrl: 'https://getrightdata.zendesk.com/hc/en-us',
  },
  themes: [],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/GetRightData/docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '7.6',
              path: '7.6',
            },
            '7.0': {
              label: '7.0 (Archived)',
              path: '7.0',
              banner: 'unmaintained',
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    '@docusaurus/plugin-google-gtag',
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      metadata: [
        { name: 'keywords', content: 'DataTrust, RightSight, DataMarket, governance, monitoring' },
        { name: 'theme-color', content: '#1d2cf3' },
      ],
      navbar: {
        title: 'GetRightData',
        logo: {
          alt: 'GetRightData logo',
          src: 'img/logo-light.svg',
          srcDark: 'img/logo-dark.svg',
        },
        hideOnScroll: false,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'datatrustSidebar',
            label: 'DataTrust',
            to: '/datatrust/7.6/getting-started',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'rightsightSidebar',
            label: 'RightSight',
            to: '/rightsight/7.6/overview',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'datamarketSidebar',
            label: 'DataMarket',
            to: '/datamarket/7.6/overview',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            label: 'API',
            to: '/api/authentication',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'releaseNotesSidebar',
            label: 'Release Notes',
            to: '/release-notes/7-6',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                to: 'https://getrightdata.com',
                label: 'getrightdata.com',
              },
            ],
          },
          {
            href: 'https://getrightdata.com',
            label: 'Main Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Products',
            items: [
              { label: 'DataTrust', to: '/datatrust/7.6/getting-started' },
              { label: 'RightSight', to: '/rightsight/7.6/overview' },
              { label: 'DataMarket', to: '/datamarket/7.6/overview' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'API Reference', to: '/api/authentication' },
              { label: 'Release Notes', to: '/release-notes/7-6' },
              { label: 'Status', href: 'https://status.getrightdata.com' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'getrightdata.com', href: 'https://getrightdata.com' },
              { label: 'Support', href: 'mailto:support@getrightdata.com' },
              { label: 'Privacy', href: 'https://getrightdata.com/privacy' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} GetRightData. All rights reserved.`,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
        disableSwitch: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'powershell', 'json'],
      },
      docs: {
        sidebar: {
          hideable: false,
        },
      },
      algolia: {
        appId: 'APPID',
        apiKey: 'SEARCH_API_KEY',
        indexName: 'getrightdata_docs',
        contextualSearch: true,
      },
    }),
};

module.exports = config;
