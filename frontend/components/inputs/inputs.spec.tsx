import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { TextInput } from "./inputs";

describe("Inputs component", () => {
	const content = "Test";
	const name = "test-input";
	let values: { [key: string]: string } = {};

	const setValues = (newValues: { [key: string]: string }) => {
		values = newValues;
	};

	test("Text input set new values onChange", () => {
		render(
			<TextInput
				props={{
					content,
					name,
					values,
					setValues,
				}}
			/>
		);

		const input = screen.getByPlaceholderText("Test") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "test value" } });
		expect(values["test-input"]).toBe("test value");
	});
});
