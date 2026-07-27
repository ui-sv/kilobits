<script lang="ts">
	import { App } from '$lib/index.js';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<App>
	{@render children()}
</App>
