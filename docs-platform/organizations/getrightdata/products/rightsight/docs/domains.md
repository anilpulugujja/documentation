---
title: Domains
description: >-
  Organize data assets and business terms by business domain (e.g. Customer,
  Finance). Create, edit, and manage domains in RightSight.
sidebar_label: Domains
slug: /getrightdata/rightsight/latest/domains
tags:
  - rightsight
  - business-semantics
  - domains
  - governance
---
## Summary

Domains are the top-level categories for organizing data assets and business terms in RightSight. Use them for areas like Customer, Finance, Product, Marketing, Operations, and Risk & Compliance. Each domain can have an icon, description, owner, steward, and tags. Create domains first, then assign data assets and business terms to them.

**Path in app:** `RightSight → Business Semantics → Domains`.

## Prerequisites

- Access to RightSight with permission to manage Business Semantics (e.g. Data Steward or Admin).
- Domain names and short descriptions agreed with stakeholders.

## Configuration Steps

### Understanding Domains

Domains represent business or functional areas. Typical examples:

- Customer, Finance, Product, Marketing, Operations, Risk & Compliance

### Creating a Domain

1. Click **+ Add Domain** (top-right).
2. In the **New Domain** drawer, fill in:

| Field | Description | Required |
| --- | --- | --- |
| **Domain Name** | Unique name | Yes |
| **Description** | Scope of the domain | Yes |
| **Icon** | Icon picker | No |
| **Owner** | Owner email(s) | Recommended |
| **Steward** | Data steward email(s) | Recommended |
| **Tags** | Searchable tags | No |

3. Click **Create Domain**.

### Editing a Domain

1. Find the domain in the list or card view.
2. Click the **Edit** icon (pencil) or **⋮ → Edit**.
3. Update fields in the drawer and click **Save Changes**.

### Domain Card View

Each domain card shows:

- Icon and name
- Truncated description
- Count of associated data assets
- Owner and steward
- Edit and Delete actions

### Deleting a Domain

1. Click **Delete** on the domain.
2. Confirm in the dialog.

:::warning

Deleting a domain can orphan business terms and data assets. Reassign those to another domain before deleting.

:::

![Domain Management Page](/img/rightsight/rightsight-domains.png)

## Validation

- Create a test domain and confirm it appears in the list/cards.
- Assign a data asset or business term to the domain and confirm the count updates.
- Edit and save; confirm changes persist.

## Troubleshooting

| Symptom | Root Cause | Resolution |
| --- | --- | --- |
| Cannot delete domain | Associated items | Reassign terms and assets to another domain first. |
| Domain not in dropdown | Cache or filters | Refresh the page; check you are in the right context. |

## Additional Resources

- [Data Assets](rightsight-data-assets) – Group objects into assets and assign a domain.
- [Business Terms](rightsight-business-terms) – Define terms and assign them to domains.
