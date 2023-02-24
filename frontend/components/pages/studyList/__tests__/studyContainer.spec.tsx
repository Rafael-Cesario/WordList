import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, vi, test } from "vitest";
import { StudyContainer } from "../studyContainer";

describe("studyContainer", () => {
	beforeEach(() => {
		const setHaveListEnd = vi.fn();
		render(
			<StudyContainer
				props={{
					words: [
						["word", "word"],
						["word01", "answer01"],
					],
					setHaveListEnd,
				}}
			/>
		);
	});

	it("hide the answer", () => {
		expect(screen.getByRole("answer").className).toMatch("hide");
	});

	it("show how many words until the end of list", () => {
		expect(screen.getByRole("words-left").textContent).toMatch(/2 palavras/);
	});

	it("show the answer when user confirm", () => {
		fireEvent.click(screen.getByRole("confirm"));
		expect(screen.getByRole("answer").className).not.toMatch(/hide/);
	});

	describe("give a class according to the answer", () => {
		test("right answer", async () => {
			await userEvent.type(screen.getByRole("input-answer"), "word");
			fireEvent.click(screen.getByRole("confirm"));
			expect(screen.getByRole("answer").className).toMatch(/right/);
		});

		test("wrong answer", async () => {
			await userEvent.type(screen.getByRole("input-answer"), "wrongAnswer");
			fireEvent.click(screen.getByRole("confirm"));
			expect(screen.getByRole("answer").className).toMatch(/wrong/);
		});
	});

	describe("go to the next word", () => {
		test("when answer is wrong", async () => {
			await userEvent.type(screen.getByRole("input-answer"), "wrongAnswer");
			fireEvent.click(screen.getByRole("confirm"));
			fireEvent.click(screen.getByRole("confirm"));
			expect(screen.getByRole("answer").className).toMatch(/hide/);
			expect(screen.getByRole("answer").textContent).toBe("answer01");
			expect(screen.getByRole("question").textContent).toBe("word01");
			expect(screen.getByRole("words-left").textContent).toMatch(/2 palavras/);
		});

		test("when answer is right", async () => {
			await userEvent.type(screen.getByRole("input-answer"), "word");
			fireEvent.click(screen.getByRole("confirm"));
			fireEvent.click(screen.getByRole("confirm"));
			expect(screen.getByRole("answer").className).toMatch(/hide/);
			expect(screen.getByRole("answer").textContent).toBe("answer01");
			expect(screen.getByRole("question").textContent).toBe("word01");
			expect(screen.getByRole("words-left").textContent).toMatch(/1 palavra/);
		});
	});

	it("force answer to be right", async () => {
		await userEvent.type(screen.getByRole("input-answer"), "wrongAnswer");
		expect(screen.queryByRole("force-right")).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("confirm"));
		expect(screen.queryByRole("force-right")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("force-right"));
		expect(screen.getByRole("answer").textContent).toBe("answer01");
		expect(screen.getByRole("question").textContent).toBe("word01");
		expect(screen.getByRole("answer").className).toMatch(/hide/);
		expect(screen.getByRole("words-left").textContent).toMatch(/1 palavra/);
	});
});
