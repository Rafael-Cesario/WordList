import { GraphQLError } from "graphql";
import { ICreateUser, IFindOneUser, ILogin, RCreateUser, RFindOneUser } from "../interfaces/user";
import { UserModel } from "../models/user";
import { checkData } from "../utils/checkData";
import { decryptPassword } from "../utils/crypt";
import { generateToken } from "../utils/token";
import mongoose from "mongoose";
import { customErrors } from "../interfaces/errors";

export class ServiceUser {
	async findOneUser({ email }: IFindOneUser): Promise<RFindOneUser> {
		if (!email) throw new GraphQLError("Email was not provided");

		const user = await UserModel.findOne({ email });
		if (!user) return { message: "User not found" };

		return { user: { email: user.email, password: "", ID: user._id } };
	}

	async createUser({ createUser }: ICreateUser): Promise<RCreateUser> {
		const { email, password } = createUser;

		const emptyValues = checkData(createUser);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const emailAlreadyExist = await UserModel.findOne({ email });
		if (emailAlreadyExist) throw new GraphQLError("duplicated: This email is already in use.");

		await UserModel.create({ email, password });

		return { message: `New user created with success.` };
	}

	async login({ login }: ILogin) {
		const { email, password } = login;

		const user = await UserModel.findOne({ email });
		if (!user) throw new GraphQLError(customErrors.user.invalidCredentials);

		const isSamePassword = decryptPassword(password, user.password);
		if (!isSamePassword) throw new GraphQLError(customErrors.user.invalidCredentials);

		const token = generateToken(email);
		return { message: "Success", token, ID: user._id };
	}
}
