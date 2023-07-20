# Refresh Payment

In MixPay Checkout Page, in order to ensure the calculated payment amount is correct, <b>an on-chain payment has to refresh every ten minutes</b>.

If you [Using Raw API](/guides/using-raw-api) to collect payment, you need to manually refresh the payment, for getting the most updated payment amount.

## POST /payments/refresh

Refresh a on-chain payment.

:::warning
If you are using the MixPay Checkout Page, payment refresh are already handled, and you don't need to use this API. This API is for [Using Raw API](/guides/using-raw-api) only.
:::

## Endpoint URL

```bash
https://api.mixpay.me/v1/payments/refresh
```

### Authentication and options

|  |  |
| -- | -- |
| Authorization | Public Access |
| Limitation | No limitation |


### Parameters

|  Param | Optional | Type | Description |
| --- | --- | --- | --- |
| `traceId` | <span class="required">*required</span> | String | UUID, varchar(36), used to prevent double payment. If you are using [one time payment](/api/payments/one-time-payment) API, it's the `data.code` filed |
| `clientId` | optional  | String | UUID of client of the payment. |


### Return 

It will return the same object as [on-chain payment API](/api/payments/onchain-payments).