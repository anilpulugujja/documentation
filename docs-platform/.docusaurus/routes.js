import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '305'),
    routes: [
      {
        path: '/7.0',
        component: ComponentCreator('/7.0', 'ac9'),
        routes: [
          {
            path: '/7.0/tags',
            component: ComponentCreator('/7.0/tags', 'b4c'),
            exact: true
          },
          {
            path: '/7.0/tags/access-control',
            component: ComponentCreator('/7.0/tags/access-control', '4b2'),
            exact: true
          },
          {
            path: '/7.0/tags/administration',
            component: ComponentCreator('/7.0/tags/administration', '046'),
            exact: true
          },
          {
            path: '/7.0/tags/ai',
            component: ComponentCreator('/7.0/tags/ai', '680'),
            exact: true
          },
          {
            path: '/7.0/tags/alerts',
            component: ComponentCreator('/7.0/tags/alerts', '630'),
            exact: true
          },
          {
            path: '/7.0/tags/api',
            component: ComponentCreator('/7.0/tags/api', '766'),
            exact: true
          },
          {
            path: '/7.0/tags/authentication',
            component: ComponentCreator('/7.0/tags/authentication', 'd68'),
            exact: true
          },
          {
            path: '/7.0/tags/configuration',
            component: ComponentCreator('/7.0/tags/configuration', '0d8'),
            exact: true
          },
          {
            path: '/7.0/tags/consumption',
            component: ComponentCreator('/7.0/tags/consumption', '1f5'),
            exact: true
          },
          {
            path: '/7.0/tags/dashboards',
            component: ComponentCreator('/7.0/tags/dashboards', '06d'),
            exact: true
          },
          {
            path: '/7.0/tags/datamarket',
            component: ComponentCreator('/7.0/tags/datamarket', 'd19'),
            exact: true
          },
          {
            path: '/7.0/tags/datatrust',
            component: ComponentCreator('/7.0/tags/datatrust', 'dd9'),
            exact: true
          },
          {
            path: '/7.0/tags/errors',
            component: ComponentCreator('/7.0/tags/errors', 'ced'),
            exact: true
          },
          {
            path: '/7.0/tags/governance',
            component: ComponentCreator('/7.0/tags/governance', 'ccf'),
            exact: true
          },
          {
            path: '/7.0/tags/installation',
            component: ComponentCreator('/7.0/tags/installation', '9f6'),
            exact: true
          },
          {
            path: '/7.0/tags/integrations',
            component: ComponentCreator('/7.0/tags/integrations', '605'),
            exact: true
          },
          {
            path: '/7.0/tags/metadata',
            component: ComponentCreator('/7.0/tags/metadata', '5d0'),
            exact: true
          },
          {
            path: '/7.0/tags/monitoring',
            component: ComponentCreator('/7.0/tags/monitoring', '54e'),
            exact: true
          },
          {
            path: '/7.0/tags/observability',
            component: ComponentCreator('/7.0/tags/observability', 'e12'),
            exact: true
          },
          {
            path: '/7.0/tags/onboarding',
            component: ComponentCreator('/7.0/tags/onboarding', '4c9'),
            exact: true
          },
          {
            path: '/7.0/tags/overview',
            component: ComponentCreator('/7.0/tags/overview', 'f24'),
            exact: true
          },
          {
            path: '/7.0/tags/publishing',
            component: ComponentCreator('/7.0/tags/publishing', '638'),
            exact: true
          },
          {
            path: '/7.0/tags/quality',
            component: ComponentCreator('/7.0/tags/quality', '52c'),
            exact: true
          },
          {
            path: '/7.0/tags/release-notes',
            component: ComponentCreator('/7.0/tags/release-notes', '919'),
            exact: true
          },
          {
            path: '/7.0/tags/rest',
            component: ComponentCreator('/7.0/tags/rest', 'c49'),
            exact: true
          },
          {
            path: '/7.0/tags/rightsight',
            component: ComponentCreator('/7.0/tags/rightsight', '67a'),
            exact: true
          },
          {
            path: '/7.0/tags/sdk',
            component: ComponentCreator('/7.0/tags/sdk', 'ce9'),
            exact: true
          },
          {
            path: '/7.0/tags/setup',
            component: ComponentCreator('/7.0/tags/setup', 'ded'),
            exact: true
          },
          {
            path: '/7.0/tags/troubleshooting',
            component: ComponentCreator('/7.0/tags/troubleshooting', '080'),
            exact: true
          },
          {
            path: '/7.0/tags/webhooks',
            component: ComponentCreator('/7.0/tags/webhooks', 'a03'),
            exact: true
          },
          {
            path: '/7.0',
            component: ComponentCreator('/7.0', 'a4c'),
            routes: [
              {
                path: '/7.0/api/authentication',
                component: ComponentCreator('/7.0/api/authentication', 'cf7'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/7.0/api/error-codes',
                component: ComponentCreator('/7.0/api/error-codes', '492'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/7.0/api/rest-endpoints',
                component: ComponentCreator('/7.0/api/rest-endpoints', 'b77'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/7.0/api/sdk-examples',
                component: ComponentCreator('/7.0/api/sdk-examples', '509'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/7.0/api/webhooks',
                component: ComponentCreator('/7.0/api/webhooks', 'c98'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/access-control',
                component: ComponentCreator('/7.0/datamarket/7.0/access-control', 'afb'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/data-consumption',
                component: ComponentCreator('/7.0/datamarket/7.0/data-consumption', 'f39'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/data-publishing',
                component: ComponentCreator('/7.0/datamarket/7.0/data-publishing', 'c1d'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/governance',
                component: ComponentCreator('/7.0/datamarket/7.0/governance', '0c5'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/integrations',
                component: ComponentCreator('/7.0/datamarket/7.0/integrations', '719'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/marketplace-setup',
                component: ComponentCreator('/7.0/datamarket/7.0/marketplace-setup', '471'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datamarket/7.0/overview',
                component: ComponentCreator('/7.0/datamarket/7.0/overview', '4dd'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/administration',
                component: ComponentCreator('/7.0/datatrust/7.0/administration', '8da'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/data-quality',
                component: ComponentCreator('/7.0/datatrust/7.0/data-quality', 'd23'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/getting-started',
                component: ComponentCreator('/7.0/datatrust/7.0/getting-started', '002'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/installation',
                component: ComponentCreator('/7.0/datatrust/7.0/installation', '5a2'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/metadata',
                component: ComponentCreator('/7.0/datatrust/7.0/metadata', '39e'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/observability',
                component: ComponentCreator('/7.0/datatrust/7.0/observability', '732'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/datatrust/7.0/troubleshooting',
                component: ComponentCreator('/7.0/datatrust/7.0/troubleshooting', '70c'),
                exact: true,
                sidebar: "datatrustSidebar"
              },
              {
                path: '/7.0/release-notes/7-0',
                component: ComponentCreator('/7.0/release-notes/7-0', 'b49'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/7.0/release-notes/7-5',
                component: ComponentCreator('/7.0/release-notes/7-5', 'd75'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/7.0/release-notes/7-6',
                component: ComponentCreator('/7.0/release-notes/7-6', '2d7'),
                exact: true,
                sidebar: "releaseNotesSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/ai-enrichment',
                component: ComponentCreator('/7.0/rightsight/7.0/ai-enrichment', '77f'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/alerts',
                component: ComponentCreator('/7.0/rightsight/7.0/alerts', '0d4'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/configuration',
                component: ComponentCreator('/7.0/rightsight/7.0/configuration', '52c'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/dashboards',
                component: ComponentCreator('/7.0/rightsight/7.0/dashboards', '5a6'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/monitoring',
                component: ComponentCreator('/7.0/rightsight/7.0/monitoring', '813'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/7.0/rightsight/7.0/overview',
                component: ComponentCreator('/7.0/rightsight/7.0/overview', '073'),
                exact: true,
                sidebar: "rightsightSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/',
        component: ComponentCreator('/', '7ac'),
        routes: [
          {
            path: '/tags',
            component: ComponentCreator('/tags', 'ce1'),
            exact: true
          },
          {
            path: '/tags/access-control',
            component: ComponentCreator('/tags/access-control', '84f'),
            exact: true
          },
          {
            path: '/tags/administration',
            component: ComponentCreator('/tags/administration', 'aaa'),
            exact: true
          },
          {
            path: '/tags/ai',
            component: ComponentCreator('/tags/ai', '144'),
            exact: true
          },
          {
            path: '/tags/alerts',
            component: ComponentCreator('/tags/alerts', '8b3'),
            exact: true
          },
          {
            path: '/tags/api',
            component: ComponentCreator('/tags/api', '042'),
            exact: true
          },
          {
            path: '/tags/authentication',
            component: ComponentCreator('/tags/authentication', 'ae2'),
            exact: true
          },
          {
            path: '/tags/configuration',
            component: ComponentCreator('/tags/configuration', '781'),
            exact: true
          },
          {
            path: '/tags/consumption',
            component: ComponentCreator('/tags/consumption', 'f64'),
            exact: true
          },
          {
            path: '/tags/dashboards',
            component: ComponentCreator('/tags/dashboards', 'f58'),
            exact: true
          },
          {
            path: '/tags/datamarket',
            component: ComponentCreator('/tags/datamarket', 'f25'),
            exact: true
          },
          {
            path: '/tags/datatrust',
            component: ComponentCreator('/tags/datatrust', 'a7c'),
            exact: true
          },
          {
            path: '/tags/errors',
            component: ComponentCreator('/tags/errors', '0a7'),
            exact: true
          },
          {
            path: '/tags/governance',
            component: ComponentCreator('/tags/governance', '345'),
            exact: true
          },
          {
            path: '/tags/installation',
            component: ComponentCreator('/tags/installation', 'c74'),
            exact: true
          },
          {
            path: '/tags/integrations',
            component: ComponentCreator('/tags/integrations', '0d6'),
            exact: true
          },
          {
            path: '/tags/metadata',
            component: ComponentCreator('/tags/metadata', '08a'),
            exact: true
          },
          {
            path: '/tags/monitoring',
            component: ComponentCreator('/tags/monitoring', '999'),
            exact: true
          },
          {
            path: '/tags/observability',
            component: ComponentCreator('/tags/observability', 'e51'),
            exact: true
          },
          {
            path: '/tags/onboarding',
            component: ComponentCreator('/tags/onboarding', 'b8e'),
            exact: true
          },
          {
            path: '/tags/overview',
            component: ComponentCreator('/tags/overview', '55f'),
            exact: true
          },
          {
            path: '/tags/publishing',
            component: ComponentCreator('/tags/publishing', '1fd'),
            exact: true
          },
          {
            path: '/tags/quality',
            component: ComponentCreator('/tags/quality', '6ef'),
            exact: true
          },
          {
            path: '/tags/release-notes',
            component: ComponentCreator('/tags/release-notes', '760'),
            exact: true
          },
          {
            path: '/tags/rest',
            component: ComponentCreator('/tags/rest', 'cf9'),
            exact: true
          },
          {
            path: '/tags/rightsight',
            component: ComponentCreator('/tags/rightsight', 'e0b'),
            exact: true
          },
          {
            path: '/tags/sdk',
            component: ComponentCreator('/tags/sdk', '4e2'),
            exact: true
          },
          {
            path: '/tags/setup',
            component: ComponentCreator('/tags/setup', '848'),
            exact: true
          },
          {
            path: '/tags/template',
            component: ComponentCreator('/tags/template', 'd19'),
            exact: true
          },
          {
            path: '/tags/troubleshooting',
            component: ComponentCreator('/tags/troubleshooting', '220'),
            exact: true
          },
          {
            path: '/tags/webhooks',
            component: ComponentCreator('/tags/webhooks', '424'),
            exact: true
          },
          {
            path: '/',
            component: ComponentCreator('/', '016'),
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
              },
              {
                path: '/contributing',
                component: ComponentCreator('/contributing', '3c3'),
                exact: true
              },
              {
                path: '/datamarket/7.6/access-control',
                component: ComponentCreator('/datamarket/7.6/access-control', 'c29'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/data-consumption',
                component: ComponentCreator('/datamarket/7.6/data-consumption', '5a1'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/data-publishing',
                component: ComponentCreator('/datamarket/7.6/data-publishing', '6a0'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/governance',
                component: ComponentCreator('/datamarket/7.6/governance', '3d2'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/integrations',
                component: ComponentCreator('/datamarket/7.6/integrations', '5d1'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/marketplace-setup',
                component: ComponentCreator('/datamarket/7.6/marketplace-setup', '0ef'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datamarket/7.6/overview',
                component: ComponentCreator('/datamarket/7.6/overview', '497'),
                exact: true,
                sidebar: "datamarketSidebar"
              },
              {
                path: '/datatrust/7.6/administration',
                component: ComponentCreator('/datatrust/7.6/administration', '73e'),
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
              },
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
              },
              {
                path: '/rightsight/7.6/ai-enrichment',
                component: ComponentCreator('/rightsight/7.6/ai-enrichment', '598'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/7.6/alerts',
                component: ComponentCreator('/rightsight/7.6/alerts', 'e0e'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/7.6/configuration',
                component: ComponentCreator('/rightsight/7.6/configuration', 'dbe'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/7.6/dashboards',
                component: ComponentCreator('/rightsight/7.6/dashboards', 'cab'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/7.6/monitoring',
                component: ComponentCreator('/rightsight/7.6/monitoring', '70d'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/rightsight/7.6/overview',
                component: ComponentCreator('/rightsight/7.6/overview', 'd30'),
                exact: true,
                sidebar: "rightsightSidebar"
              },
              {
                path: '/templates/api',
                component: ComponentCreator('/templates/api', 'd99'),
                exact: true
              },
              {
                path: '/templates/feature',
                component: ComponentCreator('/templates/feature', 'd71'),
                exact: true
              },
              {
                path: '/templates/release-notes',
                component: ComponentCreator('/templates/release-notes', '6d6'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
