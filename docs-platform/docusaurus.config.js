// @ts-check
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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
    askPageUrl: process.env.DOCS_ASK_URL || 'https://getrightdata.com/contact',
    rawContentBaseUrl:
      process.env.DOCS_RAW_BASE_URL ||
      'https://raw.githubusercontent.com/GetRightData/docs/main/',
    localeOptions: {
      regions: [
        { code: 'us', label: 'United States' },
        { code: 'eu', label: 'Europe' },
      ],
      languages: [
        { code: 'en', label: 'English (United States)' },
        { code: 'en-gb', label: 'English (United Kingdom)' },
      ],
      defaultRegion: 'us',
      defaultLanguage: 'en',
    },
  },
  themes: [],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        // gtag: { trackingID: 'G-XXXXXXXXXX', anonymizeIP: true }, // Enable when you have a real GA4 ID
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'datatrust',
        path: 'docs/datatrust',
        routeBasePath: 'datatrust',
        sidebarPath: require.resolve('./sidebars/datatrust.js'),
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
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'rightsight',
        path: 'docs/rightsight',
        routeBasePath: 'rightsight',
        sidebarPath: require.resolve('./sidebars/rightsight.js'),
        editUrl: 'https://github.com/GetRightData/docs/edit/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'datamarket',
        path: 'docs/datamarket',
        routeBasePath: 'datamarket',
        sidebarPath: require.resolve('./sidebars/datamarket.js'),
        editUrl: 'https://github.com/GetRightData/docs/edit/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./sidebars/api.js'),
        editUrl: 'https://github.com/GetRightData/docs/edit/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'release-notes',
        path: 'docs/release-notes',
        routeBasePath: 'release-notes',
        sidebarPath: require.resolve('./sidebars/release-notes.js'),
        editUrl: 'https://github.com/GetRightData/docs/edit/main/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          const mappings = [
            { legacyPrefixes: ['/rightsight/7.6', '/rightsight/7.0'], targetPrefix: '/rightsight' },
            { legacyPrefixes: ['/datamarket/7.6', '/datamarket/7.0'], targetPrefix: '/datamarket' },
          ];
          const redirects = [];
          mappings.forEach(({ legacyPrefixes, targetPrefix }) => {
            if (existingPath.startsWith(targetPrefix)) {
              const rest = existingPath.slice(targetPrefix.length);
              legacyPrefixes.forEach((legacyPrefix) => {
                redirects.push(`${legacyPrefix}${rest || ''}`);
              });
            }
          });
          return redirects;
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      breadcrumbs: {
        barStyle: 'default',
      },
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
            docsPluginId: 'datatrust',
            sidebarId: 'datatrustSidebar',
            label: 'DataTrust',
            to: '/datatrust/7.6/getting-started',
            position: 'left',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'rightsight',
            sidebarId: 'rightsightSidebar',
            label: 'RightSight',
            to: '/rightsight/overview',
            position: 'left',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'datamarket',
            sidebarId: 'datamarketSidebar',
            label: 'DataMarket',
            to: '/datamarket/overview',
            position: 'left',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'api',
            sidebarId: 'apiSidebar',
            label: 'API',
            to: '/api/authentication',
            position: 'left',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'release-notes',
            sidebarId: 'releaseNotesSidebar',
            label: 'Release Notes',
            to: '/release-notes/7-6',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'datatrust',
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
              { label: 'RightSight', to: '/rightsight/overview' },
              { label: 'DataMarket', to: '/datamarket/overview' },
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
    }),
};

module.exports = config;
