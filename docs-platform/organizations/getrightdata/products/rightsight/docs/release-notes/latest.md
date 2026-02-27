---
title: RightSight Release Notes
description: Highlights and fixes in the latest RightSight cloud update.
sidebar_label: Latest
tags:
  - rightsight
  - release-notes
---

**Date:** February 12, 2026

### What's New
- **Adaptive Monitors GA:** Risk scoring now self-tunes based on incident history.
- **Alert Bundles:** Combine related events into one Slack or Teams notification.
- **Admin Console refresh:** Single place to manage regions, SSO, and notification channels.

### Fixes
- Tuned anomaly detector thresholds to reduce false positives by ~18%.
- Improved pagination + filtering performance on the Observability feed.

### Upgrade Checklist
1. Ensure collectors run version `rightsight-agent >= 2.8`.
2. Review alert policies that previously referenced static thresholds.
3. Share the new Admin Console guide with tenant administrators.
