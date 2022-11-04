import { selectedAccount, connected, isSupportEthereum, isLoading, web3 } from "./store/preferences"

import Web3Provider from "./components/Web3Provider.svelte"
import { setProvider } from "./web3-utils"


export {
    connected, web3, isLoading, selectedAccount, isSupportEthereum, setProvider
}
export default Web3Provider