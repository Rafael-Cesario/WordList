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