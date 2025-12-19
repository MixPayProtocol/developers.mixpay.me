module.exports = {
  docs: [
    "guides/introduction",
    "guides/getting-started",
    "guides/security-guidelines",
    {
      type: 'category',
      label: 'Integration',
      collapsed: false,
      items: [
        'guides/integration/using-paylink',
        'guides/integration/shopify-plugin',
        'guides/integration/woocommerce-plugin',
      ],
    },
    {
      type: 'category',
      label: 'Supported Assets',
      collapsed: false,
      items: [
        'guides/assets/assets',
        'guides/assets/payment-assets',
        'guides/assets/quote-assets',
        'guides/assets/settlement-assets',
      ],
    },
    {
      type: 'category',
      label: 'Solutions',
      collapsed: false,
      items: [
        'guides/solutions/pos',
        'guides/solutions/online-payment',
      ],
    },
    {
      type: 'category',
      label: 'MixPay Protocol',
      collapsed: false,
      items: [
        'guides/mixpay-protocol/become-a-broker',
        'guides/mixpay-protocol/mixpay-plus',
        'guides/mixpay-protocol/invoke-wallet-app',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      collapsed: false,
      items: [
        'guides/help/faq',
        'guides/help/contact-customer-service',
        'guides/help/design-assets',
      ],
    },
  ],
  api: [
    "api/overview",
    "api/change-log",
    {
      type: 'category',
      label: 'Connect',
      collapsed: false,
      items: [
        'api/connect/rate-limiting',
        'api/connect/error-codes',
        'api/connect/memo',
        'api/connect/strict-mode',
      ],
    },
    {
      type: 'category',
      label: 'Assets',
      collapsed: false,
      items: [
        'api/assets/payment-assets',
        'api/assets/quote-assets',
        'api/assets/settlement-assets',
      ],
    },
    {
      type: 'category',
      label: 'Payments',
      collapsed: false,
      items: [
        'api/payments/one-time-payment',
        'api/payments/payment-callback',
        'api/payments/pay',
        // 'api/payments/refresh-onchain-payments',
      ],
    },
    {
      type: 'category',
      label: 'Payment Info',
      collapsed: false,
      items: [
        'api/payments/payments-results',
        'api/payments/payments-estimated',
        'api/payments/payments-info',
      ],
    },
    {
      type: 'category',
      label: 'Multisig',
      collapsed: false,
      items: [
        'api/multisig/get-multisig-id',
      ],
    },
  ],
};
