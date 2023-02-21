import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Perfil } from "../perfil";

vi.mock("next/router", () => ({
	useRouter() {
		return {
			query: "list01",
		};
	},
}));

describe("Perfil", () => {
	it("open and close perfil menu", async () => {
		render(<Perfil />);
		act(() => fireEvent.click(screen.getByRole("btn-open-perfil")));
		expect(await screen.findByRole("perfil-buttons")).toBeInTheDocument();
	});
});
