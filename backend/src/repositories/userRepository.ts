import { GraphQLError } from 'graphql';
import { ICreateUser } from '../interfaces/interfacesUser';
import { UserModel } from '../models/userModel';

export class UserRepository {
	constructor(private userModel: typeof UserModel = UserModel) {}

	async createUser(user: ICreateUser) {
		try {
			await this.userModel.create(user);
		} catch (error: any) {
			throw new GraphQLError('Create User: ' + error.message);
		}
	}

	async findByEmail(email: string) {
		try {
			const user = (await this.userModel.findOne({ email })) as ICreateUser;
			return user;
		} catch (error: any) {
			throw new GraphQLError('Find User: ' + error.message);
		}
	}
}

export const userRepository = new UserRepository();
