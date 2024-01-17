"use client";
import { Notification } from "@/components/notification";
import { CreateAccount } from "@/features/authentication/create-account";
import { Login } from "@/features/authentication/login";
import { useState } from "react";

const Authentication = () => {
	const [activeForm, setActiveForm] = useState<"login" | "create">("login");

	return (
		<>
			<Notification />
			{activeForm === "login" && <Login setActiveForm={setActiveForm} />}
			{activeForm === "create" && <CreateAccount setActiveForm={setActiveForm} />}
		</>
	);
};

export default Authentication;
