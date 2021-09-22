import { MenuEntry } from 'uikit-layer2'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
 {
    label: 'Buy',
    icon: 'GroupsIcon',
    href: 'https://quickswap.exchange/#/swap?outputCurrency=0x600a2c125b501e0a477e2c4ad0d9d51c0d6df813'
  },
 {
    label: 'Liquidity',
    icon: 'GroupsIcon',
    href: 'https://quickswap.exchange/#/add/0x600A2C125b501E0A477E2C4AD0d9d51C0d6dF813'
  },
  {
    label: 'Referrals',
    icon: 'GroupsIcon',
    href: '/referrals',
  },
  {
    label: 'Chart',
    icon: 'GroupsIcon',
    href: 'https://dex.guru/token/0x600a2c125b501e0a477e2c4ad0d9d51c0d6df813-polygon'
  },
  {
    label: 'Docs',
    icon: 'GroupsIcon',
    href: 'https://xdegenfinance.gitbook.io/idegen-finance/layers/iclaws'
  },
  {
    label: 'xDegen',
    icon: 'GroupsIcon',
    href: 'https://xdegen.finance'
  }
]

export const socials = [
  {
    label: "Github",
    icon: "GithubIcon",
    href: "https://github.com/xdegen"
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/xDegenFinance",
  },
  {
    label: "Telegram",
    icon: "TelegramIcon",
    href: "https://t.me/xDegenFinance"
  },
];

export default config
