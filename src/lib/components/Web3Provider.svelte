<script lang="ts">
	import Web3 from 'web3';
	import type { provider as Provider } from 'web3-core';

	import { onMount } from 'svelte';
	import { connected, isSupportEthereum, isLoading, web3 } from '../store/preferences';
	import { accountsChanged, checkConnection } from '$lib/web3-utils';

	/**
	 * Your Provider when metamask and window.web3 is empty(not ehtereum support) then
	 * will use your fallback provider
	 */
	export let fallbackProvider: Provider | null = null;
	export let manual = false;

	// make sure connected false when web3 store is empty
	if (!$web3) {
		$connected = false;
	}

	onMount(async () => {
		if (manual) {
			$isLoading = false;
			console.warn('You use manual setup');
			return;
		}
		// @ts-ignore
		let ethereum = window.ethereum;
		// @ts-ignore
		let windowWeb3 = window.web3;

		// Breaking changes in MetaMask => see: https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
		// Modern dapp browsers...
		if (ethereum) {
			ethereum.on('accountsChanged', accountsChanged);
			$web3 = new Web3(ethereum);
			await ethereum.request({ method: 'eth_requestAccounts' });
			// don't use Promise all. check connection is depends
			await checkConnection();
		}
		// Legacy dapp browsers...
		else if (windowWeb3) {
			// Acccounts always exposed
			$web3 = new Web3(windowWeb3.currentProvider);
			await checkConnection();
		}
		// custom provider
		else if (fallbackProvider) {
			// Acccounts always exposed
			$web3 = new Web3(fallbackProvider);
			await checkConnection();
		}
		// Non-dapp browsers...
		else {
			console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!');
			$connected = false;
			$isSupportEthereum = false;
		}
		$isLoading = false;
	});
</script>
