---
title: Troubleshooting Checklist
description: Resolve the most common DataTrust onboarding issues.
sidebar_label: Troubleshooting
tags:
  - datatrust
  - troubleshooting
---

## Connector Heartbeat Missing
1. Verify outbound HTTPS to `api.getrightdata.com` on port 443.
2. Run `grdctl status` and confirm the collector token has not expired.
3. Check the **Connector Health** dashboard for throttling messages.

## Scan Fails with Access Denied
- Ensure credentials use read-only roles with metadata grants (Snowflake: `USAGE` + `MONITOR`).
- Validate network rules if databases live in private subnets.

## Policy Deployments Stuck `Pending`
- Policies awaiting approval appear in **Automation → Approvals**.
- Approvers receive Slack mentions; resend via the action menu.

## Support Bundle
Collect diagnostics and share with support:
```bash
grdbundle create \
  --product datatrust \
  --output bundle-$(date +%F).zip
```

:::warning Contact GetRightData
If production data quality drops below the SLA thresholds, open a Priority ticket via support@getrightdata.com and attach the bundle.
:::
