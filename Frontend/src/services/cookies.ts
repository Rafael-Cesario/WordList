"use server";

import { cookies } from "next/headers";

export const createCookie = (name: string, data: object, expires: Date) => {
	const value = JSON.stringify(data);

	cookies().set({
		name,
		value,
		expires,
		httpOnly: true,
	});
};
