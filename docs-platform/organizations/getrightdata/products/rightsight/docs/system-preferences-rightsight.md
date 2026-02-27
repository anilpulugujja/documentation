---
title: System Preferences
description: >-
  Configure global platform settings for RightSight: general settings, license,
  integrations, and audit logs. For administrators.
sidebar_label: System Preferences
slug: /getrightdata/rightsight/7.6/rightsight/admin-system-preferences
tags:
  - administration
  - admin-console
  - platform-settings
---
## Summary

System Preferences is where administrators configure global RightSight platform settings that apply to all users and operations. It includes general settings (platform name, timezone, session timeout), **License & Usage**, **Integrations** (email, SSO, API keys), and **Audit Logs**. Use it to tailor the product to your organization and maintain a system-wide audit trail.

**Path in app:** `Administration → Admin Console → System Preferences` (under Platform Settings).

## Prerequisites

- **Admin access** to RightSight (administrator role).
- Supported browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
- Minimum screen resolution 1280×720 (1920×1080 recommended).

## Configuration Steps

### Accessing System Preferences

1. Open the sidebar and go to **Administration**.
2. Click **Admin Console**.
3. Under **Platform Settings**, click **System Preferences** (or **License & Usage**, **Integrations**, or **Audit Logs** to open the same page with the corresponding tab).

### Configuration Sections

The System Preferences page is organized into sections (or tabs). Configure each as needed.

#### General Settings

| Setting | Description |
| --- | --- |
| **Platform Name** | Custom name displayed in the header. |
| **Default Timezone** | System-wide timezone for scheduling and logs. |
| **Date Format** | Preferred date display format. |
| **Session Timeout** | Auto-logout duration for inactive sessions. |

#### License & Usage

View and manage your RightSight license:

- Current license tier and expiration
- Feature availability by license
- Usage statistics

#### Integrations

Configure external system integrations:

- **Email Server (SMTP)**: For notifications and alerts
- **SSO/LDAP**: Single sign-on and directory integration
- **API Keys**: Manage external API integrations

#### Audit Logs

Review the system-wide audit trail:

- User login/logout events
- Configuration changes
- Data access patterns

:::warning

Changes to System Preferences affect all users. Coordinate with stakeholders before making modifications.

:::

[Screenshot: System Preferences Dashboard]

## Validation

- **Platform name**: After saving, confirm the header shows the new platform name.
- **Session timeout**: Log out or leave the session idle for the configured duration and confirm automatic logout.
- **Integrations**: If email or SSO is configured, trigger a test (e.g. send a test notification or attempt SSO login).
- **Audit Logs**: Perform an action (e.g. change a setting) and verify it appears in Audit Logs.

## Troubleshooting

| Symptom | Root Cause | Resolution |
| --- | --- | --- |
| Changes not reflected for users | Cache or session | Ask users to refresh or log out and back in. |
| Cannot access System Preferences | Insufficient role | Ensure your account has administrator role. |
| Audit log missing events | Retention or filter | Check date range and filters; confirm audit is enabled. |

For more issues, see [Troubleshooting](appendices#troubleshooting) in the Appendices.

## Additional Resources

- [Security and Access Management](admin-security-access) – Users and User Groups under Admin Console.
- [Introduction](introduction) – Getting started and navigation overview.
