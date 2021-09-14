import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import { CAKE_NAME } from '../index'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: CAKE_NAME.concat('-Matic LP'),
    lpAddresses: {
      97: '0xa40f90E8e60928eB56FEa610D0591D776ab54CC6',
      56: '0xD99Caa5110Bf465B05cdef0690Db0771732d937F',
      137: '0xcd14ed2d71f346ddbb03ca52363bc779371feca0' // token-matic lp
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '0x47572493C7DD70653940Dff6444897712a007EDC',
      56: '0x3bdbbf63fbed8550dd630f67fc5e4c2ac4ddc42b',
      137: '0x396a167fD7d5B96ed98904b19bb58BCD61C6e883' // token address
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAddresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: CAKE_NAME.concat('-USDC LP'),
    lpAddresses: {
      97: '0x383489bD934B077Ac0b3A9325E73BF72D9835AdA',
      56: '0xA0B0923621b5CFa654145604E286CA813C3C661B',
      137: '0x10179ab44e717eecdc3c576634e395165838b2e6' //token-usdc lp
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '0x47572493C7DD70653940Dff6444897712a007EDC',
      56: '0x3bdbbf63fbed8550dd630f67fc5e4c2ac4ddc42b',
      137: '0x396a167fD7d5B96ed98904b19bb58BCD61C6e883' // token address
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAddresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'Matic-USDC LP',
    lpAddresses: {
      97: '0xa79fe8865fb3c3c053ee63ba8b7f90dda5c3f334',
      56: '0x83166DaF1a93F7C8B31c4e09Cc85316a37dC2451',
      137: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827' // matic-usdc lp
    },
    tokenSymbol: 'Matic',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' // usdc address
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAddresses: contracts.busd,
  },
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: CAKE_NAME,
    lpAddresses: {
      97: '0x383489bD934B077Ac0b3A9325E73BF72D9835AdA',
      56: '0xA0B0923621b5CFa654145604E286CA813C3C661B',
      137: '0x10179ab44e717eecdc3c576634e395165838b2e6' // token-usdc LP
    },
    tokenSymbol: CAKE_NAME,
    tokenAddresses: {
      97: '0x47572493C7DD70653940Dff6444897712a007EDC',
      56: '0x3bdbbf63fbed8550dd630f67fc5e4c2ac4ddc42b',
      137: '0x396a167fD7d5B96ed98904b19bb58BCD61C6e883' // token address
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAddresses: contracts.busd,
  }
]

export default farms
