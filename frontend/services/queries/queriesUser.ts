/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginInterface, UserInterface } from "../../interfaces/interfaceUser";
import { client } from "../client";
import { CREATE_USER, LOGIN } from "./types/queriesTypesUser";

export class QueriesUser {
	async createUser(user: UserInterface) {
		try {
			const response = await client.mutate({ mutation: CREATE_USER, variables: { user } });
			return response.data.createUser;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async login(user: LoginInterface) {
		try {
			const response = await client.mutate({ mutation: LOGIN, variables: { user } });
			return response.data.login;
		} catch (error: any) {
			return { error: error.message };
		}
	}
}

export const queriesUser = new QueriesUser();
