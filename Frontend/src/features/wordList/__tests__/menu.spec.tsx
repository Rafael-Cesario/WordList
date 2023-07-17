import WordListPage from "@/app/[list]/wordlist/page";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { cleanup, screen } from "@testing-library/react";
import * as QueriesWords from "@/hooks/useQueriesWords";
import { StorageKeys } from "@/services/interfaces/storage";
import { WordListData } from "@/services/interfaces/list";

const mockedQueriesWords = QueriesWords as { useQueriesWords: object };

describe("WordList - Menu component", () => {
	const user = userEvent.setup();

	mockedQueriesWords.useQueriesWords = () => ({
		requestUpdateWords: vi.fn(),
	});

	const getStorage = () => {
		const storage = sessionStorage.getItem(StorageKeys.wordList);
		return JSON.parse(storage || "") as WordListData;
	};

	beforeAll(async () => {
		const wordList: WordListData = {
			_id: "123",
			userID: "123",
			name: "list01",
			answerWith: "term",
			groupIndex: 1,
			timesUntilLearning: 10,
			wordsPerWordList: 10,
			words: [
				{ term: "term01", definitions: "def01", correctTimes: 0, learned: false },
				{ term: "term01", definitions: "def01", correctTimes: 0, learned: false },
				{ term: "term01", definitions: "def01", correctTimes: 0, learned: false },
				{ term: "term01", definitions: "def01", correctTimes: 0, learned: false },
			],
		};

		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordList));
		await renderWithProviders(<WordListPage />);
	});

	afterEach(() => cleanup());

	it.only("Saves how the user wants to answer", async () => {
		let data = getStorage();
		expect(data.answerWith).toBe("term");
		await user.click(screen.getByRole("answer-with"));
		data = getStorage();
		expect(data.answerWith).toBe("definitions");
	});

	it.todo("Search for words");
});
