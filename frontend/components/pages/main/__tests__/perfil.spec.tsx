import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Perfil } from "../perfil";
import { deleteCookies } from "../../../../services/cookies";

vi.mock("next/router", () => ({
	useRouter() {
		return {
			query: "list01",
			push: vi.fn(),
		};
	},
}));

vi.mock("../../../../services/cookies", () => {
	return { deleteCookies: vi.fn() };
});

describe("Perfil", () => {
	beforeEach(() => {
		cleanup();
		render(<Perfil />);
	});

	it("open and close perfil menu", async () => {
		act(() => fireEvent.click(screen.getByRole("btn-open-perfil")));
		expect(await screen.findByRole("perfil-buttons")).toBeInTheDocument();
	});

	it("delete the cookie and logout the user", () => {
		act(() => fireEvent.click(screen.getByRole("btn-open-perfil")));
		act(() => fireEvent.click(screen.getByRole("logout-btn")));
		expect(vi.mocked(deleteCookies)).toHaveBeenCalledWith("token");
	});
});
