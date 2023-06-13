"use client";

import { StyledAuthentication } from "../../features/authentication/styles/authenticationStyle";
import { AuthenticationForms } from "./authenticationForms";

const Authentication = () => {
	return (
		<StyledAuthentication>
			<AuthenticationForms />

			<div className="wordList">
				<h1 className="title">WordList</h1>
			</div>
		</StyledAuthentication>
	);
};

export default Authentication;
