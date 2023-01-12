/* eslint-disable @typescript-eslint/no-explicit-any */
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
	data?: { [key: string]: any };
	error?: string | string[];
}
