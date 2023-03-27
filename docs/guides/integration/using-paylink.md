---
slug: /guides/using-paylink
---

# Using Paylink

You can use our MixPay payment page to create a MixPay payment. Paylink is the most convenient way of integrating MixPay.

:::warning
IMPORTANT: The paylink example is for new users to understand how the MixPay payment flow. We recommend using [short link](/developers/api/payments/one-time-payment) in the production.

Although this method is more convenient, and you may be more inclined to use this method of splicing parameters, you need to pay attention that when using this method, people can easily in the browser change the parameters you set.

Please checkout the [Security Guidelines](/developers/guides/security-guidelines).
:::

## Start with an example.

Here is an example, click the following button and check it out yourself:


<a href="https://mixpay.me/pay?payeeId=a0d7791408776b47eb1dd3f94ed15d6a&settlementAssetId=c6d0c728-2624-429b-8e0d-d9d19b6592fa&quoteAssetId=4d8c508b-91c5-375b-92b0-ee702ed2dac5&quoteAmount=10&orderId=&returnTo=https%3A%2F%2Fgoogle.com" class="width-300"> 

![](./pay-with-crypto-btn.png)

</a>

For better reference, the "Pay with crypto" button's link is:

```
https://mixpay.me/pay?payeeId=a0d7791408776b47eb1dd3f94ed15d6a
&settlementAssetId=c6d0c728-2624-429b-8e0d-d9d19b6592fa
&quoteAssetId=4d8c508b-91c5-375b-92b0-ee702ed2dac5
&quoteAmount=10
&orderId=your_order_id
&returnTo=https%3A%2F%2Fgoogle.com
```

When customers are on the checkout page, provide a "Pay with Crypto" button (with the above URL): 


1. When customers click the button, jump to our MixPay payment page;
2. On our MixPay payment page, customers pay the crypto coin;
3. We will redirect you to your site after the customer finishes the payment.

## Parameters explain

Below is how to construct the URL parameters, according to the example URL above: 

```bash
payeeId=a0d7791408776b47eb1dd3f94ed15d6a
settlementAssetId=c6d0c728-2624-429b-8e0d-d9d19b6592fa
quoteAssetId=4d8c508b-91c5-375b-92b0-ee702ed2dac5
quoteAmount=10
orderId=your_order_id
returnTo=https%3A%2F%2Fgoogle.com
```


1. `payeeId` is the receiver ID in UUID format. Here is how you can see the UUID  [get-mixin-uuid API](/developers/api/users/get-mixin-uuid);
2. `settlementAssetId` is the specific coin will the payee wan to accept. You can see the supported asset id in [Settlement Assets](/developers/api/assets/settlement-assets) in UUID format.
3. `quoteAssetId` is the cryptocurrency in UUID format, and you can see the supported asset id in [Quote Assets](/developers/api/assets/quote-assets).
4. `quoteAmount` is the total payment amount according to the `quoteAssetId`.
5. `orderId`   -   Unique in your system. String lengths **between 6 and 36 must be letters, numbers, dashes, underscores, and NO space. `orderId` and `payeeId` make a payment unique. 
6. `returnTo` when the payment is finished, the customer will be redirected to this URL. Generally will be the order detail page.



There are several parameters here, used to specify the default behavior of the Checkout Page.

7. `paymentAssetId` is used to specify the coin that the user wants to pay with, and you can see the supported asset id in [Payment Assets](/developers/api/assets/payment-assets) in UUID format.
8. `paymentMethod` is used to specify the payment type, which can be `crypto`, `mixpayplus`, or `binance`.
9. `style` The page is divided into PC template, Mobile universal template, and Mobile wallet template. Setting `style=mobile` can force the mobile side to use the universal template.

- PC template

<div class="image-shadow">

![PC template](./pc-template.png#pic-center)

</div>

- Mobile universal template

<div class="text-center width-300 image-shadow">

![Mobile universal template](./mobile-universal-template.png)

</div>

- Mobile wallet Template

<div class="text-center width-300 image-shadow">

![Mobile wallet template](./mobile-wallet-template.png#pic-center)

</div>


## Getting the result

At this point, customers are paying crypto using our Paylink; how can you get the paying results?

You can use the [Payment Callback](/developers/api/payments/payment-callback) to get the feedback.
