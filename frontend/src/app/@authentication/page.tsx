"use client";
import { CreateAccount } from "@/features/authentication/create-account";
import { Login } from "@/features/authentication/login";
import { useState } from "react";

const Authentication = () => {
	const [activeForm, setActiveForm] = useState<"login" | "create">("login");

	return (
		<>
			{activeForm === "login" && <Login />}
			{activeForm === "create" && <CreateAccount />}
		</>
	);
};

export default Authentication;
