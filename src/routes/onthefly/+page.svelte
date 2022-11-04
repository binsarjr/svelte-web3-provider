<script>
	import { browser } from '$app/environment';
	import {
		connected,
		isLoading,
		isSupportEthereum,
		selectedAccount,
		setProvider,
		web3
	} from '$lib';

	let balance = '';

	$: if (browser) {
		setTimeout(() => {
			setProvider('http://127.0.0.1:8545');
		}, 2000);
	}

	$: if ($web3 && $selectedAccount) {
		$web3.eth.getBalance($selectedAccount).then((value) => {
			balance = value;
		});
	}
</script>

<p>{$selectedAccount || 'no address'}</p>
<p>Balance: {balance}</p>
{#if $connected}
	Connected wallet
{:else}
	wallet not connected
{/if}

{#if $isLoading}
	<p>Loading...</p>
{/if}
{#if !$isSupportEthereum}
	<p>not support ethereum network</p>
{/if}
