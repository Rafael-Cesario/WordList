import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		threads: true,
		isolate: true,
	},
});
