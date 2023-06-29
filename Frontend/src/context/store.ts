import { listSlice } from "@/features/home/context/listSlice";
import { wordSlice } from "@/features/list/context/wordSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		lists: listSlice.reducer,
		words: wordSlice.reducer,
	},
});

export type StoreType = ReturnType<typeof store.getState>;
