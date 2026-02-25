---
title: Metadata Modeling
description: Align physical schemas and business context within DataTrust.
sidebar_label: Metadata
slug: /datatrust/7.0/metadata
tags:
  - datatrust
  - metadata
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

Use the Metadata Studio to enrich raw schemas with business taxonomy.

## Domain Taxonomy
- Define **Domains** (Finance, GTM, Product) and assign stewards.
- Map physical schemas to domains using drag-and-drop or the CLI.

```bash
grdschema attach --domain finance --schema snowflake://corp_finance/payroll
```

## Glossary Terms
1. Navigate to **Metadata → Glossary**.
2. Create entries with definitions, sample usages, and compliance notes.
3. Link glossary terms to columns. DataTrust automatically surfaces lineage graphs.

## Policy-Driven Classifications
Set up automated tagging rules with YAML policies:

```yaml
policy: classify-pii
match:
  column_tags: [email, ssn]
set:
  sensitivity: restricted
  retention: 365d
```

Apply policies via **Automation → Policy Center** to retro-tag existing assets.