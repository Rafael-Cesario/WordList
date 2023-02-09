import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Perfil } from "../perfil";

vi.mock("next/router", () => require("next-router-mock"));
vi.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Perfil component", () => {
	test("Show button to logout", () => {
		render(<Perfil />);
		fireEvent.click(screen.getByRole("button", { name: "Perfil" }));
		expect(screen.getByRole("button", { name: "Sair" })).toBeInTheDocument();
	});
});
