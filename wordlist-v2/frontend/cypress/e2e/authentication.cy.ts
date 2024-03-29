import { CreateUserResponse, LoginResponse } from "@/services/interfaces/user";
import { faker } from "@faker-js/faker";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const mockMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, response: any) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: response });
	}
};

describe("Authentication page", () => {
	const { databaseURL } = Cypress.env();

	const userData = {
		email: faker.internet.email(),
		name: faker.person.firstName(),
		password: faker.internet.password({ length: 10, prefix: "Ab1" }),
	};

	const intercept = (operationName: string, response: object) => {
		cy.intercept("POST", databaseURL, (req) => mockMutation(req, operationName, response));
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
		});

		describe("Error", () => {
			it("Catch response errors", () => {
				const errors = [{ message: "duplicated:" }];
				cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { errors }));
				cy.get(`[data-cy="submit-form"]`).click();
				cy.wait("@CreateUser");
				cy.get(`[data-cy="notification"] > .message`).should("have.text", "Um usuário com o mesmo e-mail já existe.");
			});
		});

		describe("Success", () => {
			beforeEach(() => {
				const data: CreateUserResponse = { createUser: "success: new user created." };
				cy.intercept("POST", databaseURL, (req) => mockMutation(req, "CreateUser", { data }));
				cy.get(`[data-cy="submit-form"]`).click();
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
		beforeEach(() => {
			cy.get(`[data-cy="email-input"]`).type(userData.email);
			cy.get(`[data-cy="password-input"]`).type(userData.password);
		});

		describe("Errors", () => {
			it("Catch response error for invalid credentials", () => {
				const errors = [{ message: "Unauthorized: Invalid credentials" }];
				intercept("Login", { errors });

				cy.get(`[data-cy="submit-form"]`).click();
				cy.wait("@Login");
				cy.get(`[data-cy="notification"] > .message`).should("have.text", "Seu email ou sua senha não estão corretos.");
			});

			it("Catch response error for unexpected errors", () => {
				const errors = [{ message: "unexpected error" }];
				intercept("Login", { errors });

				cy.get(`[data-cy="submit-form"]`).click();
				cy.wait("@Login");
				cy.get(`[data-cy="notification"] > .message`).should("have.text", "Um erro inesperado ocorreu.");
			});
		});

		describe("Success", () => {
			const data: LoginResponse = {
				login: { id: "123", email: userData.email, name: userData.name, token: "18138372fad4b94533cd4881f03dc6c6" },
			};

			beforeEach(() => {
				intercept("Login", { data });
				cy.intercept("/api/cookies/user").as("setCookies");
				cy.get(`[data-cy="submit-form"]`).click();
				cy.wait("@Login");
				cy.wait("@setCookies");
			});

			it("Creates a cookie for the user", () => {
				cy.getCookie("user").should("exist");
			});

			it("Sends user to home page after login", () => {
				cy.get(`[data-cy="title-login"]`).should("not.exist");
			});
		});
	});
});
