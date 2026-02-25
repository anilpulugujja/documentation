---
title: Authentication
description: Authenticate against the GetRightData API for all products.
sidebar_label: Authentication
slug: /api/authentication
tags:
  - api
  - authentication
---

GetRightData APIs support OAuth 2.0 Client Credentials and Personal Access Tokens (PATs).

## OAuth Client Credentials
1. Navigate to **Settings → API Keys**.
2. Create a confidential client and download the client ID/secret.
3. Exchange for a token:

```bash
curl -X POST https://auth.getrightdata.com/oauth/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=CLIENT&client_secret=SECRET&audience=https://api.getrightdata.com'
```

Tokens last 60 minutes. Use the `expires_in` field to refresh before expiry.

## Personal Access Tokens
- Scoped to a user.
- Use for scripting or GitHub Actions.
- Rotate every 90 days and store in a secure secret manager.

## Request Headers
Send API tokens via the `Authorization: Bearer <token>` header. Calls without TLS are rejected.
