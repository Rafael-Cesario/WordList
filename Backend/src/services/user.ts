import { ICreateUser, RCreateUser } from "../schemas/interfaces/user";

export class ServiceUser {
	createUser(createUser: ICreateUser): RCreateUser {
		console.log({ createUser });

		return { message: "Hello" };
	}
}
