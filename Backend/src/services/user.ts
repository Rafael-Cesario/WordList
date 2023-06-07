import { GraphQLError } from "graphql";
import { ICreateUser, IFindOneUser, RCreateUser, RFindOneUser } from "../interfaces/user";
import { UserModel } from "../models/user";
import { checkData } from "../utils/checkData";

export class ServiceUser {
	// todo > Tests
	async findOneUser({ email }: IFindOneUser): Promise<RFindOneUser> {
		if (!email) throw new GraphQLError("Email was not provided");

		const user = await UserModel.findOne({ email });
		if (!user) return { message: "User not found" };

		return { user: { email: user.email, password: "" } };
	}

	// todo > Tests
	async createUser({ createUser }: ICreateUser): Promise<RCreateUser> {
		const { email, password } = createUser;

		const emptyValues = checkData(createUser);
		if (emptyValues) throw new GraphQLError(emptyValues);

		const emailAlreadyExist = await UserModel.findOne({ email });
		if (emailAlreadyExist) throw new GraphQLError("This email is already in use.");

		await UserModel.create({ email, password });

		return { message: `New user created with success.` };
	}
}
