<script>
	import { connected, isLoading, web3 } from '$lib';
	import { activeAddress, isEthereumBrowser } from '$lib/store/preferences';
</script>

<p>{$activeAddress || 'address tidak ditemukan'}</p>
{#if $connected}
	Connected wallet
	<a href="/coba">coba halaman</a>
{:else}
	disconect wallet
{/if}

{#if $isLoading}
	lagi loading
{/if}
{#if !isEthereumBrowser}
	Tidak suprot ethereum
{/if}
