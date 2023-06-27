/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
"use client";
import { createContext, useState } from "react";

interface INotification {
	title: string;
	message: string;
	type: "success" | "error";
	isOpen: boolean;
}

interface IContext {
	notificationValues: INotification;
	setNotificationValues: (newState: INotification) => void;
}

const defaultValues: INotification = {
	title: "",
	message: "",
	type: "success",
	isOpen: false,
};

const initialValues: IContext = {
	notificationValues: defaultValues,
	setNotificationValues: (newState: INotification) => {},
};

export const NotificationContext = createContext<IContext>(initialValues);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
	const [values, setValues] = useState<INotification>(defaultValues);

	return (
		<NotificationContext.Provider value={{ notificationValues: values, setNotificationValues: setValues }}>{children}</NotificationContext.Provider>
	);
};
