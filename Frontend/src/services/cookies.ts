import { SetCookies } from "./interfaces/cookies";

export class Cookies {
	async get<T>(key: string) {
		const response = await fetch(`/api/cookies/${key}`);
		const data = (await response.json()) as { name: string; value: string };
		const cookies = JSON.parse(data.value) as T;
		return cookies;
	}

	async set(key: string, cookies: SetCookies) {
		const response = await fetch(`/api/cookies/${key}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cookies),
		});

		return response;
	}
}
