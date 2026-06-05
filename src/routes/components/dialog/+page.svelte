<script lang="ts">
	import { Dialog } from '$lib/index.js';

	let open = $state(false);
</script>

<Dialog bind:open>hello world</Dialog>

<button onclick={() => (open = !open)}>What</button>
