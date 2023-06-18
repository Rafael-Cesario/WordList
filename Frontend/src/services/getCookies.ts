import { UserCookies } from "./interfaces/cookies";

export const getCookie = async (key: string) => {
	const response = await fetch(`/api/cookies/${key}`);
	const data = (await response.json()) as { name: string; value: string };
	const cookies = JSON.parse(data.value) as UserCookies;
	return cookies;
};
