import Authentication from "@/app/@authentication/page";

describe("authentication.cy.tsx", () => {
	it("Changes the current form", () => {
		cy.mount(<Authentication />);
		cy.get('[data-cy="change-form"]').click();
		cy.get('[data-cy="title-create"]').should("exist");
		cy.get('[data-cy="change-form"]').click();
		cy.get('[data-cy="title-login"]').should("exist");
	});
});
