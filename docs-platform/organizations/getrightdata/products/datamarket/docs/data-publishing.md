---
title: Publishing Data Products
description: Turn curated datasets into catalog-ready offers with pricing and SLAs.
sidebar_label: Data Publishing
tags:
  - datamarket
  - publishing
---

## Create an Offer
1. Click **Products → New Offer**.
2. Choose the source (DataTrust domain, Snowflake share, API feed).
3. Provide marketing copy, schema previews, and sample files.
4. Define fulfillment target (Snowflake share, API, webhook, S3 dropzone).

## Pricing Models
- Subscription (monthly/annual)
- Consumption-based (per row, per API call)
- One-time download

```json
{
  "name": "Global Store Sales",
  "plan": {
    "type": "subscription",
    "term": "annual",
    "price": 42000,
    "currency": "USD"
  },
  "delivery": {
    "type": "snowflake_share",
    "account": "ACME_PROD"
  }
}
```

## Reviews & Approvals
Requests route to product stewards for approval; use **Workflows** to enforce review SLAs.
