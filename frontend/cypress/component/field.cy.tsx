import { Field } from "@/features/authentication/components/field";

describe("Field", () => {
	it("Show and hide password", () => {
		cy.mount(
			<Field
				error=""
				value="123"
				onChange={() => cy.stub()}
				label="Password"
				name="password"
				placeholder="Write your password"
				type="password"
			/>
		);

		cy.get(`[data-cy="password-input"]`).should("have.attr", "type", "password");

		cy.get(`[data-cy="show-password"]`).click();
		cy.get(`[data-cy="password-input"]`).should("have.attr", "type", "text");

		cy.get(`[data-cy="hide-password"]`).click();
		cy.get(`[data-cy="password-input"]`).should("have.attr", "type", "password");
	});
});
