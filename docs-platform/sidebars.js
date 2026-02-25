/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  datatrustSidebar: [
    'datatrust/getting-started',
    'datatrust/installation',
    'datatrust/metadata',
    'datatrust/data-quality',
    'datatrust/observability',
    'datatrust/administration',
    'datatrust/troubleshooting',
  ],
  rightsightSidebar: [
    'rightsight/overview',
    'rightsight/monitoring',
    'rightsight/alerts',
    'rightsight/ai-enrichment',
    'rightsight/dashboards',
    'rightsight/configuration',
  ],
  datamarketSidebar: [
    'datamarket/overview',
    'datamarket/marketplace-setup',
    'datamarket/data-publishing',
    'datamarket/data-consumption',
    'datamarket/governance',
    'datamarket/access-control',
    'datamarket/integrations',
  ],
  apiSidebar: [
    'api/authentication',
    'api/rest-endpoints',
    'api/webhooks',
    'api/sdk-examples',
    'api/error-codes',
  ],
  releaseNotesSidebar: [
    'release-notes/7-6',
    'release-notes/7-5',
    'release-notes/7-0',
  ],
};

module.exports = sidebars;
