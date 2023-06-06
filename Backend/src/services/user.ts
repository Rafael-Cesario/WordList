import { GraphQLError } from "graphql";
import { ICreateUser, IFindOneUser, RCreateUser, RFindOneUser } from "../interfaces/user";
import { UserModel } from "../models/user";

export class ServiceUser {
	async findOneUser({ email }: IFindOneUser): Promise<RFindOneUser> {
		if (!email) throw new GraphQLError("Email was not provided");

		const user = await UserModel.findOne({ email });
		if (!user) return { message: "User not found" };

		return { user: { email: user.email, password: "" } };
	}

	createUser(createUser: ICreateUser): RCreateUser {
		console.log({ createUser });

		return { message: "Hello" };
	}
}
