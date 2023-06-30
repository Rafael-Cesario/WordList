import { IWord } from "@/services/interfaces/words";
import { createSlice } from "@reduxjs/toolkit";

interface WordSlice {
	listName: string;
	words: IWord[];
}

const initialState: WordSlice = {
	listName: "",
	words: [],
};

export const wordSlice = createSlice({
	name: "words",
	initialState,

	reducers: {
		loadWords: (state, action: { payload: { words: IWord[]; listName: string } }) => {
			state.words = action.payload.words;
			state.listName = action.payload.listName;
		},

		addWords: (state, action: { payload: { words: IWord[] } }) => {
			state.words.push(...action.payload.words);
		},
	},
});
