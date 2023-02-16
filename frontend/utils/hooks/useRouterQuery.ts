import { useRouter } from "next/router";

export const useRouterQuery = () => {
	const router = useRouter();
	const link = router.query.listName as string;

	return { link };
};
