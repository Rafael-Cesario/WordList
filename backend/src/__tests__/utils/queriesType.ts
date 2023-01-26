export const READ_USER = `#graphql
	query ReadUser ($email: String!) {
		readUser ( email : $email ) {
			message,
			user {
				email, name, password
			}
		}
	}
`;

export const LOGIN = `#graphql
	mutation Login ($user:LoginInput!) {
		login (user: $user ) {
			message, token
		}
	}
`;

export const CREATE_USER = `#graphql
	mutation CreateUser ($user: UserInput! ) {
		createUser (user: $user) {
			message,
			user {
				email, name, password
			}
		}
	}
`;
