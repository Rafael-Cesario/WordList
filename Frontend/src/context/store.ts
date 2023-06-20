import { listSlice } from "@/features/home/context/listSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		lists: listSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
