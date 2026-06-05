<script module lang="ts">
	import { Dialog } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { type ClassValue, cn } from 'tailwind-variants';
	import { isSnippet } from '$lib/index.js';

	const TRANSITION_FN = () => ({});
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
		overlay?: boolean | Snippet<[{ props: Record<string, unknown>; is_open: boolean }]>;
		header?: Snippet<[{ close: UnknFn }]>;
		footer?: Snippet<[{ close: UnknFn }]>;
		dismissable?: boolean;
		fullscreen?: number;
		children?: Snippet;
		content?:
			| Snippet<[{ close: UnknFn; props: Record<string, unknown> }]>
			| {
					transition?: (node: Element, ...rest: unknown[]) => TransitionConfig;
					t_options?: Record<string, unknown>;
			  };
		ui?: {
			trigger?: ClassValue;
			overlay?: ClassValue;
			header?: ClassValue;
			footer?: ClassValue;
			content?: ClassValue;
		};
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
		fullscreen,
		children,
		content,
		ui = {}
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
		<Dialog.Overlay forceMount>
			{#snippet child({ props })}
				{#if isSnippet(overlay)}
					{@render overlay({ ...props, class: cn(ui.content) })}
				{:else if overlay === true || typeof overlay === 'object'}
					{#if open}
						<div {...props} class={cn(ui.content)}></div>
					{/if}
				{/if}
			{/snippet}
		</Dialog.Overlay>

		<Dialog.Content forceMount>
			{#snippet child({ props })}
				{#if isSnippet(content)}
					{@render content({ props, close: close_fn })}
				{:else if !content || typeof content === 'object'}
					{#if open}
						<div {...props} class={cn(ui.content)}>
							{@render children?.()}
						</div>
					{/if}
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
