---
title: REST Endpoints
description: Reference for core REST resources across DataTrust, RightSight, and DataMarket.
sidebar_label: REST Endpoints
slug: /api/rest-endpoints
tags:
  - api
  - rest
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

| Product | Method | Path | Description |
| --- | --- | --- | --- |
| DataTrust | GET | `/v1/datatrust/domains` | List governance domains |
| DataTrust | POST | `/v1/datatrust/policies` | Create a quality policy |
| RightSight | GET | `/v1/rightsight/monitors` | Retrieve monitors |
| RightSight | POST | `/v1/rightsight/alerts` | Create alert policies |
| DataMarket | GET | `/v1/datamarket/offers` | List published offers |
| DataMarket | POST | `/v1/datamarket/licenses` | Mint API license keys |

### Example Request
```bash
curl https://api.getrightdata.com/v1/datatrust/domains \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

Paginate with `page` and `pageSize` query params (defaults: `page=1`, `pageSize=50`).