import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as QueriesWords from "@/hooks/useQueriesWords";
import WordListPage from "@/app/[list]/wordlist/page";
import { StorageKeys } from "@/services/interfaces/storage";
import { renderWithProviders } from "@/utils/tests/renderWithProviders";
import { wordListDataMock } from "@/utils/tests/wordListDataMock";
import { screen } from "@testing-library/dom";
import { WordListData } from "@/services/interfaces/list";

describe("WordsContainer", () => {
	const user = userEvent.setup();
	const mockedQueriesWords = QueriesWords as { useQueriesWords: object };

	let error = "";

	mockedQueriesWords.useQueriesWords = () => ({
		requestUpdateWords: () => ({ error }),
	});

	beforeAll(() => {
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListDataMock));
	});

	beforeEach(async () => {
		error = "";
		await renderWithProviders(<WordListPage />);
	});

	it("Show button to save changes", async () => {
		const newWord = "Edited word";
		await user.clear(screen.getAllByRole("input-term")[0]);
		await user.type(screen.getAllByRole("input-term")[0], newWord);
		expect(screen.getByRole("save-changes")).toBeInTheDocument();
		expect(screen.getAllByRole("input-term")[0]).toHaveValue(newWord);
	});

	it("Save words", async () => {
		const newWord = "Edited word";
		await user.clear(screen.getAllByRole("input-term")[0]);
		await user.type(screen.getAllByRole("input-term")[0], newWord);
		await user.click(screen.getByRole("save-changes"));

		const storage = sessionStorage.getItem(StorageKeys.wordList);
		const data = JSON.parse(storage || "") as WordListData;

		expect(data.words[0].term).toBe(newWord);
		expect(screen.queryByRole("save-changes")).not.toBeInTheDocument();
		expect(screen.getByRole("notification").querySelector(".title")).toHaveTextContent("Alterações salvas");
		expect(screen.getAllByRole("input-term")[0]).toHaveValue(newWord);
	});

	it.todo("Show a notification due to response error");
});
