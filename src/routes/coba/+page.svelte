<script>
	import { web3 } from '$lib';

	$: if ($web3) {
		$web3.eth.getAccounts().then(console.log);
	}
</script>

<a href="/">halaman depan</a>
