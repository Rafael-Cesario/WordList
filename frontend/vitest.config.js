import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],

	test: {
		// reporters: 'verbose',
		watch: false,
		environment: "jsdom",
		globals: true,
		css: false,
	},
});
