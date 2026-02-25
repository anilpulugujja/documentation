---
title: Marketplace Governance
description: Apply policies, approvals, and audits to every transaction.
sidebar_label: Governance
slug: /datamarket/7.0/governance
tags:
  - datamarket
  - governance
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

## Policies
- **Usage policies**: limit use cases and geographies.
- **Export controls**: enforce ITAR/EAR compliance via buyer attributes.
- **PII handling**: auto reject deals missing DPA attachments.

## Approvals Workflow
```yaml
workflow: enterprise-offer
steps:
  - name: Legal Review
    approvers: [legal@getrightdata.com]
  - name: Data Steward
    approvers: [stewards@datatrust]
  - name: Exec Sign-off
    approvers: [cdo@getrightdata.com]
```

## Audit
- All consumer actions log to the shared audit trail.
- Export monthly compliance reports as CSV or push to Snowflake.