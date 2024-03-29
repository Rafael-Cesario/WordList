import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Login } from "../login";
import { AllProviders } from "@/components/providers";
import { Notification } from "@/components/notification";

vi.mock("@/hooks/useQueriesUser");
import * as QueriesUser from "@/hooks/useQueriesUser";
const mockedQueriesUser = QueriesUser as { useQueriesUser: object };

const renderComponent = () => {
	render(
		<AllProviders>
			<Notification />
			<Login props={{ setFormName: vi.fn() }} />
		</AllProviders>
	);
};

describe("Login component", () => {
	const user = userEvent.setup();

	const userData = {};
	let error = "";

	mockedQueriesUser.useQueriesUser = () => ({
		requestLogin: () => ({ user: userData, error }),
	});

	it("Show errors on label", async () => {
		renderComponent();
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("email-label")).toHaveTextContent("Este campo não pode ficar vazio");
	});

	it("Show a notification for response errors", async () => {
		error = "Error trying to login";
		renderComponent();
		await user.type(screen.getByRole("email-input"), "email@email.com");
		await user.type(screen.getByRole("password"), "password123");
		await user.click(screen.getByRole("submit"));
		expect(screen.getByRole("notification").querySelector("h1")).toHaveTextContent("Ops...");
	});
});
