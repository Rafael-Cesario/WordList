export interface IErrorsCode {
	default: string;

	user: {
		duplicated: string;
		invalidCredentials: string;
	};
}

export const customErrors = {
	user: {
		invalidCredentials: "invalidCredentials: Email/password is wrong."
	}
}
