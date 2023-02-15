import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";

export const CreateWordList = () => {
	const { mutate } = useQueriesWordListSWR();

	// todo > getListname from localStorage
	const { listName } = useRouterQuery("");

	const createWordList = async () => {
		// todo > handler error case
		// todo > get owner from localStorage
		const queriesWordList = new QueriesWordList();
		const owner = await getCookies("user");
		await queriesWordList.createWordList({ listName, owner });
		mutate();
	};

	return <button onClick={() => createWordList()}>Criar Lista</button>;
};
