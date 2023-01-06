import { GraphQLError } from 'graphql';
import { UserModel } from '../models/userModel';
import { UserType } from '../schemas/types/userType';


export class UserRepository{
	async createUser(user: UserType) {
		try {
			await UserModel.create(user);
		} catch (error: any) {
			throw new GraphQLError('Create User: ' + error.message);
		}
	}

	async findByEmail(email: string) {
		try {
			const user = await UserModel.findOne({ email }) as UserType;
			return user;
		} catch (error: any) {
			throw new GraphQLError('Find User: ' + error.message);
		}
	}
}

export const userRepository = new UserRepository();
