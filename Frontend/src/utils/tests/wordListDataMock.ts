import { WordListData } from "@/services/interfaces/list";

export const wordListDataMock: WordListData = {
	_id: "123",
	userID: "123",
	name: "list01",
	answerWith: "term",
	groupIndex: 1,
	timesUntilLearning: 10,
	wordsPerWordList: 10,
	words: [
		{ term: "term01", definitions: "def01", correctTimes: 0, learned: false },
		{ term: "term02", definitions: "def02", correctTimes: 0, learned: false },
		{ term: "term03", definitions: "def03", correctTimes: 0, learned: false },
		{ term: "term04", definitions: "def04", correctTimes: 0, learned: false },
	],
};
