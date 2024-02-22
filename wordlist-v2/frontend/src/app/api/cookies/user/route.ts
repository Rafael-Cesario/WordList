import cookie from "cookie";

export async function POST(request: Request) {
	const data = await request.json();

	const headers = {
		"Set-Cookie": cookie.serialize("user", JSON.stringify(data), {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		}),
	};

	return Response.json({ message: "Success: user cookie set" }, { status: 200, headers });
}
