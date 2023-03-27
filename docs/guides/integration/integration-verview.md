---
slug: /guides/integration-verview
---


# Integration Overview

Overview of all the integration methods that MixPay provided.

## MixPay Payment flow

To get started, let's have a bird's eyes view of the MixPay Payment flow: 

1.  The customer confirms the order details.
2.  The merchant creates orders and asks customers to pay (The checkout page).
3.  MixPay is waiting for payment.
4.  The merchant queries payment results and shows the result to the customer.

![](./qmhxunt.png)

## Where does the money go?

When you receive the customer's payment, all the crypto assets will go into your Mixin Wallet.

Through the API of MixPay, the crypto paid by the user is **settled directly to your Mixin bot、your Multi-Signature account or your Mixin Wallet.**

## Where to view all the transactions?

Open the MixPay App in the Mixin App, click the "Payment History" entry like below:

![](./payment-history-entry.png)

## Three types of assets

- [Payment Assets](/developers/api/assets/payment-assets) - Used when you create a payment;
- [Quote Assets](/developers/api/assets/quote-assets) - When you calculate the total payment amount and show it to the customers.
- [Settlement Assets](/developers/api/assets/settlement-assets) - Used when you are setting the payee settlement assets;

## Three types of account

MixPay supports three types of accounts: 

- User account - Normal Mixin & MixPay user, the account you created using mobile phone numbers. The ID of the MixPay user is equal to the Mixin ID.
- Multi-Signature account -  This is suitable for if multiple people own your store. Please refer to those articles:
  - [How to create a multi-signature account?](https://www.youtube.com/watch?v=TYkM_Uo1Zgs&ab_channel=MixPayProtocol)
  - [How to use multi-signature groups and withdrawals?](https://www.youtube.com/watch?v=tnPKGEglBSE&list=PLPd8WskPRWcx3lRmQfBxpFL021unFo7nN&index=8&ab_channel=MixPayProtocol)

- Mixin Robot account - [Mixin's Messenger Bot](https://developers.mixin.one/docs/dapp/mixin-applications#messenger-bot) it's programmable, thus, is more flexible; this is for more advanced users.

If you don't know how to choose, you can go with the "User account", or [contact our customer service](/developers/guides/contact-customer-service).

## Payee ID

`payeeId` is the account's UUID.

This UUID is very important and **determines the destination of the money received.** 

There are two ways of getting the payee's UUID: 

- You can use this bot (7000101422) to get the Mixin User/Robot UUID, send the Mixin ID in the chat window to the bot, and it will reply with the corresponding UUID. It's simple, and no programming is required.

- Also, if the user UUID you want to acquire is a MixPay user, you can quickly get this UUID via [Get Mixin UUID API](/developers/api/users/get-mixin-uuid).


## How to integrate? 

There are several ways you can integrate MixPay to accept crypto payments:

1. [Paylink](/developers/guides/using-paylink) -  MixPay hosted web page; all user interaction happened on this page; you can use it as a "Pay with Crypto" button.
2. [JS Plugin](/developers/guides/shopify-plugin) -  Like Paylink to handle all user payment close interaction, but on your web page, you can have more control over it.
3. [Raw API call](/developers/guides/using-raw-api) - Above to method are in the browser; if you are in the circumstance that can't use the browser, maybe this is your choice.
4. [Shopify Plugin](/developers/guides/shopify-plugin).
5. [WordPress WooCommerce Plugin](/developers/guides/woocommerce-plugin).

Here is just a brief of the integration method available; for more detailed instructions, please visit the doc entry at the left menu.

