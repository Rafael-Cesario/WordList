import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContextWords } from "../context/contextWords";
import { WordsContainer } from "../wordsContainer";

const renameWords = vi.fn();
const removeWords = vi.fn();

const renderWordsContainer = (words: string[][]) => {
	render(
		<ContextWords.Provider
			value={{
				words,
				renameWords,
				removeWords,
				addWords: vi.fn(),
			}}>
			<WordsContainer />
		</ContextWords.Provider>
	);
};

describe("Options", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	test("Try to save without changes", async () => {
		renderWordsContainer([["word01", "word0101"]]);
		const inputWord = screen.getByPlaceholderText("word01");

		inputWord.focus();
		await waitFor(async () => await screen.findByText("Salvar"));

		await act(async () => {
			fireEvent.click(screen.getByText("Salvar"));
		});

		expect(renameWords).toHaveBeenCalledWith("0", { term: "", definition: "" });
	});

	test("Save Args", async () => {
		renderWordsContainer([["word01", "word0101"]]);
		const inputWord = screen.getByPlaceholderText("word01");

		inputWord.focus();
		await waitFor(async () => await screen.findByText("Salvar"));

		await act(async () => {
			await userEvent.clear(inputWord);
			await userEvent.type(inputWord, "New word");
			fireEvent.click(screen.getByText("Salvar"));
		});

		expect(renameWords).toHaveBeenCalledWith("0", { term: "New word", definition: "" });
	});

	test("Delete word", async () => {
		renderWordsContainer([
			["word01", "word0101"],
			["word02", "word0202"],
		]);

		const inputWord = screen.getByPlaceholderText("word02");
		inputWord.focus();
		await waitFor(async () => await screen.findByText("Excluir"));

		act(() => {
			fireEvent.click(screen.getByText("Excluir"));
		});

		expect(removeWords).toHaveBeenCalledWith("1");
	});
});
