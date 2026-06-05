<script module lang="ts">
	import { type ButtonRootProps } from 'bits-ui';
	import { cn } from 'tailwind-variants';

	export type ButtonProps = ButtonRootProps;
</script>

<script lang="ts">
	let {
		href,
		type,
		children,
		disabled = false,
		ref = $bindable(),
		class: classname,
		...rest_props
	}: ButtonProps = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	data-button-root
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	bind:this={ref}
	class={cn(classname)}
	{disabled}
	{...rest_props}
>
	{@render children?.()}
</svelte:element>
