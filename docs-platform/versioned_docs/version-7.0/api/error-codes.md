---
title: Error Codes
description: Understand API and delivery error responses with remediation tips.
sidebar_label: Error Codes
slug: /api/error-codes
tags:
  - api
  - errors
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

| Code | HTTP | Meaning | Fix |
| --- | --- | --- | --- |
| `GRD-1001` | 401 | Token missing/expired | Refresh OAuth token |
| `GRD-2003` | 403 | Scope insufficient | Request higher privileges |
| `GRD-3007` | 404 | Resource not found | Verify ID and environment |
| `GRD-4100` | 409 | Version conflict | Retry with latest `etag` |
| `GRD-5000` | 500 | Internal error | Retry with exponential backoff |

All errors include a `traceId`. Provide it when opening support cases.