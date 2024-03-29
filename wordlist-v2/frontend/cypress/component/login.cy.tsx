import { Providers } from "@/components/providers";
import { Login } from "@/features/authentication/login";
import { createRouter } from "../support/routerMock";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Component = () => {
	const router = createRouter();

	return (
		<AppRouterContext.Provider value={router}>
			<Providers>
				<Login setActiveForm={cy.stub()} />
			</Providers>
		</AppRouterContext.Provider>
	);
};

describe("Login component", () => {
	beforeEach(() => {
		cy.mount(<Component />);
	});

	describe("Validate errors", () => {
		beforeEach(() => {
			cy.get(`[data-cy="submit-form"]`).click();
		});

		it("Verifies for empty fields when form is submited", () => {
			cy.get(`[data-cy="email-error"]`).should("have.text", "Este campo não pode ficar vazio.");
			cy.get(`[data-cy="password-error"]`).should("have.text", "Este campo não pode ficar vazio.");
		});

		it("Clear errors if fields are not empty", () => {
			cy.get(`[data-cy="email-input"]`).type("Not empty anymore");
			cy.get(`[data-cy="submit-form"]`).click();
			cy.get(`[data-cy="email-error"]`).not("have.text");
			cy.get(`[data-cy="password-error"]`).should("have.text", "Este campo não pode ficar vazio.");
		});
	});
});
