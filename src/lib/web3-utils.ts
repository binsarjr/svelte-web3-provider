import Web3 from 'web3'
import type { provider as Provider } from 'web3-core'
import { get } from "svelte/store";
import { connected, isLoading, selectedAccount, web3 } from "./store/preferences";

export const accountsChanged = async () => {
    let accounts = await get(web3).eth.getAccounts();
    if (accounts.length) {
        connected.set(true)
        selectedAccount.set(accounts[0])
    } else {
        selectedAccount.set(null)
        connected.set(false)
    }
};
export const checkConnection = async () => {
    isLoading.set(true)
    try {
        const _ = await get(web3).eth.net.isListening();
        await accountsChanged();
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.set(false)
    }
};

export const setProvider = async (provider: Provider) => {
    web3.update(_ => new Web3(provider))
    await accountsChanged()
}
