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

		renameList: (state, action: { payload: { ID: string; newName: string } }) => {
			const listIndex = state.lists.findIndex((list) => list._id === action.payload.ID);
			state.lists[listIndex].name = action.payload.newName;
		},
	},
});
