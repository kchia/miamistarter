import {
  AccountsApi,
  FaucetsApi,
  Configuration,
} from "@stacks/blockchain-api-client";

import { COIN_MAP_DEVELOPMENT, STACKS_API_URL, ACCOUNTS } from "../constants";

const BASE = 1_000_000;

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: STACKS_API_URL,
});

const accounts = new AccountsApi(apiConfig);

export default function useStx() {
  async function getAccountInfo(stacksAddress) {
    const accountInfo = await accounts.getAccountInfo({
      principal: stacksAddress,
    });

    return accountInfo;
  }

  async function runFaucetStx(stacksAddress) {
    const faucets = new FaucetsApi(apiConfig);

    const faucetTx = await faucets.runFaucetStx({
      address: stacksAddress,
    });

    return faucetTx;
  }

  async function getAccountTransactions(stacksAddress) {
    const history = await accounts.getAccountTransactions({
      principal: stacksAddress,
    });

    return history;
  }

  async function getAccountBalance(stacksAddress) {
    const balances = await accounts.getAccountBalance({
      principal: stacksAddress,
    });

    // $MIA is not yet available on testnet, so here
    // we simulate a wallet with some $MIA
    if (stacksAddress === ACCOUNTS.contains_mia) {
      balances.fungible_tokens = {
        [COIN_MAP_DEVELOPMENT.MIA.contract]: {
          balance: "251",
          total_sent: "35000",
          total_received: "35251",
        },
      };
    }

    return balances;
  }

  function balanceHasCoin(coin, balances) {
    const { asset_class, contract } = COIN_MAP_DEVELOPMENT[coin];

    const validContract = contract
      ? balances[asset_class][contract]
      : balances[asset_class];

    return validContract ? parseInt(validContract.balance) > 0 : false;
  }

  function balanceHasCoinMinimum(coin, minimumAmount, balances) {
    const { asset_class, contract } = COIN_MAP_DEVELOPMENT[coin];
    const validContract = contract
      ? balances[asset_class][contract]
      : balances[asset_class];
    const coinBalance = validContract.balance || 0;
    const normalizedBalance = coinBalance / BASE;

    return normalizedBalance >= +minimumAmount;
  }

  async function getWalletBalances(walletAddress) {
    try {
      const data = await fetch(
        `${STACKS_API_URL}/extended/v1/address/${walletAddress}/balances`
      );
      const balances = data.json();
      if (balances.error) {
        throw new Error(balances.error);
      }
      return balances;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    balanceHasCoin,
    balanceHasCoinMinimum,
    getWalletBalances,
    getAccountInfo,
    getAccountBalance,
    getAccountTransactions,
    runFaucetStx,
  };
}
