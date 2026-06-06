<script module lang="ts">
	import { isSnippet, type ButtonProps, Button, Icon } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { defu } from 'defu';
	import { getAppContext } from '$lib/contexts.js';

	export type BannerProps = {
		title: string | Snippet;
		icon?: string | Component;
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
		href?: string;
		target?: string;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
			description?: ClassValue;
			title?: ClassValue;
		};
		onclose?: () => void | Promise<() => void>;
		button?: Snippet<[ButtonProps]>;
	};
</script>

<script lang="ts">
	let {
		title,
		close,
		icon,
		href,
		target,
		actions = [],
		ui = {},
		onclose = () => {},
		button
	}: BannerProps = $props();
</script>

<svelte:element this={href ? 'a' : 'button'} {href} {target} class={cn(ui.base)}>
	<div class="flex grow gap-2 text-sm items-center">
		<Icon name={icon} class={cn(ui.icon)} />

		<div class={cn(ui.title)}>
			{#if isSnippet(title)}
				{@render title()}
			{:else}
				{title}
			{/if}
		</div>

		{#if actions.length}
			{#each actions as action, idx (idx)}
				{#if button}
					{@render button(action)}
				{:else}
					<Button {...defu(action, <ButtonProps>{})} />
				{/if}
			{/each}
		{/if}
	</div>

	{#if close}
		{@const props = defu(typeof close === 'boolean' ? {} : close, <ButtonProps>{
			icon: getAppContext().icons.close,
			onclick: onclose
		})}

		<div>
			{#if button}
				{@render button(props)}
			{:else}
				<Button {...props} />
			{/if}
		</div>
	{/if}
</svelte:element>
