import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../loginForm";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import { queriesUser } from "../../../../services/queries/queriesUser";
import { setCookies } from "../../../../services/cookies";

vi.mock("next/router", () => ({
	useRouter() {
		return {
			query: { listName: "list00" },
			push: vi.fn(),
		};
	},
}));

vi.mock("../../../../services/queries/queriesUser", () => {
	return { queriesUser: { login: vi.fn() } };
});

vi.mock("../../../../services/cookies", () => {
	return { setCookies: vi.fn() };
});

describe("Login form", () => {
	beforeEach(() => {
		const changeFormState = vi.fn();
		render(<LoginForm props={{ changeFormState }} />);
	});

	it("can't be submited with empty values", () => {
		act(() => fireEvent.click(screen.getByRole("login-btn")));
		expect(screen.getByRole("label-email")).toHaveTextContent("Este campo não pode ficar vazio");
	});

	it("returns a error if email/password is wrong", async () => {
		vi.mocked(queriesUser).login.mockReturnValueOnce({ error: "email/password is wrong" } as unknown as Promise<unknown>);

		await act(async () => {
			await userEvent.type(screen.getByRole("input-email"), "user@email.com");
			await userEvent.type(screen.getByRole("input-password"), "123123123");
			fireEvent.click(screen.getByRole("login-btn"));
		});

		expect(screen.getByRole("label-email")).toHaveTextContent("Email ou senha incorreta");
		expect(screen.getByRole("label-password")).toHaveTextContent("Email ou senha incorreta");
	});

	it("set a cookie with the token", async () => {
		const token = "a0s9d87f1ç3l24kas0d89f67lk1234j5has9d78f6";
		vi.mocked(queriesUser).login.mockReturnValueOnce({ token } as unknown as Promise<unknown>);

		await act(async () => {
			await userEvent.type(screen.getByRole("input-email"), "user@email.com");
			await userEvent.type(screen.getByRole("input-password"), "123123123");
			fireEvent.click(screen.getByRole("login-btn"));
		});

		expect(vi.mocked(setCookies)).toHaveBeenCalledWith("token", token);
	});

	it("set wordList in localStorage", async () => {
		const setItem = vi.spyOn(Storage.prototype, "setItem");
		const token = "a0s9d87f1ç3l24kas0d89f67lk1234j5has9d78f6";
		const owner = "user@hotmail.com";
		const storageName = "wordList";
		const storageValue = JSON.stringify({ owner });

		vi.mocked(queriesUser).login.mockReturnValueOnce({ token } as unknown as Promise<unknown>);

		await act(async () => {
			await userEvent.type(screen.getByRole("input-email"), owner);
			await userEvent.type(screen.getByRole("input-password"), "123123123");
			fireEvent.click(screen.getByRole("login-btn"));
		});

		expect(setItem).toHaveBeenCalledWith(storageName, storageValue);
	});

	it("focus on the email input when open", () => {
		const input = screen.getByRole("input-email") as HTMLInputElement;
		expect(input === document.activeElement).toBe(true);
	});
});
