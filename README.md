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
	import Web3Provider from 'svelte-web3-provider';
    import net from 'net'
    import Web3 from 'web3'
</script>

    
<!--  No Fallback Provider -->
<Web3Provider />

<!--  With Fallback Provider -->
<Web3Provider fallbackProvider="http://localhost:8545" />
<Web3Provider fallbackProvider={new Web3.providers.WebsocketProvider('ws://localhost:8546')} />
<Web3Provider fallbackProvider={new Web3.providers.IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', net)} />


<slot/>
```


Then, you can do everything u need with web3.js. like this
```svelte
<script>
// routes/auto/+layout.svelte
	import Web3Provider from '$lib';
</script>

<Web3Provider/>
<main>
	<slot />
</main>
```
```svelte
<script>
    // routes/auto/+page.svelte
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

## Change provider on the fly
you can change your provider on the fly(example: change provider after 2 seconds). use `setProvider`
```svelte
<script>
// routes/onthefly/+layout.svelte
	import Web3Provider from '$lib';
</script>

<Web3Provider/>
<main>
	<slot />
</main>
```
```svelte
<script>
// routes/onthefly/+page.svelte
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
			// do like this
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


```

## Manual Setup Provider
you have to set manual props in `Web3Provider` to disable detect automatically browser and do what you want
```svelte
<script>
// routes/manual/+layout.svelte
	import Web3Provider from '$lib';
</script>

<Web3Provider manual/>
<main>
	<slot />
</main>
```
```svelte
<script>
// routes/manual/+page.svelte
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
		// set your provider like this
		// then, all store will reactivy automatically
		setProvider('http://127.0.0.1:8545');
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
```

## Store
u can see available store in this [file](./src/lib/store/preferences.ts)