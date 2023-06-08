import request from "supertest-graphql";
import gql from "graphql-tag";
import { ICreateUser, RCreateUser } from "../../interfaces/user";

export class UserQueries {
	private CREATE_USER = gql`
		mutation CreateUser($createUser: ICreateUser) {
			createUser(createUser: $createUser) {
				message
			}
		}
	`;

	async createUser(url: string, { createUser }: ICreateUser) {
		const { data, errors } = await request<{ createUser: RCreateUser }>(url).mutate(this.CREATE_USER).variables({ createUser });
		return { data: data?.createUser, error: errors?.[0].message };
	}
}
