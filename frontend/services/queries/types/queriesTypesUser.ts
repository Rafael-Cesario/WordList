import { gql } from "@apollo/client";

export const READ_USER = gql`
	query ReadUser($email: String!) {
		readUser(email: $email) {
			message
			user {
				email
				name
				password
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($user: LoginInput!) {
		login(user: $user) {
			message
			token
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($user: UserInput!) {
		createUser(user: $user) {
			message
			user {
				email
				name
				password
			}
		}
	}
`;
