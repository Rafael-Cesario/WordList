import { gql } from "@apollo/client";

export class QueriesUser {
	FIND_ONE_USER = gql`
		query FindOneUser($email: String) {
			findOneUser(email: $email) {
				message
				user {
					email
					password
				}
			}
		}
	`;

	CREATE_USER = gql`
		mutation CreateUser($createUser: ICreateUser) {
			createUser(createUser: $createUser) {
				message
			}
		}
	`;

	LOGIN = gql`
		mutation Login($login: ILogin) {
			login(login: $login) {
				token
				message
			}
		}
	`;
}
