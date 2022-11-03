import { writable  } from "svelte/store";
import type Web3 from 'web3'

export let connected = writable(false)
export let activeAddress = writable<string | null>(null)
/**
 * Please make sure connection already connected
 */
export let web3 = writable<Web3>()
export let isLoading = writable(true)
export let isEthereumBrowser = writable(true)