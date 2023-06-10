"use client";

import { useState } from "react";
import { CreateAccount } from "./createAccount";
import { StyledAuthentication } from "./styles/authenticationStyle";
import { Login } from "./login";

const Authentication = () => {
	const [formName, setFormName] = useState<"login" | "create">("login");

	return (
		<StyledAuthentication>
			{formName === "login" && <Login props={{ setFormName }} />}
			{formName === "create" && <CreateAccount props={{ setFormName }} />}

			<div className="wordList">
				<h1 className="title">WordList</h1>
			</div>
		</StyledAuthentication>
	);
};

export default Authentication;
