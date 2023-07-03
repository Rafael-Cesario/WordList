import { AnswerWith, WordListData } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

const defaultWordListData: { wordList: WordListData } = {
	wordList: {
		_id: "",
		userID: "",
		groupIndex: 0,
		name: "",
		wordsPerWordList: 10,
		timesUntilLearning: 10,
		answerWith: "definitions",
		words: [],
	},
};

export const wordListSlice = createSlice({
	name: "wordList",
	initialState: defaultWordListData,

	reducers: {
		setWordList: (state, action: { payload: { wordList: WordListData } }) => {
			state.wordList = action.payload.wordList;
		},

		setAnswerWith: (state, action: { payload: { newAnswerWith: AnswerWith } }) => {
			state.wordList.answerWith = action.payload.newAnswerWith;
		},
	},
});

export const { setWordList, setAnswerWith } = wordListSlice.actions;
