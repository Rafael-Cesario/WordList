import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		reporters: "verbose",
		watch: false,
		globals: true,
		singleThread: true,
		silent: true,
	},
});
