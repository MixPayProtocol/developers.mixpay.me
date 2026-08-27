# Payment Lifecycle

Every MixPay order has one authoritative payment result, identified by `traceId`. Query [`GET /payments_result`](/api/payments/payments-results) from your server whenever you need the latest state.

:::warning Authoritative identifier
`traceId` identifies the order-level result. `clientId` identifies a payment channel or attempt and is retained only for request compatibility; it does not select a separate result. Payment attempts using the same `traceId` share one public result and terminal outcome, but their transaction amounts are not unconditionally combined across channels.
:::

Once a trace reaches `success` or `failed`, another payment channel cannot reopen it. A trace-level failure closes any remaining non-terminal payment attempts associated with that trace.

## Payment statuses

| Status | Meaning | Terminal |
| --- | --- | --- |
| `unpaid` | No valid payment transaction has been recognized for the order. | No |
| `confirming` | One or more valid transactions have been recognized, but the transactions supporting the payment have not reached the required blockchain confirmations. The recognized amount may be below, equal to, or above the required amount. | No |
| `paid_less` | A confirmed payment has been recognized, but the total recognized amount is lower than `payableAmount`. The payer may send the remaining amount before the payment deadline. | No |
| `pending` | MixPay has accepted the payment as fully paid, and the supporting transactions have reached the required confirmations. Downstream order processing is still in progress. Do not treat this status as merchant payment success. | No |
| `auditing` | The payment is undergoing risk, compliance, or manual review. | No |
| `success` | The order has completed successfully. | **Yes** |
| `failed` | The order has permanently failed. Inspect `failureCode` and `failureReason`. | **Yes** |

Only `success` and `failed` are terminal. A flow can skip intermediate statuses, and `confirming` and `paid_less` can transition between each other when MixPay detects a top-up transaction that still needs confirmations.

```text
unpaid -> confirming -> pending -> success
             |    ^        |
             v    |        v
          paid_less     auditing -> success

Any non-terminal status can become failed.
```

The diagram shows common transitions, not every possible path. Always use the latest server response instead of deriving a final result from a local timer or confirmation count.

## Payment and quote deadlines

MixPay exposes two related expiration values:

| Field | Meaning |
| --- | --- |
| `expire` | Expiration time of the current quote or payment instruction, returned by payment-information APIs. Refreshing payment information may produce a new instruction. |
| `expiredAt` | Fixed payment deadline of the overall order, returned by `payments_result`. Refreshing a quote or payment instruction does not extend this deadline. |

For `POST /payments`, `expiredTimestamp` is the preferred way to request a custom deadline. The deprecated `expireSeconds` parameter affects the order deadline only when the quote asset and payment asset are the same. These merchant-supplied limits may shorten the configured payment window, but they cannot extend it. Proxy-payment methods, including BTC Lightning, have a maximum payment window of 60 minutes.

A transaction must use the expected payment asset and be recognized by MixPay no later than the payment deadline to count toward the order. At the deadline:

- no recognized valid payment fails with `40000`;
- an insufficient recognized amount fails with `40024`;
- a fully recognized amount may remain `confirming` after `expiredAt` while MixPay waits for the required blockchain confirmations;
- if those confirmations do not arrive before the server-side confirmation deadline, the payment fails with `40000`.

The confirmation deadline is managed by MixPay and is not returned as a public field. Therefore, a countdown reaching zero does not itself mean that the order failed. Continue querying `payments_result` until it returns `success` or `failed`.

## Completing an underpayment

When the result is `paid_less`, keep the original merchant order, `traceId`, and existing `clientId` payment channel. Retrieve the latest payment information, then use the payment asset, destination, and Tag/Memo exactly as returned. Do not reuse cached instructions or create an independent order for the top-up.

Request `with=payment,transactions` when you need to show progress. Use the top-level `paymentAmount` as the authoritative recognized amount: MixPay has already filtered it by asset, deadline, and transaction identity. Do not derive an authoritative amount by summing the raw transaction list.

```text
remainingAmount = max(payableAmount - paymentAmount, 0)
```

Integrations created before `paid_less` was introduced may retain `status === "pending" && payment.isFullyPaid === false` as a compatibility fallback. New integrations should use `paid_less` as the primary underpayment status.

## Result, callback, settlement, and refund

These are separate parts of the lifecycle:

- `payments_result.status` is the authoritative payment result.
- A [payment callback](/api/payments/payment-callback) is a delivery notification. It tells your server to query the result; it is not the result itself.
- `settleStatus` describes settlement after a successful payment. Its values are `pending` and `success`; payment `success` does not guarantee that settlement has already completed.
- A failed payment may require a separate refund process. `failed` does not mean that a refund has completed.

## Backward compatibility

The expanded lifecycle applies to payments created after it was introduced. Historical records that predate it are not backfilled with new terminal statuses or callbacks. Internal Dashboard or Admin processing labels are not additional public payment statuses. Treat an unknown status as not successful, do not fulfill, and investigate or update the integration. Fulfill an order only after your server verifies a documented `success` result and the expected order fields.
