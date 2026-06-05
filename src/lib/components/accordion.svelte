<script module lang="ts">
	import { Accordion, type AccordionRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import type { Component } from 'vitest-browser-svelte';

	export type AccordionItem = {
		value?: string;
		content?: string | Snippet | Component;
		title?: string | Snippet | Component;
	};

	export type AccordionMultiple = AccordionBaseProps & {
		type?: 'multiple';
		onchange?: (v: string[]) => void;
		value?: string[];
		trigger?: Snippet<[{ item: AccordionItem; value?: string[] }]>;
	};

	export type AccordionSingle = AccordionBaseProps & {
		type?: 'single';
		onchange?: (v: string) => void;
		value?: string;
		trigger?: Snippet<[{ item: AccordionItem; value?: string }]>;
	};

	export type AccordionBaseProps = {
		ref?: HTMLElement;
		items: Array<AccordionItem>;
		ui?: {
			root?: ClassValue;
			item?: ClassValue;
			header?: ClassValue;
			trigger?: ClassValue;
			content?: ClassValue;
		};
	};

	export type AccordionProps = AccordionSingle | AccordionMultiple;
</script>

<script lang="ts">
	let {
		value = $bindable(),
		ref = $bindable(),
		items,
		ui = {},
		type = 'single',
		trigger,
		onchange = () => {},
		...rest
	}: AccordionProps = $props();
</script>

<Accordion.Root
	bind:value={
		() => value as string,
		(v) => {
			value = v;
		}
	}
	bind:ref
	class={cn(ui.root)}
	type={type as 'single'}
	onValueChange={(v: unknown) => {
		onchange(v as string[] & string);
	}}
	{...rest}
>
	{#each items as item, idx (idx)}
		<Accordion.Item
			value={item.value || idx.toString()}
			class="border-dark-10 group border-b px-1.5"
		>
			<Accordion.Header>
				<Accordion.Trigger class={cn(ui.trigger)}>
					{#if trigger}
						{@render trigger({ item, value })}
					{/if}
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm tracking-[-0.01em]"
			>
				<div class="pb-[25px]">
					{item.content}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
