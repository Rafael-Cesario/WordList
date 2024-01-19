import { faker } from "@faker-js/faker";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const mockMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, response: any) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: response });
	}
};

describe("template spec", () => {
	const { databaseURL } = Cypress.env();

	const userData = {
		email: faker.internet.email(),
		name: faker.person.firstName(),
		password: faker.internet.password({ length: 10, prefix: "Ab1" }),
	};

	beforeEach(() => {
		cy.visit("/");
	});

	describe("Create user", () => {
		beforeEach(() => {
			cy.get('[data-cy="change-form"]').click();
			cy.get('[data-cy="email-input"]').type(userData.email);
			cy.get('[data-cy="name-input"]').type(userData.name);
			cy.get('[data-cy="password-input"]').type(userData.password);
			cy.get('[data-cy="password-check-input"]').type(userData.password);
			cy.get(`[data-cy="submit-form"]`).click();
		});

		it("Catch response errors", () => {
			const errors = [{ message: "duplicated:" }];
			cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { errors }));
			cy.wait("@CreateUser");
			cy.get(`[data-cy="notification"] > .message`).should("have.text", "Um usuário com o mesmo e-mail já existe.");
		});

		it("Creates a new user", () => {
			const data: CreateUserResponse = { createUser: "success: new user created." };
			cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { data }));
			cy.wait("@CreateUser");
			cy.get(`[data-cy="notification"] > .message`).should("include.text", `${userData.name}, boas vindas`);
		});
	});

	describe("Login", () => {
		it.skip("Catch response errors");

		it.skip("Creates a cookie with authentication token");

		it.skip("Saves user data into local storage");

		it.skip("Successfully login a user");
	});
});
