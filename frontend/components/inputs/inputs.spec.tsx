import { describe, expect, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { TextInput } from "./inputs";

describe("Inputs component", () => {
	it("set new values on change", () => {
		const newValue = "newValue";
		const name = "test";

		const setValues = vi.fn();
		render(<TextInput props={{ content: "Testing", name, setValues, values: {} }} />);

		act(() => fireEvent.change(screen.getByRole("input-test"), { target: { value: newValue } }));

		expect(setValues).toHaveBeenCalledWith({ [name]: newValue });
	});
});
