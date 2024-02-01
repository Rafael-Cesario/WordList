export const createRouter = () => {
	return {
		back: cy.spy().as("back"),
		forward: cy.spy().as("forward"),
		prefetch: cy.stub().as("prefetch").resolves(),
		push: cy.spy().as("push"),
		replace: cy.spy().as("replace"),
		refresh: cy.spy().as("refresh"),
		route: "/",
		pathname: "/",
		query: {},
		asPath: "/",
		basePath: "",
		defaultLocale: "en",
		domainLocales: [],
		isLocaleDomain: false,
		reload: cy.spy().as("reload"),
		beforePopState: cy.spy().as("beforePopState"),
		isFallback: false,
		isReady: true,
		isPreview: false,
		events: {
			emit: cy.spy().as("emit"),
			off: cy.spy().as("off"),
			on: cy.spy().as("on"),
		},
	};
};
