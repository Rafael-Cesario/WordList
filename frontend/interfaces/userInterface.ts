export interface UserInterface {
	email: string;
	name: string;
	password: string;
}

export interface LoginInterface {
	email: string;
	password: string;
}

export interface ResponseInterface {
	data?: unknown;
	error?: unknown;
}
