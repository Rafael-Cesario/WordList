import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { CreateAccount } from "../createAccount";
import { AllProviders } from "@/components/providers";

const renderComponent = () => {
	render(
		<AllProviders>
			<CreateAccount props={{ setFormName: vi.fn() }} />
		</AllProviders>
	);
};

describe("Create account component", () => {
	const user = userEvent.setup();

	it("Show errors on the label", async () => {
		renderComponent();
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("email-label")).toHaveTextContent("Este campo não pode ficar vazio");

		await user.type(screen.getByRole("input-email"), "not valid");
		await user.type(screen.getAllByRole("password")[0], "123");
		await user.type(screen.getAllByRole("password")[1], "123");

		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("email-label")).toHaveTextContent("Seu email não parece valido");

		await user.type(screen.getByRole("input-email"), "valid@domain.com");
		await user.click(screen.getByRole("submit"));

		expect(screen.getByRole("password-label")).toHaveTextContent("Sua senha precisa ter ao menos 10 caracteres");
	});
});
