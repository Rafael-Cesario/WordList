import gql from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation CreateUser($createUserData: CreateUserInput!) {
			createUser(createUserData: $createUserData)
		}
	`;

	LOGIN = gql`
		mutation Login($loginData: LoginInput!) {
			login(loginData: $loginData) {
				email
				id
				name
				token
			}
		}
	`;
}

export const userQueries = new UserQueries();
