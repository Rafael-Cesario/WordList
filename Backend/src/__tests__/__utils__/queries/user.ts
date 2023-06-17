import request from "supertest-graphql";
import gql from "graphql-tag";
import { ICreateUser, IFindOneUser, ILogin, RCreateUser, RFindOneUser, RLogin } from "../../../interfaces/user";

export class UserQueries {
	private FIND_ONE_USER = gql`
		query FindOneUser($email: String) {
			findOneUser(email: $email) {
				message
				user {
					email
					password
					ID
				}
			}
		}
	`;

	private CREATE_USER = gql`
		mutation CreateUser($createUser: ICreateUser) {
			createUser(createUser: $createUser) {
				message
			}
		}
	`;

	private LOGIN = gql`
		mutation Login($login: ILogin) {
			login(login: $login) {
				token
				message
				ID
			}
		}
	`;

	async findOneUser(url: string, { email }: IFindOneUser) {
		const { data, errors } = await request<{ findOneUser: RFindOneUser }>(url).query(this.FIND_ONE_USER).variables({ email });
		return { data: data?.findOneUser, error: errors?.[0].message };
	}

	async createUser(url: string, { createUser }: ICreateUser) {
		const { data, errors } = await request<{ createUser: RCreateUser }>(url).mutate(this.CREATE_USER).variables({ createUser });
		return { data: data?.createUser, error: errors?.[0].message };
	}

	async login(url: string, { login }: ILogin) {
		const { data, errors } = await request<{ login: RLogin }>(url).mutate(this.LOGIN).variables({ login });
		return { data: data?.login, error: errors?.[0].message };
	}
}
