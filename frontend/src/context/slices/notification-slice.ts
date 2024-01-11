import { createSlice } from "@reduxjs/toolkit";

interface INotificationSlice {
	isOpen: boolean;
	type: "success" | "error";
	title: string;
	message: string;
}

const initialState: INotificationSlice = {
	isOpen: false,
	type: "success",
	title: "",
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,

	reducers: {
		setNotificationSuccess(
			state,
			action: { payload: { title?: string; message: string } }
		) {
			const { title, message } = action.payload;
			state.isOpen = true;
			state.type = "success";
			state.title = title || "Sucesso";
			state.message = message;
		},

		setNotificationError(
			state,
			action: { payload: { title?: string; message: string } }
		) {
			const { title, message } = action.payload;
			state.isOpen = true;
			state.type = "error";
			state.title = title || "Erro";
			state.message = message;
		},

		setNotificationClose(state) {
			state.isOpen = false;
		},
	},
});
