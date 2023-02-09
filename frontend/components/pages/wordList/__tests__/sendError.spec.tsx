import { describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { sendError } from "../utils/sendError";

const TestComponent = () => {
	return (
		<div className='test'>
			<label htmlFor='my-input' title={"label-test"}>
				LabelTest
			</label>
			<input type='text' id='my-input' />
		</div>
	);
};

describe("Send Error", () => {
	beforeEach(() => vi.useFakeTimers());

	test("change class and add text to label", () => {
		render(<TestComponent />);

		sendError("test", "This is a error message");

		const label = screen.getByTitle("label-test");
		expect(label.className).toMatch(/error/i);
		expect(label.textContent).toBe("This is a error message");

		vi.runAllTimers();

		expect(label.className).toMatch("");
		expect(label.textContent).toBe("LabelTest");
	});
});
