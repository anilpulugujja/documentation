---
title: SDK Examples
description: Quick starts for Python and TypeScript clients.
sidebar_label: SDK Examples
slug: /api/sdk-examples
tags:
  - api
  - sdk
---

:::warning Archived Content
You are viewing GetRightData 7.0 docs. Some UI labels may differ from newer versions.
:::

## Python
```python
from getrightdata import DataTrust

client = DataTrust(api_key="${GRD_TOKEN}")

for domain in client.domains.list():
    print(domain.name, domain.health_score)
```

## TypeScript
```ts
import { RightSight } from '@getrightdata/sdk';

const client = new RightSight({ token: process.env.GRD_TOKEN });
const monitors = await client.monitors.list({ tag: 'checkout' });
console.table(monitors.map((m) => ({ name: m.name, status: m.status })));
```

Install packages via `npm install @getrightdata/sdk` or `pip install getrightdata`.