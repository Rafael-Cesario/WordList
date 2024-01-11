import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {},
});

export type Store = ReturnType<typeof store.getState>;
