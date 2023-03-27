const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MixPay Developers',
  tagline: 'MixPay Developers Documents',
  url: 'https://mixpay.me',
  baseUrl: '/developers/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  organizationName: 'MixPay', // Usually your GitHub org/user name.
  projectName: 'developers.mixpay.me', // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    // locales: ['en', 'zh-CN'],
    // localeConfigs: {
    //   'en': {
    //     label: 'English',
    //   },
    //   'zh-CN': {
    //     label: '简体中文',
    //   }
    // }
  },
  themeConfig: {

    navbar: {
      title: 'MixPay Developers',
      logo: {
        alt: 'MixPay Developers',
        src: 'images/logo.png',
      },
      items: [
        {to: '/guides/introduction', label: 'Docs', position: 'left'},
        {to: '/api/overview', label: 'API Reference', position: 'left'},
        {
          href: 'https://mixpay.me/blog/',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://mixpay.me/',
          label: 'Home',
          position: 'right',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              href: 'https://mixpay.me/blog/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/MixPayProtocol',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MixPayProtocol',
            },
            {
              label: 'Developers',
              href: 'https://mixpay.me/developers',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MixPay`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['php'],
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar.docs.js'),
          path: 'docs',
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/MixPayProtocol/developers.mixpay.me/tree/master',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        }
      },
    ],
  ],
};
