import userEvent from "@testing-library/user-event";
import { groupWords } from "../utils/groupWords";
import { renderWithProviders } from "@/utils/renderWithProviders";
import { WordsGroup } from "../wordsGroup";
import { IWord } from "@/services/interfaces/words";
import { screen } from "@testing-library/dom";
import { StorageKeys } from "@/services/interfaces/storage";
import { WordListData } from "@/services/interfaces/list";

describe("Words group component", () => {
	const user = userEvent.setup();

	beforeAll(async () => {
		const words: IWord[] = [
			{ term: "dummyWord-01", definitions: "olá", correctTimes: 0, learned: false },
			{ term: "dummyWord-02", definitions: "olá", correctTimes: 0, learned: false },
			{ term: "dummyWord-03", definitions: "olá", correctTimes: 0, learned: false },
			{ term: "dummyWord-04", definitions: "olá", correctTimes: 0, learned: false },
		];

		const { notLearned } = groupWords(words, 1, 999);
		await renderWithProviders(<WordsGroup title="Estudando" words={notLearned} />);
	});

	it("Save the current group data into sessionStorage", async () => {
		let groupIndex = 1;
		await user.click(screen.getAllByRole("words-group")[groupIndex]);

		let storage = sessionStorage.getItem(StorageKeys.wordList);
		expect(storage).toBeDefined();

		let data = JSON.parse(storage || "") as WordListData;
		expect(data.groupIndex).toBe(groupIndex);

		groupIndex = 2;
		await user.click(screen.getAllByRole("words-group")[groupIndex]);

		storage = sessionStorage.getItem(StorageKeys.wordList);
		expect(storage).toBeDefined();

		data = JSON.parse(storage || "") as WordListData;
		expect(data.groupIndex).toBe(groupIndex);
	});
});
