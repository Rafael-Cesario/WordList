import gql from "graphql-tag";

class UserQueries {
	CREATE_USER = gql`
		mutation CreateUser($createUserData: CreateUserInput!) {
			createUser(createUserData: $createUserData)
		}
	`;
}

export const userQueries = new UserQueries();
