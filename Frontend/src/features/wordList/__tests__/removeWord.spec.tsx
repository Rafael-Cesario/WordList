import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import WordListPage from "@/app/[list]/wordlist/page";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { act, cleanup, screen, waitFor } from "@testing-library/react";
import { StorageKeys } from "@/services/interfaces/storage";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";

import * as QueriesWords from "@/hooks/useQueriesWords";
const mockedQueriesWords = QueriesWords as { useQueriesWords: object };

describe("WordList - Remove word", () => {
	const user = userEvent.setup();
	let error = "";

	mockedQueriesWords.useQueriesWords = () => ({
		requestRemoveWord: () => ({ error }),
		// requestUpdateWords: vi.fn(),
	});

	beforeAll(() => {
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListDataMock));
	});

	beforeEach(async () => {
		await renderWithProviders(<WordListPage />);
	});

	afterEach(() => {
		error = "";
		cleanup();
	});

	it("Show and hide delete button", async () => {
		await user.click(screen.getAllByRole("remove-word")[0]);
		const removeWordButton = screen.getByRole("remove-word-confirm");
		expect(removeWordButton).toBeInTheDocument();
		act(() => removeWordButton.blur());
		expect(screen.queryByRole("remove-word-confirm")).not.toBeInTheDocument();
	});

	it.only("Show error notification due to request error", async () => {
		error = "Response error";
		await user.click(screen.getAllByRole("remove-word")[0]);
		await user.click(screen.getByRole("remove-word-confirm"));
		const notification = screen.getByRole("notification").querySelector(".description");
		expect(notification).toHaveTextContent(error);
	});

	it.todo("Remove one word form the list", () => {
		// update the words state
		// change back delete button
		// show a notification
	});
});
