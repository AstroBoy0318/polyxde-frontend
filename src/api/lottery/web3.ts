import Web3 from 'web3'

const BSC_NODE_RPC = {
  "56": [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/",
  ],
  "97": [
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  ],
  "137":[
    "https://rpc-mainnet.maticvigil.com/"
  ]
};

export const getWeb3 = (): Web3 => {
  const provider: string = BSC_NODE_RPC[process.env.REACT_APP_CHAIN_ID][Math.floor(Math.random() * BSC_NODE_RPC[process.env.REACT_APP_CHAIN_ID].length)];

  return new Web3(new Web3.providers.HttpProvider(provider, { timeout: 30000 }));
};

export const getContract = (abi: any, address: string) => {
  const web3: Web3 = getWeb3();

  return new web3.eth.Contract(abi, address);
};
