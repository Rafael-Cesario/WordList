import { describe, test, expect, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContextWords } from "../context/contextWords";
import { WordsContainer } from "../wordsContainer";

const renameWords = vi.fn();

const renderWordsContainer = (words: string[][]) => {
	render(
		<ContextWords.Provider
			value={{
				words,
				renameWords,
				addWords: vi.fn(),
				removeWords: vi.fn(),
			}}>
			<WordsContainer />
		</ContextWords.Provider>
	);
};

describe("Options", () => {
	test("Rename words args", async () => {
		renderWordsContainer([["word01", "word0101"]]);
		const inputWord = screen.getByPlaceholderText("word01");

		inputWord.focus();
		await waitFor(async () => await screen.findByText("Salvar"));

		await act(async () => {
			fireEvent.click(screen.getByText("Salvar"));
		});

		console.log(renameWords);
	});
});
