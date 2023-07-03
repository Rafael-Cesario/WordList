import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchValue: "",
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearch: (state, action: { payload: { newSearchValue: string } }) => {
			state.searchValue = action.payload.newSearchValue;
		},
	},
});

export const { setSearch } = searchSlice.actions;
