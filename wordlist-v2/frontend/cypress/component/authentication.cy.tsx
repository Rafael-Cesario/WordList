import Authentication from "@/app/@authentication/page";
import { Providers } from "@/components/providers";
import { createRouter } from "../support/routerMock";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

describe("authentication.cy.tsx", () => {
	it("Changes the current form", () => {
		const router = createRouter();

		cy.mount(
			<AppRouterContext.Provider value={router}>
				<Providers>
					<Authentication />
				</Providers>
			</AppRouterContext.Provider>
		);

		cy.get('[data-cy="change-form"]').click();
		cy.get('[data-cy="title-create"]').should("exist");
		cy.get('[data-cy="change-form"]').click();
		cy.get('[data-cy="title-login"]').should("exist");
	});
});
