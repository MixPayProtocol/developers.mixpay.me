# Security Guidelines

This guide will show you the security must do and best practice when using MixPay.


## 0. MixPay callback server IP whitelist

In your callback endpoint. Please **only** allow MixPay callback server to call your callback API:

> MixPay callback server IP: 52.198.117.57

## 1. MUST: Always verify the quote amount and the payeeId and the quoteAssetId

**Never just rely on the [payments-results API](/api/payments/payments-results)'s return `data.status` = `success` to mark an order is successfully paid.**

Because when you construct the following link:

```shell
https://mixpay.me/pay?payeeId=axxxxxx
&quoteAssetId=usd
&quoteAmount=1000
&orderId=your_order_id
....
```

When the user using the browser jumps to the MixPay Checkout Page to pay, because the URL is visible to everyone to see, and can be modified in the browser, the malicious user will modify these parameters, as follows:

```shell
https://mixpay.me/pay?payeeId=axxxxxx
&quoteAssetId=usd
&quoteAmount=0.01
&orderId=your_order_id
....
```


At this point, if the user successfully paid 0.001 dollars, for MixPay, this `orderId` corresponding order is paid successfully. 

If your server only verify the `data.status` = `success` from the [payments-results API](/api/payments/payments-results), the user will purchased your product at 0.01 dollars.


The right way to do is - when your callback endpoint receives a call, you MUST do the following checks:

- First, in your database, look for the incoming `orderId` or `traceId` value. **This step is essential, be careful anyone can post a fake value to your endpoint**;
- Call the [payments-results API](/api/payments/payments-results), and check for `data.status` field to be `success`;
- Check the `data.payeeId` is yours;
- Check the `data.quoteAmount` and `data.quoteAssetId` are both match your order;

**Caution**: **Only all of the conditions we mentioned above are passed, then you can mark your order as completed.**

Here is the example in PHP:

```php

// Checking the request IP is come from MixPay callback server
if ($_SERVER['REMOTE_ADDR'] !== '52.198.117.57') {
    throw new Exception('forbidden');
}

// Get the order from database
$order = Order::find($order_id);

// Get the payment result from MixPay `payments_result` API
$payment_result = getMixPayResult($order->id)

if ($payment_result["success"]) {

  // Handle `status` equal to `success`
  if ($payment_result["data"]["status"] == "success") {

    // 1. verify the payeeId is correct
    if ($payment_result["data"]["payeeId"] != $__my_payeeId__) {
      throw new Exception('Wrong payeeId!');
    }

    // 2. verify the payment amount is correct
    if ($payment_result["data"]["quoteAmount"] != $order->amountShouldPay) {
      throw new Exception('Wrong amount!');
    }

    // 3. verify the currency
    if ($payment_result["data"]["quoteAssetId"] != $order->paymentAssetId) {
      throw new Exception('Wrong currency!');
    }

    // ... now is safe to mark your order as paid, or do other logic ...
  }

  // handle other `status` - `unpaid`, `pending`(processing), `failed`
}
```

##  2. Strongly recommended: Always one time payment for production


As we mentioned above, malicious users can easily modify the parameters in the URL, and using [one time payment](/api/payments/one-time-payment) can eliminate the possibility of users passing parameters.

The rules for short link are as follows:

- Once the short URL is created, the parameters cannot be modified;
- Once the merchant's orderId is used to create a short link, it cannot be paid by [using paylink](/guides/using-paylink).


## 3. Best practice: Watching the Mixin snapshot for income

> This method is for more advanced user. And the payeeId has to be a Mixin robot (see [Three types of account](/guides/integration-verview#three-types-of-account)). 

You can using the Mixin API [GET /snapshots](https://developers.mixin.one/docs/api/transfer/snapshots) for monitoring the crypto coming into your robot's wallet. 

Only when the money is really received, then the order can be mark as paid.


