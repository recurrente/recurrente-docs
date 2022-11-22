---
sidebar_position: 1
---

# Checkouts

Endpoints:

- Create a Checkout

## Create a Checkout

`POST /api/checkouts.json` creates a checkout.

Parameters
- user_id
- items[price_id]
- items[name]
- items[currency]
- items[amount_in_cents]
- items[images]

**Required Parameters**: `items[price_id]` o `items[amount_in_cents]`
