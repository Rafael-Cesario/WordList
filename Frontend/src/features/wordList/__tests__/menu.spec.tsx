import * as QueriesWords from "@/hooks/useQueriesWords";
import WordListPage from "@/app/[list]/wordlist/page";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { cleanup, screen } from "@testing-library/react";
import { StorageKeys } from "@/services/interfaces/storage";
import { WordListData } from "@/services/interfaces/list";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";

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
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListDataMock));
		await renderWithProviders(<WordListPage />);
	});

	afterEach(() => cleanup());

	it("Saves how the user wants to answer", async () => {
		let data = getStorage();
		expect(data.answerWith).toBe("term");
		await user.click(screen.getByRole("answer-with"));
		data = getStorage();
		expect(data.answerWith).toBe("definitions");
	});

	it("Search for words", async () => {
		expect(screen.queryAllByRole("group-words")).toHaveLength(4);

		await user.type(screen.getByRole("search-input"), "Hello");
		expect(screen.queryAllByRole("group-words")).toHaveLength(0);

		await user.clear(screen.getByRole("search-input"));
		await user.type(screen.getByRole("search-input"), "02");
		expect(screen.queryAllByRole("group-words")).toHaveLength(1);

		await user.clear(screen.getByRole("search-input"));
		await user.type(screen.getByRole("search-input"), "term");
		expect(screen.queryAllByRole("group-words")).toHaveLength(4);

		await user.clear(screen.getByRole("search-input"));
		await user.type(screen.getByRole("search-input"), "def02");
		expect(screen.queryAllByRole("group-words")).toHaveLength(1);
	});
});
