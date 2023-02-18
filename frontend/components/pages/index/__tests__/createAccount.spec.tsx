import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, vi } from "vitest";
import { CreateAccountForm } from "../createAccountForm";
import { queriesUser } from "../../../../services/queries/queriesUser";

vi.mock("../../../../services/queries/queriesUser", () => {
	return { queriesUser: { createUser: vi.fn() } };
});

describe("Create account form", () => {
	const changeFormState = vi.fn();

	beforeEach(() => {
		cleanup();
		render(<CreateAccountForm props={{ changeFormState }} />);
		vi.clearAllMocks();
	});

	it("Close the form", () => {
		act(() => fireEvent.click(screen.getByRole("close-form")));
		expect(changeFormState).toHaveBeenCalledWith("create");
	});

	it("show and remove error", async () => {
		act(() => fireEvent.click(screen.getByRole("button", { name: "Criar Conta" })));
		expect(screen.getByRole("label-email").textContent).toBe("Este campo não pode ficar vazio");

		await userEvent.type(screen.getByRole("input-email"), "user@email.com");
		act(() => fireEvent.click(screen.getByRole("button", { name: "Criar Conta" })));
		expect(screen.getByRole("label-email").textContent).toBe("Email");
	});

	it("show and hide password", () => {
		const input = screen.getByRole("input-password") as HTMLInputElement;
		expect(input.type).toBe("password");
		act(() => fireEvent.click(screen.getAllByRole("show-password")[0]));
		expect(input.type).toBe("text");
		act(() => fireEvent.click(screen.getAllByRole("show-password")[0]));
		expect(input.type).toBe("password");
	});

	it("can't create a user with the same email", async () => {
		vi.mocked(queriesUser).createUser.mockReturnValueOnce({ error: "email already in use" } as unknown as Promise<unknown>);

		await userEvent.type(screen.getByRole("input-email"), "user@email.com");
		await userEvent.type(screen.getByRole("input-name"), "user");
		await userEvent.type(screen.getByRole("input-password"), "Password123");
		await userEvent.type(screen.getByRole("input-confirmPassword"), "Password123");

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});

		expect(await screen.findByRole("label-email")).toHaveTextContent("Este email já esta sendo usado");
	});

	it.todo("password need to have a capital letter a number and ten digits");
	it.todo("inputs values are reset after submit");
	it.todo("show a notification");
	it.todo("Create a new user");
});
