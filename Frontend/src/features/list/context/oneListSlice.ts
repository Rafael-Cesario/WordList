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

		updateConfigs: (state, action: { payload: { wordsPerWordList: number; timesUntilLearning: number } }) => {
			state.list = {
				...state.list,
				wordsPerWordList: action.payload.wordsPerWordList,
				timesUntilLearning: action.payload.timesUntilLearning,
			};
		},
	},
});

export const { onListLoad } = oneListSlice.actions;
