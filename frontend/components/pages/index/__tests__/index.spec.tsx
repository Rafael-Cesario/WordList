import "@testing-library/jest-dom";
import { beforeEach, describe, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import Index from "../../../../pages/index";

vi.mock("next/router", () => ({
	useRouter() {
		return {};
	},
}));

describe("Index Page", () => {
	beforeEach(() => {
		cleanup();
		render(<Index />);
	});

	it("Show and hide the login form", () => {
		act(() => fireEvent.click(screen.getByRole("open-login")));
		expect(screen.getByRole("form-title").textContent).toBe("Login");
		act(() => fireEvent.click(screen.getByRole("open-login")));
		expect(screen.queryByRole("form-title")).not.toBeInTheDocument();
	});

	it("Show and hide the createAccount form", () => {
		act(() => fireEvent.click(screen.getByRole("open-create-account")));
		expect(screen.getByRole("form-title").textContent).toBe("Criar conta");
		act(() => fireEvent.click(screen.getByRole("open-create-account")));
		expect(screen.queryByRole("form-title")).not.toBeInTheDocument();
	});

	it("Alternate between forms", () => {
		act(() => fireEvent.click(screen.getByRole("open-login")));
		expect(screen.getByRole("form-title").textContent).toBe("Login");
		act(() => fireEvent.click(screen.getByRole("open-create-account")));
		expect(screen.getByRole("form-title").textContent).toBe("Criar conta");
	});
});
