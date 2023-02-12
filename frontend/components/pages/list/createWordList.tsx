import produce from "immer";
import { useContext } from "react";
import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { ContextWordList } from "./contexts/contextWordList";

export const CreateWordList = () => {
	const { wordList, setWordList } = useContext(ContextWordList);
	const { listName } = useRouterQuery("");
	const queriesWordList = new QueriesWordList();

	const createWordList = async () => {
		const owner = await getCookies("user");

		// todo > handler error case
		await queriesWordList.createWordList({ listName, owner });

		const newState = produce(wordList, draft => {
			draft.next.push([]);
		});

		setWordList(newState);
	};

	return <button onClick={() => createWordList()}>Criar Lista</button>;
};
