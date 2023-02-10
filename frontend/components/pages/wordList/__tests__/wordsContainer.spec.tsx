import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { WordsContainer } from "../wordsContainer";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { ContextWords } from "../context/contextWords";

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

describe("Words container", () => {
	test("Show words on the page", () => {
		renderWordsContainer([["word01", "word0101"]]);
		expect(screen.getByPlaceholderText("word01")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("word0101")).toBeInTheDocument();
	});

	test("Show message when there is no words", () => {
		renderWordsContainer([]);
		expect(screen.getByText("Suas palavras aparecerão aqui")).toBeInTheDocument();
	});

	test("Show and hide options menu", async () => {
		renderWordsContainer([["word01", "word0101"]]);
		const inputWord = screen.getByPlaceholderText("word01");

		inputWord.focus();
		await waitFor(async () => await screen.findByText("Salvar"));
		expect(screen.getByText("Salvar")).toBeInTheDocument();
		expect(screen.getByText("Excluir")).toBeInTheDocument();

		inputWord.blur();
		await waitForElementToBeRemoved(() => screen.queryByText("Salvar"));
		expect(screen.queryByText("Salvar")).not.toBeInTheDocument();
		expect(screen.queryByText("Excluir")).not.toBeInTheDocument();
	});
});
