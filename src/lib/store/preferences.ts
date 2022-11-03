import { writable } from "svelte-local-storage-store";
import { writable as writableTemp } from "svelte/store";
import type Web3 from 'web3'

export let connected = writable('web3.connected', false)
export let activeAddress = writable<string | null>('web3.active_address', null)
/**
 * Please make sure connection already connected
 */
export let web3 = writableTemp<Web3>()
export let isLoading = writableTemp(true)
export let isEthereumBrowser = writableTemp(true)