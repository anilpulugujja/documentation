---
title: Consumer Experience
description: Guide buyers through discovery, subscription, and delivery.
sidebar_label: Data Consumption
slug: /datamarket/7.6/data-consumption
tags:
  - datamarket
  - consumption
---

## Discovery
- Full-text search with typo tolerance.
- Facets for industries, freshness, geography, and licensing tier.

## Subscription Flow
1. Buyer selects a plan and signs the standard agreement.
2. Optional legal or finance approval triggers before activation.
3. Fulfillment begins automatically once payment clears.

## Delivery
- Snowflake Data Share
- Secure API token
- Event-based webhook (push JSON payloads)

```bash
curl https://api.getrightdata.com/v1/datamarket/deliveries/abc123 \
  -H "Authorization: Bearer $DELIVERY_TOKEN"
```

Consumers can monitor pipeline SLAs under **My Subscriptions → Activity**.
