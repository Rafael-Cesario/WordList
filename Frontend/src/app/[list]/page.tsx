import { Header } from "@/features/list/header";
import { CookiesKeys, ListCookies } from "@/services/interfaces/cookies";
import { cookies } from "next/headers";

const List = () => {
	const cookieKey: CookiesKeys = "list";
	const cookieStore = cookies();
	const response = cookieStore.get(cookieKey);
	// todo > link to lists page.
	if (!response) return;
	const list = JSON.parse(response.value) as ListCookies;

	return (
		<>
			<Header listCookies={list} />
		</>
	);
};

export default List;
