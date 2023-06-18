import cookie from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Params {
	params: { key: string };
}

export async function GET(_: Request, { params }: Params) {
	const cookieStore = cookies();
	const user = cookieStore.get(params.key);
	return NextResponse.json(user);
}

export async function POST(req: Request) {
	const body = await req.json();

	return new Response("Cookie set", {
		headers: {
			"Set-Cookie": cookie.serialize(body.key, body.value, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				maxAge: body.maxAge,
				sameSite: "strict",
				path: "/",
			}),
		},
	});
}
