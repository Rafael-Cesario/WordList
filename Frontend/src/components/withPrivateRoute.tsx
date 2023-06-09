import Authentication from "@/app/authentication/page";
import { NextComponentType } from "next";
import { cookies } from "next/headers";

export const withPrivateRoute = <T extends JSX.IntrinsicAttributes>(Component: NextComponentType<T>) => {
	const Auth = (props: T) => {
		const cookieStore = cookies();
		const userCookies = cookieStore.get("user");

		if (!userCookies) return <Authentication />;

		// todo > query to validate the token

		return <Component {...props} />;
	};

	return Auth;
};
