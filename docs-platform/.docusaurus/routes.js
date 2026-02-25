import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/api',
    component: ComponentCreator('/api', '4e8'),
    routes: [
      {
        path: '/api',
        component: ComponentCreator('/api', 'e65'),
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
            component: ComponentCreator('/api', '401'),
            routes: [
              {
                path: '/api/authentication',
                component: ComponentCreator('/api/authentication', 'af5'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/error-codes',
                component: ComponentCreator('/api/error-codes', 'a75'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/rest-endpoints',
                component: ComponentCreator('/api/rest-endpoints', '505'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/sdk-examples',
                component: ComponentCreator('/api/sdk-examples', '7dd'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/webhooks',
                component: ComponentCreator('/api/webhooks', '9ed'),
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
    component: ComponentCreator('/datamarket', 'b79'),
    routes: [
      {
        path: '/datamarket',
        component: ComponentCreator('/datamarket', 'd1f'),
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
            component: ComponentCreator('/datamarket', '179'),
            routes: [
              {
                path: '/datamarket/access-control',
                component: ComponentCreator('/datamarket/access-control', '99b'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/data-consumption',
                component: ComponentCreator('/datamarket/data-consumption', '7fb'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/data-publishing',
                component: ComponentCreator('/datamarket/data-publishing', '30b'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/governance',
                component: ComponentCreator('/datamarket/governance', '1fd'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/integrations',
                component: ComponentCreator('/datamarket/integrations', '1cc'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/marketplace-setup',
                component: ComponentCreator('/datamarket/marketplace-setup', 'eb8'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/overview',
                component: ComponentCreator('/datamarket/overview', '863'),
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
    component: ComponentCreator('/datatrust', '74a'),
    routes: [
      {
        path: '/datatrust/7.0',
        component: ComponentCreator('/datatrust/7.0', '461'),
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
            component: ComponentCreator('/datatrust/7.0', 'd32'),
            routes: [
              {
                path: '/datatrust/7.0/administration',
                component: ComponentCreator('/datatrust/7.0/administration', 'fdf'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/data-quality',
                component: ComponentCreator('/datatrust/7.0/data-quality', '37b'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/getting-started',
                component: ComponentCreator('/datatrust/7.0/getting-started', '425'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/installation',
                component: ComponentCreator('/datatrust/7.0/installation', '9ea'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/metadata',
                component: ComponentCreator('/datatrust/7.0/metadata', '5d8'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/observability',
                component: ComponentCreator('/datatrust/7.0/observability', '9a7'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.0/troubleshooting',
                component: ComponentCreator('/datatrust/7.0/troubleshooting', 'f2e'),
                exact: true,
                sidebar: "datatrustSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/datatrust/7.6',
        component: ComponentCreator('/datatrust/7.6', '5f2'),
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
            component: ComponentCreator('/datatrust/7.6', 'd6d'),
            routes: [
              {
                path: '/datatrust/7.6/administration',
                component: ComponentCreator('/datatrust/7.6/administration', 'c62'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/data-quality',
                component: ComponentCreator('/datatrust/7.6/data-quality', '042'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/getting-started',
                component: ComponentCreator('/datatrust/7.6/getting-started', '95e'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/installation',
                component: ComponentCreator('/datatrust/7.6/installation', '57b'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/metadata',
                component: ComponentCreator('/datatrust/7.6/metadata', '63a'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/observability',
                component: ComponentCreator('/datatrust/7.6/observability', '64d'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/datatrust/7.6/troubleshooting',
                component: ComponentCreator('/datatrust/7.6/troubleshooting', 'e0e'),
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
    component: ComponentCreator('/release-notes', '8b4'),
    routes: [
      {
        path: '/release-notes',
        component: ComponentCreator('/release-notes', '684'),
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
            component: ComponentCreator('/release-notes', '8bd'),
            routes: [
              {
                path: '/release-notes/7-0',
                component: ComponentCreator('/release-notes/7-0', '192'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/release-notes/7-5',
                component: ComponentCreator('/release-notes/7-5', '48f'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/release-notes/7-6',
                component: ComponentCreator('/release-notes/7-6', '0d0'),
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
    component: ComponentCreator('/rightsight', '3e7'),
    routes: [
      {
        path: '/rightsight',
        component: ComponentCreator('/rightsight', '3f4'),
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
            component: ComponentCreator('/rightsight', '523'),
            routes: [
              {
                path: '/rightsight/ai-enrichment',
                component: ComponentCreator('/rightsight/ai-enrichment', 'ef2'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/alerts',
                component: ComponentCreator('/rightsight/alerts', 'd44'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/configuration',
                component: ComponentCreator('/rightsight/configuration', '757'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/dashboards',
                component: ComponentCreator('/rightsight/dashboards', 'a26'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/monitoring',
                component: ComponentCreator('/rightsight/monitoring', 'bac'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/overview',
                component: ComponentCreator('/rightsight/overview', 'a5d'),
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
