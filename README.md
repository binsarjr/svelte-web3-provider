# Svelte Web3 Provider
svelte web3 is provider for [web3.js](https://web3js.readthedocs.io) for handle request network to metamask or other provider.
Example see [here](./src/routes).

## Contribute
Need Contribution For Better Docs


## Instalation
Use any package manager do you want.
```bash
// Using Yarn to install
yarn add --dev svelte-web3-provider

// or if you prefer NPM
npm install --save-dev svelte-web3-provider
```

## Basic Usage
You must add `Web3Provider` to root layout and Web3Provider will detect if browser support etehreum or not. if not, you can set fallback provider.So, it will use the provider you have set.

```svelte
<script>
    // routes/+layout.svelte
	import Web3Provider from '$lib';
    import net from 'net'
    import Web3 from 'web3'
</script>

    
<!--  No Fallback Provider -->
<Web3Provider />

<!--  With Fallback Provider -->
<Web3Provider provider="http://localhost:8545" />
<Web3Provider provider={new Web3.providers.WebsocketProvider('ws://localhost:8546')} />
<Web3Provider provider={new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)} />


<slot/>
```


Then, you can do everything u need with web3.js. like this
```svelte
<script>
    // routes/+page.svelte
	import { connected, isLoading, isSupportEthereum, selectedAccount, web3 } from 'svelte-web3-provider';

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
```

## Store
u can see available store in this [file](./src/lib/store/preferences.ts)