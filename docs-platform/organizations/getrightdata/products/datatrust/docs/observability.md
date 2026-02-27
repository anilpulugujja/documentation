---
title: Observability
description: Track scan health, connector uptime, and lineage events.
sidebar_label: Observability
tags:
  - datatrust
  - observability
---

Observability gives a real-time view into scanners, connectors, and event ingestion.

## Dashboards
- **Connector Health**: latency, queued events, last heartbeat.
- **Scan Coverage**: % of schemas profiled, rule pass rate by domain.
- **Lineage Flow**: top upstream/downstream hops.

## Alerts
Configure alerts under **Observability → Alerts**. Example threshold:

```json
{
  "name": "Collector Heartbeat",
  "metric": "collector.last_seen_minutes",
  "operator": ">",
  "value": 5,
  "channels": ["slack://datatrust-ops", "pagerduty://core"]
}
```

## Audit Trail
Every configuration change is recorded. Export via the Admin API:

```bash
curl -H "Authorization: Bearer $GRD_TOKEN" \
  https://api.getrightdata.com/v1/audit?product=datatrust
```
