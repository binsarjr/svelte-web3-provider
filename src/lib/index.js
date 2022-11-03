import { activeAddress, connected, isEthereumBrowser, isLoading, web3 } from "./store/preferences"

import Web3Provider from "./Web3Provider.svelte"


export {
    connected, web3, isLoading, activeAddress, isEthereumBrowser
}
export default Web3Provider