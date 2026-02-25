---
title: DataTrust Installation Paths
description: Deploy collectors and service connectors required to run DataTrust 7.0.
sidebar_label: Installation
tags:
  - datatrust
  - installation
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

DataTrust is SaaS-first; only lightweight collectors run inside your VPC. Choose the model that matches your security posture.

## Managed Cloud Connector (Recommended)
1. From **Settings → Connectors**, click **Generate Connector**.
2. Download the Terraform module scaffold and populate required variables:
   ```hcl
   module "grd_datatrust" {
     source  = "github.com/getrightdata/terraform-datatrust"
     org_id  = "acme-corp"
     region  = "us-east-1"
     sources = ["snowflake", "databricks"]
   }
   ```
3. Apply the plan. The module provisions an event-driven connector that publishes metadata and quality stats back to SaaS.

## Private Network Collector
Use when datasets are air-gapped.

- Deploy the provided container image to Kubernetes or ECS.
- Mount a service account JSON to `/var/secrets/grd.json`.
- Allow outbound HTTPS to `api.getrightdata.com` via your proxy.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grd-collector
spec:
  template:
    spec:
      containers:
        - name: collector
          image: ghcr.io/getrightdata/collector:7.0
          env:
            - name: GRD_ORG
              value: acme
            - name: GRD_REGION
              value: us-east-1
```

:::info Compliance note
Collectors never store data at rest. Only metadata and aggregated metrics leave your VPC.
:::

## Validation
- Run `grdctl diag` to confirm connectivity.
- Check **Observability → Connectors** for heartbeat signals.