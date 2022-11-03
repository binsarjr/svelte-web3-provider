import { writable as writableTemp } from "svelte/store";
import type Web3 from 'web3'

export let connected = writableTemp(false)
export let activeAddress = writableTemp<string | null>(null)
/**
 * Please make sure connection already connected
 */
export let web3 = writableTemp<Web3>()
export let isLoading = writableTemp(true)
export let isEthereumBrowser = writableTemp(true)