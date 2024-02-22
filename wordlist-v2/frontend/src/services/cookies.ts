import { IUserCookies } from "./interfaces/cookies";

class UserCookies {
	async set(data: IUserCookies) {
		await fetch("api/cookies/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	}

	
}

export const userCookies = new UserCookies();
