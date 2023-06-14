"use client";

import { StyledNotification } from "@/styles/notificationStyle";

export const Notification = () => {
	return (
		<StyledNotification>
			<button className="close">x</button>
			<h1 className="title">Novo usuário criado</h1>
			<p className="description">Boas vindas, você já pode fazer login.</p>
		</StyledNotification>
	);
};
