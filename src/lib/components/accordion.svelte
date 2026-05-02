<script module lang="ts">
	import { Accordion, type AccordionRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import type { Component } from 'vitest-browser-svelte';

	export type AccordionItem<T> = {
		value?: T;
		content?: string | Snippet | Component;
		title?: string | Snippet | Component;
	};

	export type AccordionProps<T> = {
		ref?: HTMLElement;
		items: Array<AccordionItem<T>>;
		type?: 'multiple' | 'single';
		ui?: {
			root?: ClassValue;
			item?: ClassValue;
			header?: ClassValue;
			trigger?: ClassValue;
			content?: ClassValue;
		};
		trigger?: Snippet<[]>;
	};
</script>

<script lang="ts" generics="T extends string | number">
	let { ref = $bindable(), items, ui = {}, type = 'single', ...rest }: AccordionProps<T> = $props();
</script>

<Accordion.Root bind:ref class={cn(ui.root)} {type} {...rest}>
	{#each items as item, idx (idx)}
		<Accordion.Item
			value={(item.value === undefined ? idx : item.value) as string}
			class="border-dark-10 group border-b px-1.5"
		>
			<Accordion.Header>
				<Accordion.Trigger
					class="flex w-full flex-1 select-none items-center justify-between py-5 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180"
				>
					<span class="w-full text-left">
						{item.title}
					</span>
					<span
						class="hover:bg-dark-10 inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
					>
						<CaretDown class="size-[18px] transition-transform duration-200" />
					</span>
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
