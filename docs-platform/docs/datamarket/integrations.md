---
title: Integrations
description: Connect DataMarket to billing, CRM, and delivery systems.
sidebar_label: Integrations
slug: /datamarket/7.6/integrations
tags:
  - datamarket
  - integrations
---

## Billing
- Stripe (native app)
- Zuora (webhook connector)
- Custom billing via REST or webhook events

## CRM
Push subscription events into Salesforce:
```bash
curl -X POST https://hooks.getrightdata.com/v1/salesforce \
  -H "Authorization: Bearer $CRM_TOKEN" \
  -d '{"event":"subscription.created","account":"Acme"}'
```

## Delivery Targets
| Target | Notes |
| --- | --- |
| Snowflake | Uses secure data sharing |
| S3 | Objects encrypted with customer-supplied keys |
| BigQuery | Managed transfer |
| API/Webhook | Signed payloads with per-consumer keys |

Configure integrations via **Settings → Integrations**. Each connector includes health checks and activity logs.
