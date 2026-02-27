---
title: Access Control Model
description: Manage roles, entitlements, and license keys for DataMarket.
sidebar_label: Access Control
tags:
  - datamarket
  - access-control
---

## Roles
| Role | Capabilities |
| --- | --- |
| Marketplace Admin | Configure catalog, branding, billing, workflows |
| Product Owner | Publish offers, approve requests, manage fulfillment |
| Analyst | View subscriptions, monitor metrics |

## Entitlements
- Each plan defines entitlements (datasets, refresh cadence).
- Entitlements sync automatically to delivery targets (Snowflake shares, API scopes).

## License Keys
For API-based delivery you can mint license keys:
```bash
curl -X POST /v1/datamarket/licenses \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"offerId": "global-store-sales", "expiresInDays": 30}'
```

Add custom metadata (seat count, region) to drive automation.
