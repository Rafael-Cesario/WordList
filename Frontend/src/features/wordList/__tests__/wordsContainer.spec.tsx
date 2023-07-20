import * as QueriesWords from "@/hooks/useQueriesWords";
import WordListPage from "@/app/[list]/wordlist/page";
import { StorageKeys } from "@/services/interfaces/storage";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";

describe("WordsContainer", () => {
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

    it.todo("Rename word", async () => {
        // set have words changes to true
        // update state to show new word on the page
    });

    it.todo("Save words", async () => {
        // update local Storage
        // set have words changed
        // send a notification
    });

    it.todo("Show a notification due to response error");
});
