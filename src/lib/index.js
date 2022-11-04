import { selectedAccount, connected, isSupportEthereum, isLoading, web3 } from "./store/preferences"

import Web3Provider from "./Web3Provider.svelte"


export {
    connected, web3, isLoading, selectedAccount, isSupportEthereum
}
export default Web3Provider