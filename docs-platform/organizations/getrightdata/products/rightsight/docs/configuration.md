---
title: Platform Configuration
description: Tune ingestion, retention, and tenant-level preferences for RightSight.
sidebar_label: Configuration
tags:
  - rightsight
  - configuration
---

## Data Ingestion
- Configure agents in **Settings → Ingestion**.
- Upload custom metric schemas or rely on autodiscovery.
- Toggle sampling for high-volume traces to control costs.

## Retention Policies
Set per-data-type retention windows:

| Data Type | Default | Max |
| --- | --- | --- |
| Metrics | 400 days | 730 days |
| Traces | 30 days | 120 days |
| Logs | 14 days | 60 days |

## Single Sign-On
RightSight inherits the org-wide IdP from GetRightData Control Plane. Map groups to roles (Admin, Builder, Viewer).

## API Access
Generate API tokens under **Settings → API Keys**. Tokens are scoped to read-only analytics unless elevated via RBAC.
