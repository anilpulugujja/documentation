---
title: Administration
description: Manage access, notifications, and integrations for DataTrust.
sidebar_label: Administration
tags:
  - datatrust
  - administration
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

## Roles
| Role | Scope | Typical Owner |
| --- | --- | --- |
| Admin | Full product control, billing, integrations | Platform engineering |
| Steward | Domain-level access, policy authoring | Data stewards |
| Viewer | Read-only dashboards | Business stakeholders |

Assign roles via **Administration → Access Control**. SCIM provisioning is supported for Okta and Azure AD.

## Notifications
- Connect Slack, Teams, PagerDuty, and email from **Administration → Channels**.
- Map quality or governance notifications to channel presets (e.g., `trust-critical`).

## Integrations
Enable outbound integrations for Data Catalogs, ServiceNow, or GRC tools via webhooks (see [Webhooks](/api/webhooks)).

```bash
curl -X POST https://api.getrightdata.com/v1/integrations \
  -H "Authorization: Bearer $GRD_TOKEN" \
  -d '{"type": "servicenow", "instance": "https://acme.service-now.com"}'
```