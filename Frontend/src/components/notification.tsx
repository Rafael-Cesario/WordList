"use client";

import { NotificationContext } from "@/context/notification";
import { StyledNotification } from "@/styles/notificationStyle";
import { useContext } from "react";

export const Notification = () => {
	const { notificationValues, setNotificationValues } = useContext(NotificationContext);

	if (!notificationValues.isOpen) return <></>;

	return (
		<StyledNotification role="notification" type={notificationValues.type}>
			<button onClick={() => setNotificationValues({ ...notificationValues, isOpen: false })} className="close">
				x
			</button>
			<h1 className="title">{notificationValues.title}</h1>
			<p className="description">{notificationValues.message}</p>
		</StyledNotification>
	);
};
