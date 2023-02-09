import { setCookies } from "../services/cookies";

export const saveCookies = async (
	cookies: { [key: string]: string },
	thisSetCookies: (key: string, value: string) => Promise<string> = setCookies
) => {
	const entries = Object.entries(cookies);

	entries.forEach(async ([key, value]) => {
		await thisSetCookies(key, value);
	});
};
