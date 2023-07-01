import { ListGlobalState } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ListGlobalState = {
	_id: "",
	userID: "",
	name: "",
	wordsPerWordList: 20,
	timesUntilLearning: 20,
	words: [],
};

export const oneListSlice = createSlice({
	name: "oneList",
	initialState,

	reducers: {
		loadLists: (state, action: { payload: { list: ListGlobalState } }) => {
			state = action.payload.list;
		},
	},
});

export const { loadLists } = oneListSlice.actions;
