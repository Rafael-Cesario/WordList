import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Perfil } from "../perfil";

describe("Perfil", () => {
	it("open and close perfil menu", async () => {
		render(<Perfil />);
		act(() => fireEvent.click(screen.getByRole("btn-open-perfil")));
		expect(await screen.findByRole("perfil-buttons")).not.toBeInTheDocument();
	});
});
