import { listSlice } from "@/features/home/context/listSlice";
import { oneListSlice } from "@/features/list/context/wordSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		lists: listSlice.reducer,
		oneList: oneListSlice.reducer,
	},
});

export type StoreType = ReturnType<typeof store.getState>;
