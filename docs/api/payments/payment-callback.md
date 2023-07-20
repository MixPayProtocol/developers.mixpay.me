# Payment Callback

When creating a payment, you can pass a `callbackUrl` parameter to the MixPay API. MixPay will send a POST request to your callbackUrl. After receiving the request, you can request [it](/api/payments/payments-results) to obtain the payment result.


:::warning

If you want to use callback.

Please checkout the [Security Guidelines](/guides/security-guidelines) first!!! 

Especially when you use [payments-results API](/api/payments/payments-results) to check the payment result. 
:::

When creating a payment, you can pass a `callbackUrl` parameter to the API. 

`callbackUrl` only supports HTTPS and has to be [URL encoded](https://www.w3schools.com/tags/ref_urlencode.ASP).

## Callback Content

For example, After a successful payment by the user, MixPay will send the JSON content to your `callbackUrl`, like this:

```json
{
  "orderId": "xxxxxxxxxxxx",
  "traceId": "xxxxxxxxxxxx",
  "payeeId": "xxxxxxxxxxxx"
}
```

:::info
**For security reasons, we're not passing the payment result on purpose. You can follow the instruction below for getting the payment result.**
:::

When your receiving the request, you **MUST** do the following:

- First, make sure the orderId or traceId you received exists in your database. **This step is essential, be careful anyone can post a fake value to your endpoint**;

- Second, make sure your order is waiting for the result.

- Third, call the [payments-results API](/api/payments/payments-results) to query the payment result. **Note that you must follow the [Security Guidelines](/guides/security-guidelines) here.**

  * check for `data.status` field to be `success`;
  * Check the `data.payeeId` is yours;
  * Check the `data.quoteAmount` and `data.quoteAssetId` are both match your order;

:::warning
**Caution**: **Only all of the conditions we mentioned above are passed, then you can update your order.**
:::

- Fourth, return the correct response. This determines whether or not MixPay will request your url again


## Response to the callback

Your endpoint should return an HTTP status 200 with the following JSON data:

```json
{  
  "code": "SUCCESS"
}
```

Anything `code` not equal to `SUCCESS`, MixPay server will see it as a failure, then our server will retry at 0s/15s/15s/30s/180s/1800s/1800s/1800s/1800s/3600s, a total 10 times。

:::info
You can use [postbin](https://www.toptal.com/developers/postbin/) to test it out.
:::

## Callback Event

MixPay will send `success` and `fail` events by default. Other types of events need to be subscribed through callbackEvent. If you need to subscribe to multiple events, you can use | to separate the fields. Just like `settle|pending`. 

| Event| Description|
| --- | --- |
| success | When the user pays successfully. You can get success status in payment result. |
| fail | When the user fails to pay. You can get failed status in payment result. In this case, paymentAmount is not empty, which represents the amount of payment the user has made.|
| settle | When MixPay settlement is completed, You can get settleAmount and other settle info in payment result.|
| pending | When the user has paid, but we must wait for the number of confirmations to reach standard before asserting that the payment is successful.|
| paid_less | When a user underpays, this event will be triggered. By subscribing to this event, you can enhance the success rate of user payments. When a user pays less than required, you can send an email to them, reminding them to pay the remaining balance. |

If you need callback events for more scenarios, you can contact us to discuss development.


## Checking for paid_less

When calling the  [payments-results API](/api/payments/payments-results), with a URL query `with=payment`, will return the `payment` object like the following:

```
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "status": "pending",
    .
    .
    .
    "payment":{
        "isMultiPay":true,
        "isFullyPaid":false,
        ...
    }
  }
}
```

If the following conditions are meet: 

- `data.status` is equal to `pending`;
- and `data.payament.isMultiPay` is equals to `true`;
- and `isFullyPaid` equals `false`.

Then is a user pays less than required, you can perform the specific action, like send a reminder email to inform them to pay the remaining balance.

:::info
If you using [one time payment](/api/payments/one-time-payment), just passing the original payment link for user to pay the remaining amount.
:::