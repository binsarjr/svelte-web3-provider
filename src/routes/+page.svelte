<script>
	import { connected, isLoading, isSupportEthereum, selectedAccount, web3 } from '$lib';

	let balance = '';
	$: if ($web3 && $selectedAccount) {
		$web3.eth.getBalance($selectedAccount).then(value => {
			balance=value
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
