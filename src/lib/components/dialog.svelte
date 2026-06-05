<script module lang="ts">
	import { Dialog } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type UnknFn = () => unknown;

	export interface DialogProps {
		open?: boolean;
		trigger?: Snippet<
			[
				{
					is_open: boolean;
					open: UnknFn;
					close: UnknFn;
					toggle: UnknFn;
					props: Record<string, unknown>;
				}
			]
		>;
		overlay?: boolean | Snippet<[Record<string, unknown>]>;
		header?: Snippet<[{ close: UnknFn }]>;
		footer?: Snippet<[{ close: UnknFn }]>;
		dismissable?: boolean;
		duration?: number;
		fullscreen?: number;
	}
</script>

<script lang="ts">
	let {
		open = $bindable(false),
		trigger,
		overlay = true,
		header,
		footer,
		dismissable = true,
		duration = 200,
		fullscreen
	}: DialogProps = $props();

	const close_fn = () => (open = false);
	const open_fn = () => (open = true);
	const toggle_fn = () => (open = !open);
</script>

<Dialog.Root>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				{@render trigger({
					is_open: open,
					open: open_fn,
					close: close_fn,
					toggle: toggle_fn,
					props
				})}
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		{#if overlay !== false}
			<Dialog.Overlay>
				{#snippet child({ props })}
					{#if overlay === true}
						<div {...props} transition:fade={{ duration }}></div>
					{/if}
				{/snippet}
			</Dialog.Overlay>
		{/if}

		<Dialog.Content></Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
