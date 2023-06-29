import { Header } from "@/features/list/header";
import { CookiesKeys, ListCookies } from "@/services/interfaces/cookies";
import { cookies } from "next/headers";
import Link from "next/link";

const List = () => {
	const cookieKey: CookiesKeys = "list";
	const cookieStore = cookies();
	const response = cookieStore.get(cookieKey);
	if (!response) return <Link href={"/"}>Ops, recarregue a página e tente novamente</Link>;
	const list = JSON.parse(response.value) as ListCookies;

	return (
		<>
			<Header listCookies={list} />
		</>
	);
};

export default List;
