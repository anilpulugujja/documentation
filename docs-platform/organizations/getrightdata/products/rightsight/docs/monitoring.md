---
title: Monitoring Streams
description: Build monitors over metrics, traces, and business KPIs from streaming pipelines.
sidebar_label: Monitoring
tags:
  - rightsight
  - monitoring
---

Monitors define what "healthy" looks like for your streaming products.

## Metric Monitors
```json
{
  "name": "Latency P95",
  "query": "latency_p95{pipeline='checkout'}",
  "aggregations": ["p95"],
  "target": 450,
  "window": "5m",
  "sensitivity": "medium"
}
```
- Use adaptive baselines for noisy signals.
- Attach runbooks or Jira automations per monitor.

## Trace Monitors
- Build from OpenTelemetry spans.
- Define service-level objectives (SLOs) for spans or transactions.

## Business KPI Monitors
- Connect pandas-compatible dataframes via the SDK.
- Example:
```python
from grd_monitoring import Monitor
Monitor(
    name="DAU",
    datasource="databricks",
    query="SELECT count(DISTINCT user_id) FROM fact_sessions WHERE date = current_date",
    min=100000,
    max=130000,
).save()
```
