<script lang="ts">
	import Web3 from 'web3';

	import { onMount } from 'svelte';
	import {
		activeAddress,
		connected,
		isEthereumBrowser,
		isLoading,
		web3
	} from './store/preferences';

	// make sure connected false when web3 store is empty
	if (!$web3) {
		$connected = false;
	}

	const checkConnection = async () => {
		$isLoading = true;
		try {
			const _ = await $web3.eth.net.isListening();
		} catch (err) {
			console.error(err);
		}
		$isLoading = false;
		accountsChanged();
	};
	const accountsChanged = async () => {
		let accounts = await $web3.eth.getAccounts();
		if (accounts.length) {
			$connected = true;
			$activeAddress = accounts[0];
		} else {
			$activeAddress = null;
			$connected = false;
		}
	};
	onMount(async () => {
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
		// Non-dapp browsers...
		else {
			console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!');
			$connected = false;
			$isLoading = false;
			$isEthereumBrowser = false;
		}
	});
</script>
