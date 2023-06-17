import { cookies } from "next/headers";

export const getUser = () => {
	const cookieStore = cookies();
	const userCookies = cookieStore.get("user");

	if (!userCookies) return false;

	const values = JSON.parse(userCookies.value);

	// const token: string = values.token;
	// todo > verify if token is valid

	return values;
};
