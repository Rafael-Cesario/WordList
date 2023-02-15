import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { IStorage } from "../../../interfaces/storage";

export const CreateWordList = () => {
	const { mutate } = useQueriesWordListSWR();

	// todo > getListname from localStorage
	const { listName } = useRouterQuery("");

	const createWordList = async () => {
		// todo > handler error case
		const queriesWordList = new QueriesWordList();

		const storage = localStorage.getItem("wordList");
		if (!storage) throw new Error("Error");

		const data = JSON.parse(storage) as IStorage;
		const owner = data.owner;
		await queriesWordList.createWordList({ listName, owner });
		mutate();
	};

	return <button onClick={() => createWordList()}>Criar Lista</button>;
};
