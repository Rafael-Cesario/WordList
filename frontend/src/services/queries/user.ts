import { gql } from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation CreateUser($createUserData: CreateUserInput!) {
			createUser(createUserData: $createUserData)
		}
	`;

	LOGIN = gql`
		mutation login($loginData: LoginInput!) {
			login(loginData: $loginData) {
				id
				email
				name
				token
			}
		}
	`;
}

export const userQueries = new UserQueries();
