import { ICreateUser, RCreateUser } from "../interfaces/user";

export class ServiceUser {
	createUser(createUser: ICreateUser): RCreateUser {
		console.log({ createUser });

		return { message: "Hello" };
	}
}
