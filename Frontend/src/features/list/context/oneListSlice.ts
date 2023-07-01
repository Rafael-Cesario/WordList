import { ListGlobalState } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { list: ListGlobalState } = {
	list: {
		_id: "",
		userID: "",
		name: "",
		wordsPerWordList: 20,
		timesUntilLearning: 20,
		words: [],
	},
};

export const oneListSlice = createSlice({
	name: "oneList",
	initialState,

	reducers: {
		onListLoad: (state, action: { payload: { list: ListGlobalState } }) => {
			state.list = action.payload.list;
		},
	},
});

export const { onListLoad } = oneListSlice.actions;
