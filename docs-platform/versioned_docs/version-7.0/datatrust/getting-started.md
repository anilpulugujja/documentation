---
title: Getting Started with DataTrust
description: Prepare your tenant, connect sources, and unlock trusted datasets in minutes.
sidebar_label: Getting Started
slug: /datatrust/7.0/getting-started
tags:
  - datatrust
  - onboarding
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

DataTrust 7.0 unifies data governance, cataloging, and trust scoring in a single control plane. Follow the checklist below to bring your first dataset online.

## Prerequisites
- An active GetRightData tenant with DataTrust enabled.
- Org-wide SSO configured (Okta, Azure AD, or Google Workspaces).
- Network access to the systems you intend to scan.

## Quick Start
1. Sign in to [console.getrightdata.com](https://console.getrightdata.com) and switch to the **DataTrust** space.
2. Select **New Source** and choose one of the managed connectors (Snowflake, BigQuery, Databricks, Redshift).
3. Provide read-only credentials and click **Validate Connection**. Credential errors are surfaced inline.
4. Define the domains you want to register and assign business owners.
5. Launch the initial scan. Progress appears on the Source detail page with data quality hints.

:::tip Automate onboarding
Use the API to register multiple domains concurrently. See the `POST /v1/datatrust/domains` endpoint for payload examples.
:::

## Sample Automation Script
```bash
curl -X POST https://api.getrightdata.com/v1/datatrust/domains \
  -H "Authorization: Bearer $GRD_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Finance",
        "owner": "finance-ops@getrightdata.com",
        "sources": ["snowflake://corp-finance"],
        "tags": ["sox", "gold"]
      }'
```

## Next Steps
- Map metadata using the **Metadata Studio** (see [Metadata](./metadata.md)).
- Enable automated controls from **Data Quality Policies**.
- Invite data stewards via **Administration → Access**.