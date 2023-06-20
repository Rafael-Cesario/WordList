import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { lists: IList[] } = {
	lists: [],
};

export const listSlice = createSlice({
	name: "list",
	initialState,

	reducers: {
		createList: (state, action: { payload: { list: IList } }) => {
			state.lists.push(action.payload.list);
		},

		loadLists: (state, action: { payload: { lists: IList[] } }) => {
			state.lists = action.payload.lists;
		},
	},
});
