# Payment Result

Use this endpoint to retrieve the authoritative server-side result for an order. See [Payment Lifecycle](/api/payments/payment-lifecycle) for status definitions, deadline behavior, and underpayment handling.

:::warning Final states determine the order outcome
Always base the final merchant action on the latest `data.status` returned by this endpoint:

- `success` is the only successful final state. Verify the returned order fields, then fulfill exactly once.
- `failed` is the only failed final state. Stop accepting payment for the trace, do not fulfill, and inspect `failureCode` and `failureReason`.
- `unpaid`, `confirming`, `paid_less`, `pending`, and `auditing` are intermediate states. Keep the order open and query again. In particular, `pending` does **not** mean that the merchant order has been paid successfully.

Do not finalize an order from an intermediate status, callback event, redirect, local countdown, or `expiredAt` alone. Once the result reaches `success` or `failed`, that terminal outcome cannot be reopened by another payment attempt on the same `traceId`.
:::

## GET /payments_result

Get payment results.

:::warning
For security best practice, you **should not** trust the client side application for getting the payment result. Always make sure to call this API **in your server side**, to make sure the payment result is 100% correct.
:::


## Endpoint URL

```text
https://api.mixpay.me/v1/payments_result
```

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `traceId` | Required if `orderId` is omitted | String | The authoritative order-level payment identifier. |
| `orderId` | Required if `traceId` is omitted | String | Your merchant order identifier. It must contain 6-36 letters, numbers, dashes, or underscores, with no spaces. |
| `payeeId` | Required with `orderId` | String | The account receiving the payment. See [How to get a payeeId](/guides/getting-started#payee-id). |
| `clientId` | Optional | String | Retained for request compatibility. It does not select a separate order result and may be ignored. |
| `with` | Optional | String | Comma-separated related objects. Supported values are `payment` and `transactions`. |

:::info
If you just want to check if the payment is paid or not, Normally, you don't need the `with` parameter, checking the `data.status` is `success` is enough. The `with` parameter only if you need extra info about the payment. 

If you want `transactions` and `payment`, you can pass it like `with=payment,transactions` in the URI.
:::

### Example request

```bash
curl -G https://api.mixpay.me/v1/payments_result \
  --data-urlencode "traceId=8e69e534-d0c4-3e04-8b61-37a73cd9e7d7" \
  --data-urlencode "with=payment,transactions"
```

### Example response

```json
{
    "code": 0,
    "success": true,
    "message": "",
    "data": {
        // `unpaid`, `pending`(processing), `failed`, `auditing` and `success`
        "status": "success",
        "quoteAmount": "0.01",
        "quoteSymbol": "USD",
        // If is USDT, then should be:
        // "quoteAssetId": "a1283b13-d483-4262-90dd-3b1b324a81fb",
        "quoteAssetId": "usd",
        "quoteAssetVersion": "",

        "paymentAmount": "0.010013",
        "paymentSymbol": "USDT",
        "paymentAssetId": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        "paymentAssetVersion": "ERC20",

        "payee": "payee_username",
        "payeeId": "xxxxx-xxx-xxx-xxx-xxxxxxx",
        "payeeMixinNumber": "38xxxxx08",
        "payeeAvatarUrl": "https://mixin-images.zeromesh.net/X_GkLgUq-z7ktU_u5maX99sJKWxxxxxx170k1XcSryAsinVwtPgCRwKRu3nkjHWSEOaKco1G4yDX2E=s256",
        // On-chain transaction ID, only when on-chain payment
        "txid": "",
        "blockExplorerUrl": "",
        "date": 1656513302,
        // when the payer pays more than he/her should 
        // pay, here is the surplus amount
        "surplusAmount": "0",
        // surplus refund status.
        // `no` - no refund needed;
        // `pending` - not refund yet;
        // `sending` - refund is processing;
        // `success` - done refund.
        "surplusStatus": "no",
        // On-chain transfer confirmations count. 
        // Only when `status` is `pending`, `confirmations` will be greater than -1.
        "confirmations": -1,
        // amount should pay
        "payableAmount": "0.010013",
        "payableSymbol": "USDT",
        "payableAssetId": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        "payableAssetVersion": "ERC20",
        // see the "Checking for failure" section
        "failureCode": "0",
        "failureReason": "",
        // If status is `success`, will return `returnTo` when 
        // you create a payment, failed will return `failedReturnTo`'s value.
        "returnTo": "https://www.exmaple.com/show_payment_success?order_id=xxxxx",
        "traceId": "8e69e534-d0c4-3e04-8b61-37a73cd9e7d7",

        // settle status
        // pending - to be settled
        // success - settlement completed
        "settleStatus": "success",
        // when settleStatus is pending, the following fields are empty characters.
        "settleAmount": "0.00003",
        "settleSymbol": "BTC",
        "settleAsset": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "settleAssetVersion": "",

        // if `with=transactions` presented
        "transactions":[
         {
            "paymentAmount":"0.2",
            "paymentAssetId":"25dabac5-056a-48ff-b9f9-f67395dc407c",
            "paymentAssetSymbol":"TRX",
            "paymentAssetVersion":"",
            "requiredConfirms":1,
            "confirmations":10,
            "txid":"7add03d5c2eb1da4b6487d4e80c5968f18c908830d90269f3b35eef72f5ade17",
            "blockExplorerUrl":"https://tronscan.org/#/transaction/7add03d5c2eb1da4b6487d4e80c5968f18c908830d90269f3b35eef72f5ade17",
            "broadcastAt":"2023-06-25T13:47:23.000000Z",
            "confirmSeconds":0
         },
         {
            "paymentAmount":"0.1",
            "paymentAssetId":"25dabac5-056a-48ff-b9f9-f67395dc407c",
            "paymentAssetSymbol":"TRX",
            "paymentAssetVersion":"",
            "requiredConfirms":1,
            "confirmations":5,
            "txid":"f70c8b661a77a616788e5f52f11e412071a25e0bed78342e38825851f5c34f47",
            "blockExplorerUrl":"https://tronscan.org/#/transaction/f70c8b661a77a616788e5f52f11e412071a25e0bed78342e38825851f5c34f47",
            "broadcastAt":"2023-06-25T13:47:50.000000Z",
            "confirmSeconds":0
         }
      ],

      // if `with=payment` presented
      "payment":{
         "isMultiPay":true,
         "isFullyPaid":true,
         "totalTransactionsAmount":"0.3"
      }
        
    },
    "timestampMs": 1656561881048
}
```


## Status handling

The possible statuses are `unpaid`, `confirming`, `paid_less`, `pending`, `auditing`, `success`, and `failed`. Use the terminal state—not an earlier intermediate state—as the final order outcome.

| Status group | Terminal | Required merchant handling |
| --- | --- | --- |
| `unpaid`, `confirming`, `paid_less`, `pending`, `auditing` | No | Record or display progress, keep the order open, and query again. Do not fulfill or finalize failure. For `paid_less`, offer a top-up using the original order and `traceId`. |
| `success` | **Yes—successful** | Verify `traceId`, `payeeId`, `quoteAmount`, and `quoteAssetId`, then fulfill idempotently. |
| `failed` | **Yes—failed** | Stop accepting payment for the trace, do not fulfill, and inspect `failureCode` and `failureReason`. Handle any refund as a separate process. |

Continue querying while the result is non-terminal. Do not infer failure from `expiredAt` alone: a payment recognized in full before the deadline can remain `confirming` after that time while MixPay waits for blockchain confirmations.

## Handling terminal results safely

Never change the final merchant order outcome from browser state, a redirect, an iframe message, or a callback body alone. Query this endpoint from your server and require all of the following:

1. The API response itself has `success === true`.
2. `data.status` is terminal: `success` or `failed`. If it is anything else, keep the order open.
3. `data.traceId` matches the immutable trace stored for the order. If you query with `orderId` and `payeeId`, still bind and verify the returned trace.
4. `data.payeeId` is the intended receiving account.
5. `data.quoteAmount` and `data.quoteAssetId` match the expected order using decimal-safe amount comparison.
6. The corresponding terminal business transition has not already been applied.

Apply the identity checks before recording either terminal outcome. A `failed` result must never reach the fulfillment path, and a `success` result must be fulfilled idempotently.


## Checking for success payment

Besides checking the response `data.status` is equal to `success`, you MUST check the following fileds matching your order:

```bash
payeeId —— Does this payment result belong to you?
quoteAmount —— The amount you want user to pay;
quoteAssetId —— Currency of your choice.
```


Here is the example code in PHP:

```php

// Get the order from your database
$order = Order::findOrFail($orderId);
$result = getMixPayResult($order->id)

if ($payment_result["success"]) {

  // Handle `status` equal to `success`
  if ($payment_result["data"]["status"] == "success") {

    // 1. checking the payeeId is correct
    if ($payment_result["data"]["payeeId"] != $__my_payeeId__) {
      throw new Exception('Wrong payeeId!');
    }

    // 2. checking the payment amount is correct
    if ($payment_result["data"]["quoteAmount"] != $order->amountShouldPay) {
      throw new Exception('Wrong amount!');
    }

    // 3. checking the currency
    if ($payment_result["data"]["quoteAssetId"] != $order->paymentAssetId) {
      throw new Exception('Wrong currency!');
    }

    // ... now is safe to mark your order as paid, an do other logic ...
  }

  // handle other `status` - `unpaid`, `pending`(processing), `failed`
}
```

!!!Important: See [Security Guidelines](/guides/security-guidelines) for the complete checklist.

## Failure codes

`failureCode` is returned as a string. `"0"` means that no specific failure code is available. Non-failed results normally use `"0"`, but a legacy result can also return `status: "failed"` with `failureCode: "0"`.

### Current order-level terminal failure codes

These codes can be returned when a current order reaches the terminal `failed` state:

| Code | Meaning |
| --- | --- |
| `40000` | No valid payment was received before the payment deadline, or a fully recognized payment did not obtain the required confirmations before the server-side confirmation deadline. |
| `40020` | A wrong payment asset was received and the payment cannot be corrected. |
| `40024` | The payment deadline passed while the recognized amount was insufficient. |
| `40025` | The payment could not be completed because market-volatility or settlement-loss checks failed. |
| `40027` | The payment could not be completed because the requested settlement asset was restricted or unavailable under strict settlement requirements. |
| `40032` | The payment was cancelled. |
| `10095` | The payment was rejected during risk, compliance, or manual review. |

### Known legacy and refund-derived compatibility codes

For backward compatibility, historical payment, Snapshot, Memo, and refund records can expose the following additional values through `failureCode`. These values have explicit generation or write paths in the current compatibility code. Some describe why a transfer was rejected or refunded rather than a failure newly generated by the current order-level state machine.

| Code | Meaning |
| --- | --- |
| `10003` | The quote currency is invalid or unavailable. |
| `10034` | A price or exchange calculation failed, or an unrecognized legacy refund exception was normalized to the generic price-error code. |
| `10052` | The settlement currency is unavailable. |
| `10053` | The quote currency is unavailable. |
| `10054` | The payment currency is unavailable. |
| `10056` | The quote currency has been removed. |
| `10057` | The payment currency has been removed. |
| `10067` | The payee is not allowed to accept the requested payment currency. |
| `10068` | The payee is not allowed to use the requested quote currency. |
| `10074` | The payee is unavailable. |
| `10085` | The payment currency or trading pair is temporarily unavailable. |
| `10092` | Strict settlement restrictions prevented the payment from completing. |
| `10094` | The invoice or payment is unsupported under strict settlement requirements. |
| `40021` | A duplicate or additional payment was received. This can describe a refund of the extra transfer; it does not change an already successful order to failed. |
| `40022` | The referenced trace or order did not exist in a legacy Memo payment. |
| `40023` | The payee is missing or invalid in the Memo. |
| `40026` | The transfer was classified as an airdrop or negligible dust amount. |

The current codes `40000`, `40020`, `40024`, `40025`, `40027`, and `40032` can also be exposed by legacy refund records. Their historical meaning can be broader; for example, legacy `40024` can mean a wrong amount or malformed Memo in addition to an underpayment at the deadline.

### Internal and administrative compatibility markers

The following values can be present on old or manually maintained Snapshot records and can technically pass through this endpoint. They are internal refund markers, not additional merchant order states or a stable public contract.

| Code | Meaning |
| --- | --- |
| `40028` | An agent-refund marker normally associated with payment overtime. |
| `10096` | An administrative-review refund marker. The public order result for a review rejection normally uses `10095`. |
| `10097` | A refund was marked manually by an administrator. |

:::caution Failure codes are not a closed enum for legacy data
Historical refund records and raw `RF` Memo values can be passed through without a current-code allowlist. An old or manually maintained record can therefore return a non-zero value that is not listed above. Preserve unknown codes for diagnostics and use the same safe fallback as for any failed result: do not fulfill, and investigate or contact MixPay support.
:::

Always use `data.status` as the order outcome. Only act on a failure code when `data.status === "failed"`; never infer that the original order failed merely because a duplicate or refund transfer has its own reason code. The failure reason is informational and may change, so branch on `failureCode`, not on the English text. A failed result does not by itself mean that a refund has completed.
