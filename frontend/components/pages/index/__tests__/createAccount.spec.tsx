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
		vi.clearAllMocks();
		render(<CreateAccountForm props={{ changeFormState }} />);
	});

	it("show and remove error", async () => {
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});
		expect(screen.getByRole("label-email").textContent).toBe("Este campo não pode ficar vazio");

		await userEvent.type(screen.getByRole("input-email"), "user@email.com");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});
		expect(screen.getByRole("label-email").textContent).toBe("Email");
	});

	it("show and hide password", () => {
		const input = screen.getByRole("input-password") as HTMLInputElement;
		expect(input.type).toBe("password");
		act(() => {
			fireEvent.click(screen.getAllByRole("show-password")[0]);
		});
		expect(input.type).toBe("text");
		act(() => {
			fireEvent.click(screen.getAllByRole("show-password")[0]);
		});
		expect(input.type).toBe("password");
	});

	it("Handle backend errors, 'email already in use' ", async () => {
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

	it("verify if the password is strong", async () => {
		await userEvent.type(screen.getByRole("input-password"), "123");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
			expect(screen.getByRole("label-password")).toHaveTextContent("Ao menos uma letra maiuscula deve existir");
		});

		await userEvent.clear(screen.getByRole("input-password"));
		await userEvent.type(screen.getByRole("input-password"), "R123");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
			expect(screen.getByRole("label-password")).toHaveTextContent("Ao menos uma letra minuscula deve existir");
		});

		await userEvent.clear(screen.getByRole("input-password"));
		await userEvent.type(screen.getByRole("input-password"), "Ra");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
			expect(screen.getByRole("label-password")).toHaveTextContent("Sua senha deve conter ao menos um numero");
		});

		await userEvent.clear(screen.getByRole("input-password"));
		await userEvent.type(screen.getByRole("input-password"), "Ra123");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
			expect(screen.getByRole("label-password")).toHaveTextContent("Sua senha deve conter ao menos 10 letras");
		});
	});

	it("Verify if password and confirm password are equal", async () => {
		await userEvent.type(screen.getByRole("input-password"), "one");
		await userEvent.type(screen.getByRole("input-confirmPassword"), "two");

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
			expect(screen.getByRole("label-confirmPassword")).toHaveTextContent("Suas senhas devem ser iguais");
		});
	});

	it("inputs values are reset after submit", async () => {
		vi.mocked(queriesUser).createUser.mockReturnValueOnce({ message: "ok" } as unknown as Promise<unknown>);

		await userEvent.type(screen.getByRole("input-email"), "user@email.com");
		await userEvent.type(screen.getByRole("input-name"), "user");
		await userEvent.type(screen.getByRole("input-password"), "Password123");
		await userEvent.type(screen.getByRole("input-confirmPassword"), "Password123");

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});

		expect(await screen.findByRole("input-email")).toHaveValue("");
		expect(await screen.findByRole("input-name")).toHaveValue("");
		expect(await screen.findByRole("input-password")).toHaveValue("");
		expect(await screen.findByRole("input-confirmPassword")).toHaveValue("");
	});

	it("show a notification after creating a user", async () => {
		vi.mocked(queriesUser).createUser.mockReturnValueOnce({ message: "ok" } as unknown as Promise<unknown>);

		await userEvent.type(screen.getByRole("input-email"), "user@email.com");
		await userEvent.type(screen.getByRole("input-name"), "user");
		await userEvent.type(screen.getByRole("input-password"), "Password123");
		await userEvent.type(screen.getByRole("input-confirmPassword"), "Password123");

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});

		expect(await screen.findByRole("message")).toBeInTheDocument();
		expect(await screen.findByRole("message")).toHaveTextContent("Uma nova conta foi criada");
	});

	it("Create a new user", async () => {
		vi.mocked(queriesUser).createUser.mockReturnValueOnce({ message: "ok" } as unknown as Promise<unknown>);
		const { email, name, password } = { email: "user@email.com", name: "user", password: "Password123" };

		await act(async () => {
			await userEvent.type(screen.getByRole("input-email"), email);
			await userEvent.type(screen.getByRole("input-name"), name);
			await userEvent.type(screen.getByRole("input-password"), password);
			await userEvent.type(screen.getByRole("input-confirmPassword"), password);

			fireEvent.click(screen.getByRole("button", { name: "Criar Conta" }));
		});

		expect(queriesUser.createUser).toHaveBeenCalledWith({ email, name, password });
	});

	it("focus on the email input when open", () => {
		const input = screen.getByRole("input-email") as HTMLInputElement;
		expect(input === document.activeElement).toBe(true);
	});
});
