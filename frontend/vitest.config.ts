import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],

	test: {
		watch: false,
		reporters: 'verbose',
		environment: 'jsdom',
		globals: true,
		css: false,
	},
});
