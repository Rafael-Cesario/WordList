import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Password } from "../password";

describe("Password component", () => {
	const user = userEvent.setup();

	it("Show and hide password", async () => {
		render(<Password changeValue={vi.fn()} errors={{}} fieldName="password" placeholder="Senha" />);
		await user.click(screen.getByRole("eye-icon"));
		expect(screen.getByRole("password").getAttribute("type")).toBe("text");
		await user.click(screen.getByRole("eye-icon"));
		expect(screen.getByRole("password").getAttribute("type")).toBe("password");
	});
});
