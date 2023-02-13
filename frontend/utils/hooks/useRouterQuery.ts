import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useRouterQuery = (initialState: string) => {
	const [listName, setListName] = useState(initialState);
	const [listIndex, setListIndex] = useState("");
	const [listStatus, setListStatus] = useState("");

	const router = useRouter();
	const link = router.query.listName as string;

	const getQueries = () => {
		const queryListName = router.query.listName as string;
		const listName = queryListName.replace(/-/g, " ").replace(/_/g, "-");
		setListName(listName);

		if (!router.query.wordList) return;
		const [queryListStatus, queryListIndex] = (router.query.wordList as string).split("-");
		setListIndex(queryListIndex);
		setListStatus(queryListStatus);
	};

	useEffect(() => {
		if (router.isReady) getQueries();
	}, [router]);

	return { listName, link, listIndex, listStatus };
};
