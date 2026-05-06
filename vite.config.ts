import { defineConfig } from 'vitest/config';
// import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import unocss from 'unocss/vite';
import {
	presetWind4,
	presetWebFonts,
	presetIcons,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	plugins: [
		sveltekit(),
		unocss({
			presets: [
				presetWind4({ preflights: { reset: true } }),
				presetWebFonts({ fonts: { sans: 'Public Sans' } }),
				presetIcons()
			],
			transformers: [transformerCompileClass(), transformerDirectives(), transformerVariantGroup()]
		})
	]
	// test: {
	// 	expect: { requireAssertions: true },
	// 	projects: [
	// 		{
	// 			extends: './vite.config.ts',
	// 			test: {
	// 				name: 'client',
	// 				browser: {
	// 					enabled: true,
	// 					provider: playwright(),
	// 					instances: [{ browser: 'chromium', headless: true }]
	// 				},
	// 				include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
	// 				exclude: ['src/lib/server/**']
	// 			}
	// 		},

	// 		{
	// 			extends: './vite.config.ts',
	// 			test: {
	// 				name: 'server',
	// 				environment: 'node',
	// 				include: ['src/**/*.{test,spec}.{js,ts}'],
	// 				exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
	// 			}
	// 		}
	// 	]
	// }
});
