import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],

	test: {
		reporters: "verbose",
		environment: "jsdom",
		watch: false,
		globals: true,
		css: false,
	},
});
