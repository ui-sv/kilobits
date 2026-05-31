import { default as ToastAction } from './action.svelte';
import { default as ToastClose } from './close.svelte';
import { default as ToastDescription } from './description.svelte';
import { default as ToastPortal } from './provider.svelte';
import { default as ToastProvider } from './provider.svelte';
import { default as ToastRoot } from './root.svelte';
import { default as ToastTitle } from './title.svelte';
import { default as ToastViewport } from './viewport.svelte';

export * from './action.svelte';
export * from './close.svelte';
export * from './description.svelte';
export * from './provider.svelte';
export * from './provider.svelte';
export * from './root.svelte';
export * from './title.svelte';
export * from './viewport.svelte';

export const Toast = {
	Action: ToastAction,
	Close: ToastClose,
	Description: ToastDescription,
	Portal: ToastPortal,
	Provider: ToastProvider,
	Root: ToastRoot,
	Title: ToastTitle,
	Viewport: ToastViewport
};

export {
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastPortal,
	ToastProvider,
	ToastRoot,
	ToastTitle,
	ToastViewport
};
