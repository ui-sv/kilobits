<script module lang="ts">
	import { isSnippet, type ButtonProps, Button, Icon } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { defu } from 'defu';
	import { getAppContext } from '$lib/contexts.js';

	export type AlertProps = {
		title?: string | Snippet;
		description?: string | Snippet;
		icon?: string | Snippet | Component;
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
			description?: ClassValue;
			title?: ClassValue;
		};
		onclose?: () => unknown | Promise<() => unknown>;
		orientation?: 'horizontal' | 'vertical';
	};
</script>

<script lang="ts">
	let {
		title,
		description,
		close,
		icon,
		actions = [],
		ui = {},
		onclose = () => {},
		orientation = 'vertical'
	}: AlertProps = $props();
</script>

<div class={cn(ui.base)}>
	<div class="flex gap-2 flex-1">
		{#if isSnippet(icon)}
			{@render icon()}
		{:else}
			<Icon name={icon} class={cn(ui.icon)} />
		{/if}

		<div class="space-y-1 grow">
			{#if title}
				<div class={cn(ui.title)}>
					{#if isSnippet(title)}
						{@render title()}
					{:else}
						{title}
					{/if}
				</div>
			{/if}

			{#if description}
				<div class={cn(ui.title)}>
					{#if isSnippet(description)}
						{@render description()}
					{:else}
						{description}
					{/if}
				</div>
			{/if}
		</div>

		{#if orientation === 'horizontal'}
			{@render actions_snippet()}
		{/if}

		{#if close}
			<div>
				<Button
					{...defu(typeof close === 'boolean' ? {} : close, {
						icon: getAppContext().icons.close,
						variant: 'link',
						color: 'surface',
						onclick: onclose
					} as ButtonProps)}
				/>
			</div>
		{/if}
	</div>

	{#if orientation === 'vertical'}
		{@render actions_snippet()}
	{/if}
</div>

{#snippet actions_snippet()}
	{#if actions.length}
		<div class="flex gap-2 items-center pl-8">
			{#each actions as action, idx (idx)}
				<Button
					{...defu(action, <ButtonProps>{
						size: 'xs'
					})}
				/>
			{/each}
		</div>
	{/if}
{/snippet}
