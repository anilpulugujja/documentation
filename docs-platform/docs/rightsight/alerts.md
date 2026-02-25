---
title: Alerting & Routing
description: Send actionable notifications when monitors detect anomalies.
sidebar_label: Alerts
tags:
  - rightsight
  - alerts
---

RightSight alerts route through Slack, PagerDuty, Microsoft Teams, webhooks, or email.

## Alert Policies
1. Navigate to **Alerts → Policies**.
2. Choose the monitors you want to include.
3. Set severity mapping and deduplication windows (default 10 minutes).

```yaml
policy: checkout-latency
severities:
  critical:
    - monitor: latency-p95
      threshold: 650
  warning:
    - monitor: latency-p95
      threshold: 500
routes:
  - channel: pagerduty://oncall
  - channel: slack://#checkout-ops
```

## Escalations
- Define multi-step escalations with wait timers.
- Pause alerts during maintenance windows with the **Quiet Hours** schedule.

## Post-Incident Automation
Trigger retrospectives by connecting to Notion or Confluence using outgoing webhooks.
