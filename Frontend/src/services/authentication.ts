import { cookies } from "next/headers";

export const authenticationUser = () => {
	const cookieStore = cookies();
	const userCookies = cookieStore.get("user");

	if (!userCookies) return false;

	// const values = JSON.parse(userCookies.value) as UserCookies;
	// const token = values.token;
	// todo > Validate token
	// if invalidToken return false

	return true;
};
