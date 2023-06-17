"use client";

import { useState } from "react";
import { Login } from "../../features/authentication/login";
import { CreateAccount } from "../../features/authentication/createAccount";

export const AuthenticationForms = () => {
	const [formName, setFormName] = useState<"login" | "create">("login");

	return (
		<>
			{formName === "login" && <Login props={{ setFormName }} />}
			{formName === "create" && <CreateAccount props={{ setFormName }} />}
		</>
	);
};
