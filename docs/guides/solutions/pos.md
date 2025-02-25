# Point-of-Sale (PoS)


Only three steps to integrate MixPay into the Point-of-Sale (PoS) system.

## Introduction

Before you get started, all you need to know is that it takes only three steps to integrate MixPay into the Point-of-Sale (PoS) system. They are as follows.

1.  Create the payment link.
2.  Convert the payment link to a QR code.
3.  Users scan the QR code to pay, and the Point-of-Sale (PoS) system looks to query the payment results.


## For Point-of-Sale (PoS) developers

Before we begin, please be aware that the cryptocurrency paid by the user through MixPay's API will be settled directly into your Mixin wallet.

Mixin bot and MixPay user (ID of MixPay user is equal to Mixin ID) both have the same parameter, called **UUID**. This UUID is very important and determines the destination of the money received. So this UUID needs to be configurable. The assets in your Mixin bot are programmable, and the assets in MixPay you can withdraw and manage easily.

Next, we start with a detailed guide.

### Step 1 - Create the payment link

1. There is no need to register with MixPay to use the MixPay API. You can simply access the MixPay API using your preferred programming language. For more information on the MixPay API, click  [here](/api/overview).
2. Additionally, you can use this bot (7000101422) to obtain your Mixin UUID by sending your Mixin ID in the chat window to the bot. This method is simple and requires no programming. Alternatively, you can obtain the UUID via this [API](https://developers.mixin.one/docs/api/users/search), and find a tutorial [here](https://developers.mixin.one/docs/dapp/getting-started/create-dapp).
3. Obtain the ID of the cryptocurrency you need. This asset type will be used for settlement and quotes. For more information about supported assets, click [here](/guides/assets).
4. To integrate with MixPay, use this [API](/api/payments/pay). The specific parameters are listed below. Convert the URL to a QR code for customers to scan and pay easily.

Additionally, you can generate the `traceId` randomly. For example, if you are using Golang, the sample code is as follows.

```go
package main

import (
    "fmt"
    "github.com/google/uuid"
)

func main() {
    id := uuid.New()
    fmt.Println(id.String())
}
```

Assuming the `traceId` is dd9c3e04-a5d2-11ec-b909-0242ac120002, which is generated by the sample code, the complete sample request and parameters are provided below.

### Example request - Accepting Payments

You can copy the link and open it in a browser:

```
https://mixpay.me/pay?payeeId=8e69e534-d0c4-3e04-8b61-37a73cd9e7d7&settlementAssetId=c6d0c728-2624-429b-8e0d-d9d19b6592fa&quoteAssetId=usd&traceId=dd9c3e04-a5d2-11ec-b909-0242ac120002&remark=xxxxxx
```

### Parameters

|  Param | Optional | Type | Description |
| --- | --- | --- | --- |
| `payeeId` | <span class="required">*required</span> | String | Three settlement modes are supported, regular user, robot, and multisig group, so it is usually the Mixin UUID of a regular user or robot. You can also specify the multisigId of a sub-account. |
| `settlementAssetId` | optional |  String | assetId of settlement cryptocurrency. Settlement assets you prefer. If left blank, the payee will receive the cryptocurrency the user pays for. For more options, see [here](/api/assets/settlement-assets). |
| `quoteAssetId` | optional |  String | assetId of quote cryptocurrency. For more options, see [here](/api/assets/quote-assets).|
| `quoteAmount` | optional |  Numeric | Amount of cryptocurrency received, if left blank, the user can enter manually. |
| `remark` | optional |  String | Payment remark viewable by the payee. |
| `traceId` | optional |  String | UUID, used to prevent double payment. |

### Step 2 - Covert the payment link to a QR code

Then you can covert the payment link generated by the above step to a QR code. Maybe you can use some library depending on your program language.

### Step 3 - Look query the payment results

Then you can use this [API](/api/payments/payments-results) to loop query payments result; the parameter is the `traceId` you generated. And the response is the `status` of payment. The `status` has three parameters, unpaid, failed and success.

## For Point-of-Sale (PoS) customers

1.  Register Mixin Messenger and add MixPay(**[7000104220](https://mixin.one/codes/e836b0e7-96a7-4fc9-a79f-1f795ca4d6fa)**) bot.
2.  Provide your **Mixin ID** and **settlement asset** to Point-of-Sale (PoS) developers.
3.  Manage assets conveniently in the MixPay bot, like withdrawing.
4.  You can also check the transaction details and balance and review the flow at the MixPay bot.

## Q & A

You can contact Robin(Mixin ID: 26930) directly if you have any further questions.
