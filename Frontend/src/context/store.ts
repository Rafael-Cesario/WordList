import { listSlice } from "@/features/home/context/listSlice";
import { oneListSlice } from "@/features/list/context/oneListSlice";
import { searchSlice } from "@/features/wordList/context/searchSlice";
import { wordListSlice } from "@/features/wordList/context/wordListSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		lists: listSlice.reducer,
		oneList: oneListSlice.reducer,
		wordList: wordListSlice.reducer,
		search: searchSlice.reducer,
	},
});

export type StoreType = ReturnType<typeof store.getState>;
