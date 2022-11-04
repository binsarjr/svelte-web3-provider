<script>
	import { connected, isLoading, web3 } from '$lib';
	import { selectedAccount, isSupportEthereum } from '$lib/store/preferences';
</script>

<p>{$selectedAccount || 'address tidak ditemukan'}</p>
{#if $connected}
	Connected wallet
	<a href="/coba">coba halaman</a>
{:else}
	disconect wallet
{/if}

{#if $isLoading}
	lagi loading
{/if}
{#if !isSupportEthereum}
	Tidak suprot ethereum
{/if}
