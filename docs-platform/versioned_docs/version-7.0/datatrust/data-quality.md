---
title: Data Quality Policies
description: Author, deploy, and monitor automated tests inside DataTrust.
sidebar_label: Data Quality
slug: /datatrust/7.0/data-quality
tags:
  - datatrust
  - quality
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

DataTrust ships with 40+ prebuilt quality rules plus a DSL for custom checks.

## Author Policies
- Go to **Quality → Policies** and click **New Policy**.
- Choose a template (Freshness, Volume, Validity) or start from YAML.

```yaml
policy: sales_freshness
schedule: "0 */2 * * *"
checks:
  - type: freshness
    dataset: snowflake://sales/orders
    max_delay_minutes: 60
  - type: threshold
    metric: daily_order_count
    operator: ">="
    value: 500
notifications:
  channels: [pagerduty, slack]
```

## Deploy Policies
1. Select the environments (Dev, QA, Prod).
2. Attach remediation playbooks (ServiceNow ticket automation supported).
3. Click **Deploy** to publish.

## Monitor Results
- **Observability → Quality Runs** surfaces rolling success rates.
- Drill into failures to view sample queries, owner, and suggested fixes.
- Export JSON outcomes via `GET /v1/datatrust/policies/{policyId}/runs`.