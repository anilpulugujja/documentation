---
title: AI Enrichment
description: Use AI-led investigations to summarize anomalies and suggest fixes.
sidebar_label: AI Enrichment
tags:
  - rightsight
  - ai
---

AI Enrichment surfaces context-rich narratives for every anomaly.

## Data Sources
- Telemetry (metrics/traces/logs)
- Recent deployments from GitHub/GitLab
- Metadata from DataTrust
- Incident history

## Playbook
1. Enable AI Enrichment in **Settings → AI Assist**.
2. Select which data lakes or observability tools can share metadata.
3. Provide a secure OpenAI or Azure OpenAI key (stored via HashiCorp Vault).

## Output Anatomy
- **Headline**: auto-generated summary.
- **Suspected Drivers**: top correlated KPIs.
- **Recommended Actions**: plain-language steps + links to dashboards or runbooks.

```json
{
  "headline": "Checkout latency rose 34% after deploy 8452",
  "drivers": ["db_write_p95", "redis_hit_rate"],
  "actions": [
    "Roll back services/api@8452",
    "Rebuild Redis cache cluster B"
  ]
}
```
