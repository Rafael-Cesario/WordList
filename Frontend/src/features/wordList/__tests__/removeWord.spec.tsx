import "@testing-library/jest-dom";
import * as QueriesWords from "@/hooks/useQueriesWords";
import userEvent from "@testing-library/user-event";
import WordListPage from "@/app/[list]/wordlist/page";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { act, cleanup, screen } from "@testing-library/react";
import { StorageKeys } from "@/services/interfaces/storage";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";

const mockedQueriesWords = QueriesWords as { useQueriesWords: object };

describe("WordList - Remove word", () => {
	const user = userEvent.setup();

	mockedQueriesWords.useQueriesWords = () => ({
		requestUpdateWords: vi.fn(),
	});

	beforeAll(async () => {
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListDataMock));
		await renderWithProviders(<WordListPage />);
	});

	afterEach(() => cleanup());

	it("Show and hide delete button", async () => {
		await user.click(screen.getAllByRole("remove-word")[0]);
		const removeWordButton = screen.getByRole("remove-word-confirm");
		expect(removeWordButton).toBeInTheDocument();
		act(() => removeWordButton.blur());
		expect(screen.queryByRole("remove-word-confirm")).not.toBeInTheDocument();
	});

	it.todo("Remove one word from the list", async () => {
		// update the words state
		// change back delete button
		// show a notification
	});
});
