---
title: API Template
description: Template for API reference pages.
slug: /templates/api
sidebar_label: API Template
hide_table_of_contents: false
tags:
  - template
---

## Endpoint
```
METHOD /v1/path
```

## Description
Short explanation of what the endpoint accomplishes.

## Request
| Field | Type | Required | Description |
| --- | --- | --- | --- |
| field | string | Yes | Explanation |

## Example
```bash
curl -X POST https://api.getrightdata.com/v1/path \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"payload":true}'
```

## Response
```json
{
  "id": "example",
  "status": "success"
}
```

## Errors
List notable error codes, fallback behaviors, and remediation tips.
