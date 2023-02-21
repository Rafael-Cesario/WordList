import { describe, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { PasswordInput, TextInput } from "./inputs";

describe("Inputs component", () => {
	it("set new values on change", () => {
		const newValue = "newValue";
		const name = "test";

		const setValues = vi.fn();
		render(<TextInput props={{ content: "Testing", name, setValues, values: {} }} />);

		act(() => fireEvent.change(screen.getByRole("input-test"), { target: { value: newValue } }));

		expect(setValues).toHaveBeenCalledWith({ [name]: newValue });
	});

	it("show the password", () => {
		const setValues = vi.fn();
		render(<PasswordInput props={{ content: "Testing", name: "test", setValues, values: {} }} />);

		const input = screen.getByRole("input-test") as HTMLInputElement;
		expect(input.type).toBe("password");

		act(() => fireEvent.click(screen.getByRole("show-password")));
		expect(input.type).toBe("text");

		act(() => fireEvent.click(screen.getByRole("show-password")));
		expect(input.type).toBe("password");
	});
});
