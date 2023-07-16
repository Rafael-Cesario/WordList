import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],

	test: {
		setupFiles: ["./setupTests.ts"],
		environment: "jsdom",
		globals: true,
		watch: false,
		// reporters: "verbose",
		exclude: ["node_modules", "**/__utils__/**"],
	},
});
