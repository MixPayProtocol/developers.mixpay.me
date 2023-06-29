# Payments Results

MixPay API for getting a payment results.

## GET /payments_result

Get payment results.

:::warning
For security best practice, you **should not** trust the client side application for getting the payment result. Always make sure to call this API **in your server side**, to make sure the payment result is 100% correct.
:::


## Endpoint URL

```bash
https://api.mixpay.me/v1/payments_result
```

## Parameters

|  Param | Optional | Type | Description |
| --- | --- | --- | --- |
| `traceId` | <span class="required">*required</span> if no `orderId` | String | Trace Id of payments. |
| `orderId` | <span class="required">*required</span> if no `traceId` | String | Unique in your system. String lengths **between 6-36** must be letters, numbers, dashes and underscores and NOT space. |
| `payeeId` | <span class="required">*required</span> if has `orderId` | String | Account ID for receiving crypto, pls see [Five types of account](/guides/getting-started#account) and [How to get payeeId](/guides/getting-started#payee-id). |
| `with=payment` | optional | String | Return with the relative payment object. |
| `with=transactions` | optional | String | Return with the relative transaction objects.  |

:::info
If you just want to check if the payment is paid or not, Normally, you don't need the `with` parameter, checking the `data.status` is `success` is enough. The `with` parameter only if you need extra info about the payment. 

If you want `transactions` and `payment`, you can pass it like `with=payment,transactions` in the URI.
:::

## Example request - GET payment results.

```json
curl -i -X GET -G https://api.mixpay.me/v1/payments_result \
-d "traceId"="a0d7791408776b47eb1dd3f94ed15d6a"
```

```json
// title: Response
{
    "code": 0,
    "success": true,
    "message": "",
    "data": {
        // `unpaid`, `pending`(processing), `failed` and `success`
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
        "traceId": "a0d7791408776b47eb1dd3f94ed15d6a",

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

:::info
This response status returns `unpaid`, `pending`(processing), `failed` and `success`.
:::

## Checking for success payment

Besides checking the response `data.status` is equal to `success`, you MUST check the following fileds matching your order:

```bash
payeeId —— Does this payment result belong to you?
quoteAmount —— The amount you want user to pay;
quoteAssetId —— Currency of your choice.
```

Here is the example code in PHP:

```php
// Get the order from database
$order = Order::find($order_id);

// Get the payment result from MixPay `payments_result` API
$payment_result = getMixPayResult($order->id)

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

:::warning
**Security note: You have to check `payeeId`, `quoteAssetId` and `quoteAmount` to make sure a payment is paid successfully. **
:::


> Please checkout the [Security Guidelines](/guides/security-guidelines).

## Checking for failure

You can use the `failureCode` and `failureReason` to check the result, their possible values are:

```json
'40000' => 'Payment overtime',
'40020' => 'Wrong asset paid',
'40021' => 'Double payment',
'40024' => 'Wrong Amount paid',
'40025' => 'Too much market volatility.',
...
```
