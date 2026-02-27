import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/getrightdata/api',
    component: ComponentCreator('/getrightdata/api', '788'),
    routes: [
      {
        path: '/getrightdata/api/latest',
        component: ComponentCreator('/getrightdata/api/latest', '618'),
        routes: [
          {
            path: '/getrightdata/api/latest/tags',
            component: ComponentCreator('/getrightdata/api/latest/tags', '777'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/api',
            component: ComponentCreator('/getrightdata/api/latest/tags/api', 'd6b'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/authentication',
            component: ComponentCreator('/getrightdata/api/latest/tags/authentication', '5b1'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/errors',
            component: ComponentCreator('/getrightdata/api/latest/tags/errors', 'aeb'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/rest',
            component: ComponentCreator('/getrightdata/api/latest/tags/rest', 'ad8'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/sdk',
            component: ComponentCreator('/getrightdata/api/latest/tags/sdk', '191'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest/tags/webhooks',
            component: ComponentCreator('/getrightdata/api/latest/tags/webhooks', 'c43'),
            exact: true
          },
          {
            path: '/getrightdata/api/latest',
            component: ComponentCreator('/getrightdata/api/latest', '808'),
            routes: [
              {
                path: '/getrightdata/api/latest/authentication',
                component: ComponentCreator('/getrightdata/api/latest/authentication', 'ca3'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/getrightdata/api/latest/error-codes',
                component: ComponentCreator('/getrightdata/api/latest/error-codes', '45b'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/getrightdata/api/latest/rest-endpoints',
                component: ComponentCreator('/getrightdata/api/latest/rest-endpoints', 'c24'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/getrightdata/api/latest/sdk-examples',
                component: ComponentCreator('/getrightdata/api/latest/sdk-examples', '885'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/getrightdata/api/latest/webhooks',
                component: ComponentCreator('/getrightdata/api/latest/webhooks', '945'),
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
    path: '/getrightdata/datamarket',
    component: ComponentCreator('/getrightdata/datamarket', 'c99'),
    routes: [
      {
        path: '/getrightdata/datamarket/latest',
        component: ComponentCreator('/getrightdata/datamarket/latest', '96c'),
        routes: [
          {
            path: '/getrightdata/datamarket/latest/tags',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags', '0c7'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/access-control',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/access-control', '250'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/consumption',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/consumption', 'de6'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/datamarket',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/datamarket', '295'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/governance',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/governance', '90b'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/integrations',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/integrations', 'ab0'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/overview',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/overview', 'b4c'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/publishing',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/publishing', '80c'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/setup',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/setup', 'e9c'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest',
            component: ComponentCreator('/getrightdata/datamarket/latest', '420'),
            routes: [
              {
                path: '/getrightdata/datamarket/latest/access-control',
                component: ComponentCreator('/getrightdata/datamarket/latest/access-control', '30b'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/data-consumption',
                component: ComponentCreator('/getrightdata/datamarket/latest/data-consumption', 'a0d'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/data-publishing',
                component: ComponentCreator('/getrightdata/datamarket/latest/data-publishing', 'e96'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/governance',
                component: ComponentCreator('/getrightdata/datamarket/latest/governance', 'e14'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/integrations',
                component: ComponentCreator('/getrightdata/datamarket/latest/integrations', '819'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/marketplace-setup',
                component: ComponentCreator('/getrightdata/datamarket/latest/marketplace-setup', 'b5b'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/overview',
                component: ComponentCreator('/getrightdata/datamarket/latest/overview', '528'),
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
    path: '/getrightdata/datatrust',
    component: ComponentCreator('/getrightdata/datatrust', 'b5f'),
    routes: [
      {
        path: '/getrightdata/datatrust/7.0',
        component: ComponentCreator('/getrightdata/datatrust/7.0', 'cb9'),
        routes: [
          {
            path: '/getrightdata/datatrust/7.0/tags',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags', '56d'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/administration',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/administration', 'aba'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/datatrust',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/datatrust', '2df'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/installation',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/installation', '003'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/metadata',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/metadata', '259'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/observability',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/observability', '1cd'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/onboarding',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/onboarding', '119'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/quality',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/quality', '179'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/troubleshooting',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/troubleshooting', 'ce8'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0',
            component: ComponentCreator('/getrightdata/datatrust/7.0', '3e2'),
            routes: [
              {
                path: '/getrightdata/datatrust/7.0/administration',
                component: ComponentCreator('/getrightdata/datatrust/7.0/administration', 'd9f'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/data-quality',
                component: ComponentCreator('/getrightdata/datatrust/7.0/data-quality', 'aaa'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/getting-started',
                component: ComponentCreator('/getrightdata/datatrust/7.0/getting-started', '219'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/installation',
                component: ComponentCreator('/getrightdata/datatrust/7.0/installation', '740'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/metadata',
                component: ComponentCreator('/getrightdata/datatrust/7.0/metadata', '21b'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/observability',
                component: ComponentCreator('/getrightdata/datatrust/7.0/observability', '62c'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/troubleshooting',
                component: ComponentCreator('/getrightdata/datatrust/7.0/troubleshooting', '379'),
                exact: true,
                sidebar: "datatrustSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/getrightdata/datatrust/7.6',
        component: ComponentCreator('/getrightdata/datatrust/7.6', 'b60'),
        routes: [
          {
            path: '/getrightdata/datatrust/7.6/tags',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags', '43d'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/administration',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/administration', '4af'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/category',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/category', '5d2'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/datatrust',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/datatrust', 'b63'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/installation',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/installation', '4b5'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/metadata',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/metadata', '989'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/observability',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/observability', '595'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/onboarding',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/onboarding', '0b4'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/product',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/product', 'ee3'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/quality',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/quality', 'f8a'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/troubleshooting',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/troubleshooting', 'f19'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6',
            component: ComponentCreator('/getrightdata/datatrust/7.6', '387'),
            routes: [
              {
                path: '/getrightdata/datatrust/7.6/administration',
                component: ComponentCreator('/getrightdata/datatrust/7.6/administration', '14f'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/data-quality',
                component: ComponentCreator('/getrightdata/datatrust/7.6/data-quality', 'f3b'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/replace-with-page-title',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/replace-with-page-title', 'b8c'),
                exact: true
              },
              {
                path: '/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/t',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/t', '98b'),
                exact: true
              },
              {
                path: '/getrightdata/datatrust/7.6/getting-started',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getting-started', '5ff'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/installation',
                component: ComponentCreator('/getrightdata/datatrust/7.6/installation', '821'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/metadata',
                component: ComponentCreator('/getrightdata/datatrust/7.6/metadata', '192'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/observability',
                component: ComponentCreator('/getrightdata/datatrust/7.6/observability', 'f71'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/troubleshooting',
                component: ComponentCreator('/getrightdata/datatrust/7.6/troubleshooting', '07c'),
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
    path: '/getrightdata/release-notes',
    component: ComponentCreator('/getrightdata/release-notes', '95f'),
    routes: [
      {
        path: '/getrightdata/release-notes/latest',
        component: ComponentCreator('/getrightdata/release-notes/latest', '5c2'),
        routes: [
          {
            path: '/getrightdata/release-notes/latest/tags',
            component: ComponentCreator('/getrightdata/release-notes/latest/tags', '184'),
            exact: true
          },
          {
            path: '/getrightdata/release-notes/latest/tags/release-notes',
            component: ComponentCreator('/getrightdata/release-notes/latest/tags/release-notes', 'e75'),
            exact: true
          },
          {
            path: '/getrightdata/release-notes/latest',
            component: ComponentCreator('/getrightdata/release-notes/latest', 'b25'),
            routes: [
              {
                path: '/getrightdata/release-notes/latest/7-0',
                component: ComponentCreator('/getrightdata/release-notes/latest/7-0', '2ce'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/getrightdata/release-notes/latest/7-5',
                component: ComponentCreator('/getrightdata/release-notes/latest/7-5', '9d1'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/getrightdata/release-notes/latest/7-6',
                component: ComponentCreator('/getrightdata/release-notes/latest/7-6', '22f'),
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
    path: '/getrightdata/rightsight',
    component: ComponentCreator('/getrightdata/rightsight', 'd5b'),
    routes: [
      {
        path: '/getrightdata/rightsight/latest',
        component: ComponentCreator('/getrightdata/rightsight/latest', '64f'),
        routes: [
          {
            path: '/getrightdata/rightsight/latest/tags',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags', 'f36'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/ai',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/ai', '280'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/alerts',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/alerts', 'bc1'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/configuration',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/configuration', 'd11'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/dashboards',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/dashboards', 'a8c'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/monitoring',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/monitoring', '8c1'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/overview',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/overview', '51b'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/rightsight',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/rightsight', '31b'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest',
            component: ComponentCreator('/getrightdata/rightsight/latest', 'ff3'),
            routes: [
              {
                path: '/getrightdata/rightsight/latest/ai-enrichment',
                component: ComponentCreator('/getrightdata/rightsight/latest/ai-enrichment', 'ad7'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/alerts',
                component: ComponentCreator('/getrightdata/rightsight/latest/alerts', 'ec3'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/configuration',
                component: ComponentCreator('/getrightdata/rightsight/latest/configuration', 'c06'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/dashboards',
                component: ComponentCreator('/getrightdata/rightsight/latest/dashboards', '629'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/monitoring',
                component: ComponentCreator('/getrightdata/rightsight/latest/monitoring', 'add'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/overview',
                component: ComponentCreator('/getrightdata/rightsight/latest/overview', '165'),
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
