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

		describe("Error", () => {
			it("Catch response errors", () => {
				const errors = [{ message: "duplicated:" }];
				cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { errors }));
				cy.wait("@CreateUser");
				cy.get(`[data-cy="notification"] > .message`).should("have.text", "Um usuário com o mesmo e-mail já existe.");
			});
		});

		describe("Success", () => {
			beforeEach(() => {
				const data: CreateUserResponse = { createUser: "success: new user created." };
				cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { data }));
				cy.wait("@CreateUser");
			});

			it("Display a success notification", () => {
				cy.get(`[data-cy="notification"] > .message`).should("include.text", `${userData.name}, boas vindas`);
			});

			it("Changes the current form to login", () => {
				cy.get('[data-cy="title-login"]').should("exist");
			});

			it("Cleans the create form", () => {
				cy.get('[data-cy="change-form"]').click();
				cy.get('[data-cy="email-input"]').should("have.value", "");
			});
		});
	});

	describe("Login", () => {
		it.skip("Catch response errors");

		it.skip("Creates a cookie with authentication token");

		it.skip("Successfully login a user");

		it.skip('Sends user to home page after login')
	});
});
