import { defineConfig } from "cypress";

export default defineConfig({
	screenshotOnRunFailure: false,

	component: {
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},

	e2e: {
		baseUrl: "http://localhost:3000",
		env: { databaseURL: "http://localhost:8080/graphql" },
		watchForFileChanges: false,
	},
});

