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
    path: '/getrightdata/datamarket',
    component: ComponentCreator('/getrightdata/datamarket', 'b72'),
    routes: [
      {
        path: '/getrightdata/datamarket/latest',
        component: ComponentCreator('/getrightdata/datamarket/latest', 'f48'),
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
            path: '/getrightdata/datamarket/latest/tags/release-notes',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/release-notes', 'be3'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest/tags/setup',
            component: ComponentCreator('/getrightdata/datamarket/latest/tags/setup', 'e9c'),
            exact: true
          },
          {
            path: '/getrightdata/datamarket/latest',
            component: ComponentCreator('/getrightdata/datamarket/latest', '0e5'),
            routes: [
              {
                path: '/getrightdata/datamarket/latest/access-control',
                component: ComponentCreator('/getrightdata/datamarket/latest/access-control', '940'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/data-consumption',
                component: ComponentCreator('/getrightdata/datamarket/latest/data-consumption', '64e'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/data-publishing',
                component: ComponentCreator('/getrightdata/datamarket/latest/data-publishing', '443'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/governance',
                component: ComponentCreator('/getrightdata/datamarket/latest/governance', 'bf5'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/integrations',
                component: ComponentCreator('/getrightdata/datamarket/latest/integrations', '5b1'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/marketplace-setup',
                component: ComponentCreator('/getrightdata/datamarket/latest/marketplace-setup', '526'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/overview',
                component: ComponentCreator('/getrightdata/datamarket/latest/overview', '934'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/getrightdata/datamarket/latest/release-notes/latest',
                component: ComponentCreator('/getrightdata/datamarket/latest/release-notes/latest', 'efd'),
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
    component: ComponentCreator('/getrightdata/datatrust', '9c0'),
    routes: [
      {
        path: '/getrightdata/datatrust/7.0',
        component: ComponentCreator('/getrightdata/datatrust/7.0', '1aa'),
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
            path: '/getrightdata/datatrust/7.0/tags/release-notes',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/release-notes', '7fc'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0/tags/troubleshooting',
            component: ComponentCreator('/getrightdata/datatrust/7.0/tags/troubleshooting', 'ce8'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.0',
            component: ComponentCreator('/getrightdata/datatrust/7.0', '023'),
            routes: [
              {
                path: '/getrightdata/datatrust/7.0/administration',
                component: ComponentCreator('/getrightdata/datatrust/7.0/administration', '5bd'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/data-quality',
                component: ComponentCreator('/getrightdata/datatrust/7.0/data-quality', 'a30'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/getting-started',
                component: ComponentCreator('/getrightdata/datatrust/7.0/getting-started', 'b65'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/installation',
                component: ComponentCreator('/getrightdata/datatrust/7.0/installation', '342'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/metadata',
                component: ComponentCreator('/getrightdata/datatrust/7.0/metadata', 'b4d'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/observability',
                component: ComponentCreator('/getrightdata/datatrust/7.0/observability', '79c'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/release-notes/7-0',
                component: ComponentCreator('/getrightdata/datatrust/7.0/release-notes/7-0', 'e43'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.0/troubleshooting',
                component: ComponentCreator('/getrightdata/datatrust/7.0/troubleshooting', '912'),
                exact: true,
                sidebar: "datatrustSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/getrightdata/datatrust/7.6',
        component: ComponentCreator('/getrightdata/datatrust/7.6', '33f'),
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
            path: '/getrightdata/datatrust/7.6/tags/release-notes',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/release-notes', '3fa'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6/tags/troubleshooting',
            component: ComponentCreator('/getrightdata/datatrust/7.6/tags/troubleshooting', 'f19'),
            exact: true
          },
          {
            path: '/getrightdata/datatrust/7.6',
            component: ComponentCreator('/getrightdata/datatrust/7.6', '313'),
            routes: [
              {
                path: '/getrightdata/datatrust/7.6/administration',
                component: ComponentCreator('/getrightdata/datatrust/7.6/administration', '1cf'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/data-quality',
                component: ComponentCreator('/getrightdata/datatrust/7.6/data-quality', '584'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/replace-with-page-title',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/replace-with-page-title', '78e'),
                exact: true
              },
              {
                path: '/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/t',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getrightdata/datatrust/7.6/t', '623'),
                exact: true
              },
              {
                path: '/getrightdata/datatrust/7.6/getting-started',
                component: ComponentCreator('/getrightdata/datatrust/7.6/getting-started', '93d'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/installation',
                component: ComponentCreator('/getrightdata/datatrust/7.6/installation', '320'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/metadata',
                component: ComponentCreator('/getrightdata/datatrust/7.6/metadata', '540'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/observability',
                component: ComponentCreator('/getrightdata/datatrust/7.6/observability', '460'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/release-notes/7-5',
                component: ComponentCreator('/getrightdata/datatrust/7.6/release-notes/7-5', '268'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/release-notes/7-6',
                component: ComponentCreator('/getrightdata/datatrust/7.6/release-notes/7-6', '75b'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/getrightdata/datatrust/7.6/troubleshooting',
                component: ComponentCreator('/getrightdata/datatrust/7.6/troubleshooting', 'fd4'),
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
    path: '/getrightdata/rightsight',
    component: ComponentCreator('/getrightdata/rightsight', '34f'),
    routes: [
      {
        path: '/getrightdata/rightsight/latest',
        component: ComponentCreator('/getrightdata/rightsight/latest', '9f5'),
        routes: [
          {
            path: '/getrightdata/rightsight/latest/tags',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags', 'f36'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/admin-console',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/admin-console', 'cbf'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/administration',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/administration', '5ce'),
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
            path: '/getrightdata/rightsight/latest/tags/business-semantics',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/business-semantics', '68b'),
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
            path: '/getrightdata/rightsight/latest/tags/domains',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/domains', '6c6'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/governance',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/governance', '6cf'),
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
            path: '/getrightdata/rightsight/latest/tags/platform-settings',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/platform-settings', 'fae'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/release-notes',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/release-notes', 'a64'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest/tags/rightsight',
            component: ComponentCreator('/getrightdata/rightsight/latest/tags/rightsight', '31b'),
            exact: true
          },
          {
            path: '/getrightdata/rightsight/latest',
            component: ComponentCreator('/getrightdata/rightsight/latest', '2b2'),
            routes: [
              {
                path: '/getrightdata/rightsight/latest/ai-enrichment',
                component: ComponentCreator('/getrightdata/rightsight/latest/ai-enrichment', 'd6c'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/alerts',
                component: ComponentCreator('/getrightdata/rightsight/latest/alerts', '8a2'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/configuration',
                component: ComponentCreator('/getrightdata/rightsight/latest/configuration', 'c77'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/dashboards',
                component: ComponentCreator('/getrightdata/rightsight/latest/dashboards', 'd07'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/getrightdata/rightsight/7.6/rightsight/admin-system-preferences',
                component: ComponentCreator('/getrightdata/rightsight/latest/getrightdata/rightsight/7.6/rightsight/admin-system-preferences', '77b'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/getrightdata/rightsight/latest/domains',
                component: ComponentCreator('/getrightdata/rightsight/latest/getrightdata/rightsight/latest/domains', '894'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/monitoring',
                component: ComponentCreator('/getrightdata/rightsight/latest/monitoring', '34d'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/overview',
                component: ComponentCreator('/getrightdata/rightsight/latest/overview', '185'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/getrightdata/rightsight/latest/release-notes/latest',
                component: ComponentCreator('/getrightdata/rightsight/latest/release-notes/latest', '405'),
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
