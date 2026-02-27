// @ts-check
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const organizations = require('./config/organizations.json');
const products = require('./config/products.json');

const productCatalog = new Map(products.map((product) => [product.id, product]));

const getProduct = (productId) => {
  const product = productCatalog.get(productId);
  if (!product) {
    throw new Error(`Unknown product "${productId}" referenced in organizations config.`);
  }
  return product;
};

const createDocsPlugins = () => {
  const plugins = [];
  organizations.forEach((org) => {
    org.products.forEach((productId) => {
      const product = getProduct(productId);
      const productRoot = `organizations/${org.id}/products/${product.id}`;
      const pluginId = `${org.id}-${product.id}`;
      const baseRoute = `${org.slug}/${product.slug}`;
      const pluginOptions = {
        id: pluginId,
        path: `${productRoot}/docs`,
        routeBasePath: baseRoute,
        sidebarPath: require.resolve(`./${productRoot}/sidebar.js`),
        editUrl: `https://github.com/GetRightData/docs/edit/main/${productRoot}/docs/`,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      };

      if (product.versioning.type === 'versioned') {
        const { current, archived = [] } = product.versioning;
        pluginOptions.includeCurrentVersion = true;
        pluginOptions.lastVersion = 'current';
        pluginOptions.versions = {
          current: {
            label: current,
            path: current,
          },
        };
        archived.forEach((versionLabel) => {
          pluginOptions.versions[versionLabel] = {
            label: `${versionLabel} (Archived)`,
            path: versionLabel,
            banner: 'unmaintained',
          };
        });
      } else {
        const label = product.versioning.label || 'Latest';
        pluginOptions.includeCurrentVersion = true;
        pluginOptions.lastVersion = 'current';
        pluginOptions.versions = {
          current: {
            label,
            path: 'latest',
          },
        };
      }

      plugins.push(['@docusaurus/plugin-content-docs', pluginOptions]);
    });
  });
  return plugins;
};

const docsPlugins = createDocsPlugins();
const defaultOrg = organizations[0];
if (!defaultOrg) {
  throw new Error('At least one organization must be defined in config/organizations.json');
}

const buildDocLink = (org, product, docSlug) => {
  if (product.versioning.type === 'versioned') {
    return `/${org.slug}/${product.slug}/${product.versioning.current}/${docSlug}`;
  }
  return `/${org.slug}/${product.slug}/latest/${docSlug}`;
};

const getDefaultOrgProductLink = (productId) => {
  const product = getProduct(productId);
  const docSlug = product.entryDoc || 'overview';
  return buildDocLink(defaultOrg, product, docSlug);
};

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
    organizations,
    products,
    defaultOrgId: defaultOrg.id,
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
    ...docsPlugins,
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          const redirects = [];
          const defaultOrgSlug = defaultOrg.slug;
          organizations
            .filter((org) => org.slug === defaultOrgSlug)
            .forEach((org) => {
              org.products.forEach((productId) => {
                const product = getProduct(productId);
                const productSlug = product.slug;
                const orgPrefix = `/${org.slug}/${productSlug}`;
                if (!existingPath.startsWith(orgPrefix)) {
                  return;
                }
                const rest = existingPath.slice(orgPrefix.length);
                if (product.versioning.type === 'versioned') {
                  redirects.push(`/${productSlug}${rest}`);
                } else {
                  const restWithoutLatest = rest.startsWith('/latest')
                    ? rest.replace('/latest', '')
                    : rest;
                  redirects.push(`/${productSlug}${restWithoutLatest}`);
                }
              });
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
          docsPluginId: 'getrightdata-datatrust',
          sidebarId: 'datatrustSidebar',
          label: 'DataTrust',
          to: getDefaultOrgProductLink('datatrust'),
          position: 'left',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'getrightdata-rightsight',
          sidebarId: 'rightsightSidebar',
          label: 'RightSight',
          to: getDefaultOrgProductLink('rightsight'),
          position: 'left',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'getrightdata-datamarket',
          sidebarId: 'datamarketSidebar',
          label: 'DataMarket',
          to: getDefaultOrgProductLink('datamarket'),
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'getrightdata-datatrust',
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
              { label: 'DataTrust', to: getDefaultOrgProductLink('datatrust') },
              { label: 'RightSight', to: getDefaultOrgProductLink('rightsight') },
              { label: 'DataMarket', to: getDefaultOrgProductLink('datamarket') },
            ],
          },
          {
            title: 'Resources',
            items: [
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
