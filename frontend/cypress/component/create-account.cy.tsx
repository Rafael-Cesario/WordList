import { Providers } from "@/components/providers";
import { CreateAccount } from "@/features/authentication/create-account";

describe("Create account", () => {
	beforeEach(() => {
		cy.mount(
			<Providers>
				<CreateAccount setActiveForm={cy.stub()} />
			</Providers>
		);
	});

	it("Validates a field on change", () => {
		cy.get(`[data-cy="email-input"]`).type("not valid");
		cy.get(`[data-cy="email-error"]`).should("have.text", "Email invalido!");
	});

	it("Validates all fields when form is submited", () => {
		cy.get('[data-cy="submit-form"]').click();
		cy.get(`[data-cy="email-error"]`).should("have.text", "Este campo não pode ficar vazio");
		cy.get(`[data-cy="name-error"]`).should("have.text", "Este campo não pode ficar vazio");
		cy.get(`[data-cy="password-error"]`).should("have.text", "Este campo não pode ficar vazio");
		cy.get(`[data-cy="password-check-error"]`).should("have.text", "Este campo não pode ficar vazio");
	});
});
