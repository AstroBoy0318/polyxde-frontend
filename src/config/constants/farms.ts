import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import { CAKE_NAME } from '../index'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: CAKE_NAME.concat('-WMATIC'),
    lpAddresses: {
      97: '',
      56: '',
      137: '0x08c6996334E99EDe409a428f2e943e84A508366A'
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAddresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: CAKE_NAME.concat('-USDC'),
    lpAddresses: {
      97: '',
      56: '',
      137: '0xcd0e4e17ba675b45e6af4bb576d42ede632c6c65'
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x600A2C125b501E0A477E2C4AD0d9d51C0d6dF813'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'IDEGEN-USDC',
    lpAddresses: {
      97: '',
      56: '',
      137: '0xd318ccb3b78e0c19b50fcbff5be205dbc6f884c2'
    },
    tokenSymbol: 'IDEGEN-USDC',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x8C6E566986ACa670b3C14A92C9581DdD282AC2a9'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
  {
    pid: 4,
    risk: 3,
    lpSymbol: 'DAI-USDC',
    lpAddresses: {
      97: '',
      56: '',
      137: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd'
    },
    tokenSymbol: '',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: CAKE_NAME,
    lpAddresses: {
      97: '',
      56: '',
      137: '0xcd0e4e17ba675b45e6af4bb576d42ede632c6c65'
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x600a2c125b501e0a477e2c4ad0d9d51c0d6df813'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  }, 
{
    pid: 5,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'IDEGEN',
    lpAddresses: {
      97: '',
      56: '',
      137: '0xd318ccb3b78e0c19b50fcbff5be205dbc6f884c2'
    },
    tokenSymbol: 'IDEGEN',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x8C6E566986ACa670b3C14A92C9581DdD282AC2a9'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  }, 
{
    pid: 6,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WMATIC',
    lpAddresses: {
      97: '',
      56: '',
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827'
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
{
    pid: 7,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WBTC',
    lpAddresses: {
      97: '',
      56: '',
      137: '0xf6a637525402643b0654a54bead2cb9a83c8b498'
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
{
    pid: 8,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WETH',
    lpAddresses: {
      97: '',
      56: '',
      137: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d'
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
{
    pid: 9,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'USDC',
    lpAddresses: {
      97: '',
      56: '',
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
{
    pid: 10,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'USDT',
    lpAddresses: {
      97: '',
      56: '',
      137: '0x2cf7252e74036d1da831d11089d326296e64a728'
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  },
{
    pid: 11,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    lpAddresses: {
      97: '',
      56: '',
      137: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd'
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '',
      137: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAddresses: contracts.usdc,
  }
]

export default farms
