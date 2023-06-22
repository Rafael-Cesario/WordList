import { IUser } from "../../interfaces/user";
import { UserQueries } from "./queries/user";

export const createUser = async (url: string) => {
	const userQueries = new UserQueries();
	const email = "user@test.com";
	await userQueries.createUser(url, { createUser: { email, password: "Password123" } });
	const { data } = await userQueries.findOneUser(url, { email });
	return data!.user as IUser;
};
