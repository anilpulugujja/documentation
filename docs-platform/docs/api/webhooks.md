---
title: Webhooks
description: Receive push events for governance, monitoring, and marketplace workflows.
sidebar_label: Webhooks
tags:
  - api
  - webhooks
---

Subscribe to webhook topics via the API or UI. Each subscription includes:
- Target URL
- Shared secret for HMAC signatures
- Topic filters

## Available Topics
- `datatrust.policy_failed`
- `rightsight.alert_triggered`
- `datamarket.subscription_created`

## Subscription Example
```bash
curl -X POST https://api.getrightdata.com/v1/webhooks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "url": "https://hooks.acme.com/grd",
        "topics": ["datamarket.subscription_created"],
        "secret": "supersecret"
      }'
```

## Signature Validation
1. Read the `X-GRD-Signature` header.
2. Compute `HMAC_SHA256(payload, secret)`.
3. Compare using a constant-time method.
