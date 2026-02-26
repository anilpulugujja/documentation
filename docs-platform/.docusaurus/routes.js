import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/api',
    component: ComponentCreator('/api', 'cac'),
    routes: [
      {
        path: '/api',
        component: ComponentCreator('/api', '1b8'),
        routes: [
          {
            path: '/api/tags',
            component: ComponentCreator('/api/tags', '91f'),
            exact: true
          },
          {
            path: '/api/tags/api',
            component: ComponentCreator('/api/tags/api', '1c8'),
            exact: true
          },
          {
            path: '/api/tags/authentication',
            component: ComponentCreator('/api/tags/authentication', '6d2'),
            exact: true
          },
          {
            path: '/api/tags/errors',
            component: ComponentCreator('/api/tags/errors', '05e'),
            exact: true
          },
          {
            path: '/api/tags/rest',
            component: ComponentCreator('/api/tags/rest', 'eda'),
            exact: true
          },
          {
            path: '/api/tags/sdk',
            component: ComponentCreator('/api/tags/sdk', '5b0'),
            exact: true
          },
          {
            path: '/api/tags/webhooks',
            component: ComponentCreator('/api/tags/webhooks', '39c'),
            exact: true
          },
          {
            path: '/api',
            component: ComponentCreator('/api', 'ad5'),
            routes: [
              {
                path: '/api/authentication',
                component: ComponentCreator('/api/authentication', 'ff5'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/error-codes',
                component: ComponentCreator('/api/error-codes', '5ce'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/rest-endpoints',
                component: ComponentCreator('/api/rest-endpoints', '05d'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/sdk-examples',
                component: ComponentCreator('/api/sdk-examples', '903'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/webhooks',
                component: ComponentCreator('/api/webhooks', '3e3'),
                exact: true,
                sidebar: "apiSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/datamarket',
    component: ComponentCreator('/datamarket', '4eb'),
    routes: [
      {
        path: '/datamarket',
        component: ComponentCreator('/datamarket', '8e4'),
        routes: [
          {
            path: '/datamarket/tags',
            component: ComponentCreator('/datamarket/tags', '221'),
            exact: true
          },
          {
            path: '/datamarket/tags/access-control',
            component: ComponentCreator('/datamarket/tags/access-control', '9c4'),
            exact: true
          },
          {
            path: '/datamarket/tags/consumption',
            component: ComponentCreator('/datamarket/tags/consumption', '22b'),
            exact: true
          },
          {
            path: '/datamarket/tags/datamarket',
            component: ComponentCreator('/datamarket/tags/datamarket', 'd86'),
            exact: true
          },
          {
            path: '/datamarket/tags/governance',
            component: ComponentCreator('/datamarket/tags/governance', 'a25'),
            exact: true
          },
          {
            path: '/datamarket/tags/integrations',
            component: ComponentCreator('/datamarket/tags/integrations', 'bd0'),
            exact: true
          },
          {
            path: '/datamarket/tags/overview',
            component: ComponentCreator('/datamarket/tags/overview', '988'),
            exact: true
          },
          {
            path: '/datamarket/tags/publishing',
            component: ComponentCreator('/datamarket/tags/publishing', '6d2'),
            exact: true
          },
          {
            path: '/datamarket/tags/setup',
            component: ComponentCreator('/datamarket/tags/setup', 'b09'),
            exact: true
          },
          {
            path: '/datamarket',
            component: ComponentCreator('/datamarket', '069'),
            routes: [
              {
                path: '/datamarket/access-control',
                component: ComponentCreator('/datamarket/access-control', 'c7b'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/data-consumption',
                component: ComponentCreator('/datamarket/data-consumption', '592'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/data-publishing',
                component: ComponentCreator('/datamarket/data-publishing', '788'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/governance',
                component: ComponentCreator('/datamarket/governance', '2c3'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/integrations',
                component: ComponentCreator('/datamarket/integrations', '24c'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/marketplace-setup',
                component: ComponentCreator('/datamarket/marketplace-setup', '804'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/overview',
                component: ComponentCreator('/datamarket/overview', '309'),
                exact: true,
                sidebar: "datamarketSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/datatrust',
    component: ComponentCreator('/datatrust', 'ef3'),
    routes: [
      {
        path: '/datatrust/7.0',
        component: ComponentCreator('/datatrust/7.0', '525'),
        routes: [
          {
            path: '/datatrust/7.0/tags',
            component: ComponentCreator('/datatrust/7.0/tags', '57c'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/administration',
            component: ComponentCreator('/datatrust/7.0/tags/administration', 'db5'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/datatrust',
            component: ComponentCreator('/datatrust/7.0/tags/datatrust', '35f'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/installation',
            component: ComponentCreator('/datatrust/7.0/tags/installation', '7ba'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/metadata',
            component: ComponentCreator('/datatrust/7.0/tags/metadata', '577'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/observability',
            component: ComponentCreator('/datatrust/7.0/tags/observability', '5c7'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/onboarding',
            component: ComponentCreator('/datatrust/7.0/tags/onboarding', '959'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/quality',
            component: ComponentCreator('/datatrust/7.0/tags/quality', '517'),
            exact: true
          },
          {
            path: '/datatrust/7.0/tags/troubleshooting',
            component: ComponentCreator('/datatrust/7.0/tags/troubleshooting', '099'),
            exact: true
          },
          {
            path: '/datatrust/7.0',
            component: ComponentCreator('/datatrust/7.0', 'adc'),
            routes: [
              {
                path: '/datatrust/7.0/administration',
                component: ComponentCreator('/datatrust/7.0/administration', 'f67'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/data-quality',
                component: ComponentCreator('/datatrust/7.0/data-quality', '1c3'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/getting-started',
                component: ComponentCreator('/datatrust/7.0/getting-started', '8fe'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/installation',
                component: ComponentCreator('/datatrust/7.0/installation', '675'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/metadata',
                component: ComponentCreator('/datatrust/7.0/metadata', 'b27'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/observability',
                component: ComponentCreator('/datatrust/7.0/observability', 'ce8'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/troubleshooting',
                component: ComponentCreator('/datatrust/7.0/troubleshooting', '6d3'),
                exact: true,
                sidebar: "datatrustSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/datatrust/7.6',
        component: ComponentCreator('/datatrust/7.6', '4ac'),
        routes: [
          {
            path: '/datatrust/7.6/tags',
            component: ComponentCreator('/datatrust/7.6/tags', '386'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/administration',
            component: ComponentCreator('/datatrust/7.6/tags/administration', '93f'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/category',
            component: ComponentCreator('/datatrust/7.6/tags/category', 'ba0'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/datatrust',
            component: ComponentCreator('/datatrust/7.6/tags/datatrust', 'b29'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/installation',
            component: ComponentCreator('/datatrust/7.6/tags/installation', '6fc'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/metadata',
            component: ComponentCreator('/datatrust/7.6/tags/metadata', '88d'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/observability',
            component: ComponentCreator('/datatrust/7.6/tags/observability', '3f5'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/onboarding',
            component: ComponentCreator('/datatrust/7.6/tags/onboarding', '632'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/product',
            component: ComponentCreator('/datatrust/7.6/tags/product', '406'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/quality',
            component: ComponentCreator('/datatrust/7.6/tags/quality', '5f2'),
            exact: true
          },
          {
            path: '/datatrust/7.6/tags/troubleshooting',
            component: ComponentCreator('/datatrust/7.6/tags/troubleshooting', '44a'),
            exact: true
          },
          {
            path: '/datatrust/7.6',
            component: ComponentCreator('/datatrust/7.6', 'e1c'),
            routes: [
              {
                path: '/datatrust/7.6/administration',
                component: ComponentCreator('/datatrust/7.6/administration', '910'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/data-quality',
                component: ComponentCreator('/datatrust/7.6/data-quality', '159'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/datatrust/7.6/replace-with-page-title',
                component: ComponentCreator('/datatrust/7.6/datatrust/7.6/replace-with-page-title', 'fda'),
                exact: true
              },
              {
                path: '/datatrust/7.6/getting-started',
                component: ComponentCreator('/datatrust/7.6/getting-started', 'c85'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/installation',
                component: ComponentCreator('/datatrust/7.6/installation', '8bb'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/metadata',
                component: ComponentCreator('/datatrust/7.6/metadata', 'e76'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/observability',
                component: ComponentCreator('/datatrust/7.6/observability', '155'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/troubleshooting',
                component: ComponentCreator('/datatrust/7.6/troubleshooting', '5bb'),
                exact: true,
                sidebar: "datatrustSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/release-notes',
    component: ComponentCreator('/release-notes', '427'),
    routes: [
      {
        path: '/release-notes',
        component: ComponentCreator('/release-notes', '0e7'),
        routes: [
          {
            path: '/release-notes/tags',
            component: ComponentCreator('/release-notes/tags', '425'),
            exact: true
          },
          {
            path: '/release-notes/tags/release-notes',
            component: ComponentCreator('/release-notes/tags/release-notes', '2eb'),
            exact: true
          },
          {
            path: '/release-notes',
            component: ComponentCreator('/release-notes', 'b33'),
            routes: [
              {
                path: '/release-notes/7-0',
                component: ComponentCreator('/release-notes/7-0', 'cb3'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/release-notes/7-5',
                component: ComponentCreator('/release-notes/7-5', '6af'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/release-notes/7-6',
                component: ComponentCreator('/release-notes/7-6', '941'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/rightsight',
    component: ComponentCreator('/rightsight', '3f8'),
    routes: [
      {
        path: '/rightsight',
        component: ComponentCreator('/rightsight', 'cf5'),
        routes: [
          {
            path: '/rightsight/tags',
            component: ComponentCreator('/rightsight/tags', 'd86'),
            exact: true
          },
          {
            path: '/rightsight/tags/ai',
            component: ComponentCreator('/rightsight/tags/ai', '828'),
            exact: true
          },
          {
            path: '/rightsight/tags/alerts',
            component: ComponentCreator('/rightsight/tags/alerts', 'db1'),
            exact: true
          },
          {
            path: '/rightsight/tags/configuration',
            component: ComponentCreator('/rightsight/tags/configuration', 'a8f'),
            exact: true
          },
          {
            path: '/rightsight/tags/dashboards',
            component: ComponentCreator('/rightsight/tags/dashboards', 'ebe'),
            exact: true
          },
          {
            path: '/rightsight/tags/monitoring',
            component: ComponentCreator('/rightsight/tags/monitoring', '986'),
            exact: true
          },
          {
            path: '/rightsight/tags/overview',
            component: ComponentCreator('/rightsight/tags/overview', 'd89'),
            exact: true
          },
          {
            path: '/rightsight/tags/rightsight',
            component: ComponentCreator('/rightsight/tags/rightsight', '814'),
            exact: true
          },
          {
            path: '/rightsight',
            component: ComponentCreator('/rightsight', '7f4'),
            routes: [
              {
                path: '/rightsight/ai-enrichment',
                component: ComponentCreator('/rightsight/ai-enrichment', 'd63'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/alerts',
                component: ComponentCreator('/rightsight/alerts', '683'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/configuration',
                component: ComponentCreator('/rightsight/configuration', '4d0'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/dashboards',
                component: ComponentCreator('/rightsight/dashboards', '5ca'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/monitoring',
                component: ComponentCreator('/rightsight/monitoring', 'e99'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/overview',
                component: ComponentCreator('/rightsight/overview', 'e59'),
                exact: true,
                sidebar: "rightsightSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
