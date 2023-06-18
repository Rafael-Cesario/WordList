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
