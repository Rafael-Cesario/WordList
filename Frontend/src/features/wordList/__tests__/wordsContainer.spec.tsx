import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as QueriesWords from "@/hooks/useQueriesWords";
import WordListPage from "@/app/[list]/wordlist/page";
import { StorageKeys } from "@/services/interfaces/storage";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";
import { screen } from "@testing-library/dom";

describe("WordsContainer", () => {
	const user = userEvent.setup();
	const mockedQueriesWords = QueriesWords as { useQueriesWords: object };

	mockedQueriesWords.useQueriesWords = () => ({
		requestUpdateWords: vi.fn(),
	});

	beforeAll(() => {
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListDataMock));
	});

	beforeEach(async () => {
		await renderWithProviders(<WordListPage />);
	});

	it("Show button to save changes", async () => {
        const newWord = "Edited word";
		await user.clear(screen.getAllByRole("input-term")[0]);
		await user.type(screen.getAllByRole("input-term")[0], newWord);
		expect(screen.getByRole("save-changes")).toBeInTheDocument();
		expect(screen.getAllByRole("input-term")[0]).toHaveValue(newWord);
	});

	it.todo("Save words", async () => {
		// update local Storage
		// set have words changed
		// send a notification
	});

	it.todo("Show a notification due to response error");
});
