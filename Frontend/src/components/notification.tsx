"use client";

import { NotificationContext } from "@/context/notification";
import { StyledNotification } from "@/styles/notificationStyle";
import { useContext } from "react";

export const Notification = () => {
	const { notificationValues, setNotificationValues } = useContext(NotificationContext);

	if (!notificationValues.isOpen) return <></>;

	return (
		<StyledNotification>
			<button onClick={() => setNotificationValues({ ...notificationValues, isOpen: false })} className="close">
				x
			</button>
			<h1 className="title">Novo usuário criado</h1>
			<p className="description">Boas vindas, você já pode fazer login.</p>
		</StyledNotification>
	);
};
