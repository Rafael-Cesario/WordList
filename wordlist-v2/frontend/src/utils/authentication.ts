import { IUserCookies, KeysCookies } from "@/services/interfaces/cookies";
import { cookies } from "next/headers";

export const authenticateUser = () => {
	const store = cookies();

	const userCookies = store.get(KeysCookies.USER);
	if (!userCookies) return false;

	const values: IUserCookies = JSON.parse(userCookies.value);
	if (!values.token) return false;

	return true;
};
