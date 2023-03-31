# Account

At present, MixPay offers five methods to create an account. You can register an account on [MixPay's Dashboard](https://dashboard.mixpay.me/) at any time.

- Mixin account - Register a Mixin account using your phone number, and then log in by scanning the QR code. Suitable for personal receiving payments.
- MetaMask Acount - Log in using MetaMask wallet authorization. Suitable for personal receiving payments.
- Email Account - Register and log in using email verification code. Suitable for corporate users, with permission functions under development...
- Multi-Signature account -  This is suitable for if multiple people own your store. Please refer to those articles:
  - [How to create a multi-signature account?](https://www.youtube.com/watch?v=TYkM_Uo1Zgs&ab_channel=MixPayProtocol)
  - [How to use multi-signature groups and withdrawals?](https://www.youtube.com/watch?v=tnPKGEglBSE&list=PLPd8WskPRWcx3lRmQfBxpFL021unFo7nN&index=8&ab_channel=MixPayProtocol)
- Mixin Robot account - [Mixin's Messenger Bot](https://developers.mixin.one/docs/dapp/mixin-applications#messenger-bot) it's programmable. More suitable for businesses with higher customization requirements.

If you don't know how to choose, you can go with the "User account", or [contact our customer service](/guides/contact-customer-service).

## Payee ID

`payeeId` is the account's UUID. This UUID is very important and **determines the destination of the money received.** 

There are three ways of getting the payee's UUID: 

* After logging into the [Dashboard]((https://dashboard.mixpay.me/)), you can find the UUID in the [settings](https://dashboard.mixpay.me/settings).

- You can use this bot (7000101422) to get the Mixin User/Robot UUID, send the Mixin ID in the chat window to the bot, and it will reply with the corresponding UUID. It's simple, and no programming is required.

- Also, if the user UUID you want to acquire is a MixPay user, you can quickly get this UUID via [Get Mixin UUID API](/api/users/get-mixin-uuid).