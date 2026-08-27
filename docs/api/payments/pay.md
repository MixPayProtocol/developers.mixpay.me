# Using Paylink - only for testing

MixPay payment link page for quickly accepting crypto payments.

:::warning
IMPORTANT: The paylink example is for new users to understand how the MixPay payment flow. We recommend using [one time payment](/api/payments/one-time-payment) in the production.

Although this method is more convenient, and you may be more inclined to use this method of splicing parameters, you need to pay attention that when using this method, people can easily in the browser change the parameters you set.

Always using [one time payment](/api/payments/one-time-payment) for production.

Please checkout the [Security Guidelines](/guides/security-guidelines).
:::


## GET /pay

This payment method is easy to set up and is suitable for scenarios that require repeated use.

### Endpoint URL

```
https://mixpay.me/pay
```

### Authentication and options

|  |  |
| -- | -- |
| Authorization | Public Access |
| Limitation | No limitation |

### Parameters

|  Param | Optional | Type | Description |
| --- | --- | --- | --- |
| `payeeId` | <span class="required">*required</span> | String | Account ID for receiving crypto, pls see [Five types of account](/guides/getting-started#account) and [How to get payeeId](/guides/getting-started#payee-id). |
| `orderId` | optional | String | Merchant order identifier, unique in your system. It must contain 6-36 letters, numbers, dashes, or underscores, with no spaces. |
| `traceId` | optional | String | UUID that identifies the order-level payment lifecycle, prevents duplicate payment, and is used to query Payment Result. Do not reuse a terminal `traceId`. |
| `settlementAssetId` | optional | String | `assetId` of settlement cryptocurrency. Settlement assets you prefer. If left blank, the payee will receive the cryptocurrency the user pays for. But you need to pay attention to the `strictMode` field.For more options, see [here](/api/assets/settlement-assets). |
| `strictMode` | optional | Integer | You can set `0` or `1`. Default `0`. `1` means that the payment must be settled strictly according to the currency set by settlementAssetId. See [here](/api/strict-mode) for more details.|
| `quoteAssetId` | optional | String | `assetId` of quote cryptocurrency. You can see the supported asset id in [Quote Assets](/api/assets/quote-assets).|
| `quoteAmount` | optional | Numeric | Amount of cryptocurrency received, if left blank, the user can enter manually. |
| `remark` | optional | String |  maximum 50. Payment remark viewable by the payer. |
| `settlementMemo` | optional | String | maximum 200. A memo is similar to Mixin Snapshots, this parameter you can customise. |
| `returnTo` | optional | String | After successful payment, the page will jump to `returnTo` URL. |
| `failedReturnTo` | optional | String | After payment failure, the page will jump to `failedReturnTo` URL. |
| `callbackUrl` | optional | String | HTTPS endpoint that receives lifecycle notifications. Treat each callback as a signal and query Payment Result for the authoritative state. |
| `expiredTimestamp` | optional | Integer | Unix timestamp that caps the payment deadline. The effective deadline is the earliest applicable MixPay, merchant, or payment-method limit. Omitting it does not make the order valid indefinitely. |


### Example request - Get Payment Link

You can copy the link and open it in a browser:

```bash
https://mixpay.me/pay?payeeId=8e69e534-d0c4-3e04-8b61-37a73cd9e7d7&settlementAssetId=c6d0c728-2624-429b-8e0d-d9d19b6592fa&quoteAssetId=usd&quoteAmount=10
```

:::info
We recommend [one time payment](/api/payments/one-time-payment) if you want to use so many parameters.

Although this method is more convenient, and you may be more inclined to use this method of splicing parameters, you need to pay attention that when using this method, people can easily in the browser change the parameters you set.
:::
