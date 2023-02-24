import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, vi } from "vitest";
import { useQueriesWordsSWR } from "../../../../utils/hooks/useQueriesWords";
import { WordsContainer } from "../wordsContainer";

// vi.mock("../../../../utils/hooks/useQueriesWordList");
// vi.mock("../../../../utils/hooks/useLists");

vi.mock("../../../../utils/hooks/useQueriesWords", () => ({
	useQueriesWordsSWR: vi.fn(),
}));

describe("Words container", () => {
	afterEach(() => {
		vi.doUnmock("../../../../utils/hooks/useQueriesWords");
		cleanup();
	});

	it("show words on the page", async () => {
		vi.mocked(useQueriesWordsSWR).mockReturnValue({
			words: [
				["word", "word"],
				["word", "word"],
			],
			isLoading: false,
			error: false,
			mutate: vi.fn(),
		});

		render(<WordsContainer />);
		const words = screen.getByRole("words-container").children;
		expect(words.length).toBe(2);
	});

	it("show loading words", () => {
		vi.mocked(useQueriesWordsSWR).mockReturnValue({
			words: [],
			isLoading: true,
			error: false,
			mutate: vi.fn(),
		});

		render(<WordsContainer />);
		expect(screen.getByRole("para").textContent).toMatch(/carregando/i);
	});

	it("show error paragraph", () => {
		vi.mocked(useQueriesWordsSWR).mockReturnValue({
			words: [],
			isLoading: false,
			error: true,
			mutate: vi.fn(),
		});

		render(<WordsContainer />);
		expect(screen.getByRole("para").textContent).toMatch(/um erro ocorreu/i);
	});

	it("show empty words paragraph", () => {
		vi.mocked(useQueriesWordsSWR).mockReturnValue({
			words: [],
			isLoading: false,
			error: false,
			mutate: vi.fn(),
		});

		render(<WordsContainer />);
		expect(screen.getByRole("para").textContent).toBe("Suas palavras aparecerão aqui");
	});

	it("show options", async () => {
		vi.mocked(useQueriesWordsSWR).mockReturnValue({
			words: [
				["word", "word"],
				["word01", "word01"],
			],
			isLoading: false,
			error: false,
			mutate: vi.fn(),
		});

		render(<WordsContainer />);

		fireEvent.focus(screen.getByRole("input-word"));

		await waitFor(async () => {
			const options = await screen.findAllByRole("options");
			expect(options.length).toBe(1);
		});
	});
});
