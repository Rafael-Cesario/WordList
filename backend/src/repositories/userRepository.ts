import { GraphQLError } from 'graphql';
import { UserModel } from '../models/userModel';
import { UserType } from '../schemas/types/userType';

class UserRepository {
	async createUser(user: UserType) {
		try {
			await UserModel.create(user);
		} catch (error: any) {
			throw new GraphQLError('Create User: ' + error.message);
		}
	}
}

export const userRepository = new UserRepository();
