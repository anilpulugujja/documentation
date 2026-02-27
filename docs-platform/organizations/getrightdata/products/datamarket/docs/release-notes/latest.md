---
title: DataMarket Release Notes
description: Latest marketplace capabilities, fixes, and rollout guidance.
sidebar_label: Latest
tags:
  - datamarket
  - release-notes
---

**Date:** February 18, 2026

### Highlights
- **Usage-Based Billing:** Metered plans now support tiered pricing with rollover credits.
- **Private Listings:** Publish invite-only offers with approval workflows and audit trails.
- **Producer Studio:** One-click templates for Snowflake, BigQuery, and S3 loaders.

### Fixes
- Hardened entitlement sync when downstream warehouses stall.
- Improved filtering on Marketplace Insights for large catalog deployments.

### Upgrade Checklist
1. Update marketplace connectors to `datamarket-agent >= 3.4`.
2. Review new billing plans before enabling usage-based pricing.
3. Audit producer roles to ensure private listings stay restricted.
