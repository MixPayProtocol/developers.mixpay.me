# Change Log

## 2026-08-13

The following changes apply to payments created on or after this release.

### Payment result status comparison

| Area | Before this release | Current behavior |
| --- | --- | --- |
| Public status set | `unpaid`, `pending`, `failed`, `auditing`, and `success`; `pending` was described generically as processing. | `unpaid`, `confirming`, `paid_less`, `pending`, `auditing`, `success`, and `failed`. Only `success` and `failed` are terminal. |
| Awaiting confirmations | Confirmation waiting was represented by `pending`. | `confirming` is the dedicated non-terminal status for recognized transactions that have not reached the required blockchain confirmations. |
| Underpayment | `paid_less` was not a `payments_result.status`. Underpayment was detected through `status === "pending"` and `payment.isFullyPaid === false`. | `paid_less` explicitly represents a confirmed recognized amount below `payableAmount`. The payer may top up the original order and `traceId` before the payment deadline. |
| `pending` semantics | `pending` covered general processing, confirmation waiting, and the documented underpayment compatibility condition. | `pending` means MixPay has accepted the payment as fully paid and the supporting transactions have reached the required confirmations, while downstream processing is still in progress. It is not merchant payment success. |
| Completion handling | Integrations were required to wait for `success`, but terminality was not defined for the complete public status set. | Only `success` and `failed` are terminal. Keep every other status open and continue querying the authoritative result. |

### Payment callback comparison

| Area | Before this release | Current behavior |
| --- | --- | --- |
| Events and subscriptions | `success` and `fail` were automatic. `settle`, `pending`, and `paid_less` were optional subscriptions. `pending` meant that payment was waiting for confirmations. | The event set and subscription model remain the same. `pending` is emitted for both `confirming` and `pending` results; `paid_less` identifies confirmed underpayment; `settle` describes settlement rather than payment result. There are no dedicated `confirming` or `auditing` callback events. |
| Request body | The documented body contained only `orderId`, `traceId`, and `payeeId`, and intentionally omitted the payment result. | Production bodies continue to contain only those identifiers. Non-production bodies additionally include `callbackEvent`. Production handlers must not require that field and must query `GET /payments_result` for the authoritative result. |
| Acknowledgement | The endpoint had to return HTTP `200` with JSON `{"code":"SUCCESS"}`; any other `code` was treated as failure. | The acknowledgement remains HTTP `200` with the exact JSON code. An HTTP 2xx response alone is insufficient. The request timeout is 20 seconds. |
| Attempts and schedule | The documentation stated 10 attempts at `0s, 15s, 15s, 30s, 180s, 1800s, 1800s, 1800s, 1800s, 3600s`. | MixPay makes up to 9 HTTP attempts in total, including the first. After failures, retries are scheduled after approximately `15s, 15s, 30s, 180s, 1800s, 1800s, 1800s, 1800s`. |
| Delivery and merchant handling | The handler was told to verify the order, query the result, validate the returned fields, and then acknowledge. Duplicate delivery and exhausted attempts were not explicitly documented. | Delivery is retry-based, not exactly-once. Handlers must tolerate duplicates, delays, advanced intermediate results, and exhausted attempts. Business transitions must be idempotent, and important orders should retain polling or reconciliation. |

- Expanded `payments_result.status` to `unpaid`, `confirming`, `paid_less`, `pending`, `auditing`, `success`, and `failed`. Only `success` and `failed` are terminal.
- Made `traceId` the authoritative order-level result identifier. `clientId` remains accepted for compatibility but does not select a separate result.
- Added explicit underpayment handling through `paid_less`, including top-ups on the original order and trace.
- Separated the payment deadline (`expiredAt`) from the current quote or instruction expiry (`expire`). A fully recognized on-chain payment can remain `confirming` after `expiredAt` while awaiting confirmations.
- Added terminal failure reasons for underpayment (`40024`), cancellation (`40032`), and review rejection (`10095`), and clarified the two uses of timeout code `40000`.
- Revised callback delivery to use up to 9 HTTP attempts, including the first; clarified duplicate-delivery handling and made explicit that HTTP 2xx without `{"code":"SUCCESS"}` is not accepted.
- Clarified `paid_less` callback handling and mapped both `confirming` and `pending` to the `pending` callback event. Production callback bodies continue to contain identifiers only; non-production environments also include `callbackEvent`.
- Added a 60-minute maximum payment window for proxy-payment methods, including BTC Lightning. For direct `POST /payments` creation, the deprecated `expireSeconds` and preferred `expiredTimestamp` can shorten but cannot extend the effective order deadline; One-Time Payment code expiry follows its separately documented rules.
- Documented the existing One-Time Payment `data.info` response and idempotent code creation behavior.
- Added an order-level `failed` result with `failureCode` `40000` for a temporary code with `callbackUrl` that expires before a payment channel is created, and schedules the corresponding `fail` callback.

Historical results are not backfilled with the expanded status lifecycle, and historical callbacks are not replayed.

## 2025-08-04

- Deprecated the Raw API. Use [One-Time Payment](/api/payments/one-time-payment) instead.

## 2023-04-28

- Added [Callback Events](/api/payments/payment-callback#callback-events).

## 2023-02-24

- Removed `isTemp` from `POST /one_time_payment`. This endpoint always creates a single-use link.
