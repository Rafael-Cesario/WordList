import { faker } from "@faker-js/faker";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const { databaseURL } = Cypress.env();

const mockMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, response: any) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: response });
	}
};

describe("template spec", () => {
	before(() => {
		cy.visit("/");
	});

	describe("Create user", () => {
		it("Catch response errors", () => {
			const password = faker.internet.password({ length: 10, prefix: "Ab1" });
			const error = { errors: [{ message: "duplicated:" }] };

			cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", error));
			cy.get('[data-cy="change-form"]').click();
			cy.get('[data-cy="email-input"]').type(faker.internet.email());
			cy.get('[data-cy="name-input"]').type(faker.person.firstName());
			cy.get('[data-cy="password-input"]').type(password);
			cy.get('[data-cy="password-check-input"]').type(password);
			cy.get('[data-cy="submit-form"]').click();
			cy.wait("@CreateUser");
			cy.get(`[data-cy="notification"] > .message`).should("have.text", "Um usuário com o mesmo e-mail já existe.");
		});

		it.skip("Creates a new user");
	});

	describe("Login", () => {
		it.skip("Catch response errors");

		it.skip("Creates a cookie with authentication token");

		it.skip("Saves user data into local storage");

		it.skip("Successfully login a user");
	});
});
