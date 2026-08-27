---
slug: /guides/faq
---

# FAQ

A frequently asked question for using MixPay crypto payment gateway.

## How much do I cost to use MixPay?

There are no setup fees or monthly fees for merchants to integrate the MixPay API.

Merchants settle in cryptocurrency without any fees.

## When payer pays with on-chain payment, is there a network fee for merchants?

Merchants will always get the full amount in the quotes they choose, no matter how payer pays in any wallet or any crypto.

## When my Mixin robot recived money, how can I make sure it's come from MixPay?

You can use your Mixin robot in MixPay to recive money, and you want to use the [Mixin Snapshots](https://developers.mixin.one/docs/api/transfer/snapshots) to comfirm the money has been recived. 

Every time [create a payment in MixPay](/guides/integration-verview#how-to-integrate), you can specified a `traceId`. When reading your robot's [Mixin Snapshots](https://developers.mixin.one/docs/api/transfer/snapshots), there is a `memo` JSON field, base64 decode it, and you will get the original `traceId` you specified, please refer to [About Memo](/api/memo).

## What about refund logic? How can I deal with it?

A payment result and a refund are separate lifecycles. When a payment returns `failed`, use `failureCode` to determine the reason, but do not treat that status as proof that a refund has completed. Depending on the payment method and failure reason, MixPay may refund automatically or require the payer's return address and manual review. For an on-chain late or invalid payment, instruct the payer to [contact customer service](https://help.mixpay.me/en/articles/6836092-how-to-contact-customer-service) and provide the order and transaction identifiers.


## What is Mixin & Mixin Network, and what is the relationship between MixPay and them?

Mixin is a distributed cross-chain solution that provides a secure and efficient way for digital asset transactions. The Mixin Network is the underlying blockchain infrastructure that enables this functionality. MixPay, on the other hand, is a decentralized web3 payment protocol built on the Mixin Network. It leverages the capabilities of the Mixin Network to connect various chains, tokens, wallets, and exchanges, allowing for seamless and secure cross-chain payments.

In general, [Mixin](https://mixin.one/) consists of two-part:

- Mixin Network. A lightning-fast and decentralised network for transferring digital assets.You can see it as a blockchain that handles all the payment transactions.
- Mixin Messenger App. Apart from its real-time messaging feature App, Mixin is also an open-source **cryptocurrency wallet**. 

You can download the  Mixin Messenger App at [Mixin's official website](https://mixin.one/messenger), which currently supports desktop applications, but only the mobile App has the wallet feature. After installed, use your phone number to register an account and set up the wallet's PIN, and you are all set.

## How to find MixPay in Mixin App?

Once you have a Mixin account. Open the Mixin App:

- Step 1. Search for `7000104220`, like the image shown below;
- Step 2. Click "Add bot";
- Step 3. Click the little robot icon to open MixPay.
