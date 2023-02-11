import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";

export const CreateWordList = () => {
	const { listName } = useRouterQuery("");
	const queriesWordList = new QueriesWordList();

	const createWordList = async () => {
		const owner = await getCookies("user");
		await queriesWordList.createWordList({ listName, owner });
	};

	return <button onClick={() => createWordList()}>Criar Lista</button>;
};
