import { useEffect, useState } from "react";
import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { WordLists } from "./wordLists";

export const List = () => {
	const { listName } = useRouterQuery("Carregando...");
	const [wordLists, setWordLists] = useState({ next: [], current: [], done: [] });

	const getWordLists = async () => {
		const queriesWordList = new QueriesWordList();
		const owner = await getCookies("user");
		const queryWordLists = await queriesWordList.getWordLists({ owner, listName });
		setWordLists(queryWordLists.wordLists);
	};

	useEffect(() => {
		const isLoading = listName === "Carregando...";
		isLoading || getWordLists();
	}, [listName]);

	return (
		<main>
			<WordLists props={{ wordLists }} />
		</main>
	);
};
