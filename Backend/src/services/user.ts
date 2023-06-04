import { ICreateUser, IOneUser, IUser, RCreateUser } from "../interfaces/user";

export class ServiceUser {
	findOneUser({ email }: IOneUser): IUser {
		console.log({ email });

		return {
			email: "",
			password: "",
		};
	}

	createUser(createUser: ICreateUser): RCreateUser {
		console.log({ createUser });

		return { message: "Hello" };
	}
}
