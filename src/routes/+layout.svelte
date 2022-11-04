<script>
	import { page } from '$app/stores';
</script>

{#if $page.url.pathname !== '/'}
	<a href="/">Back To Home</a>
{/if}
<slot />
