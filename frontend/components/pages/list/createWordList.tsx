import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { useLocalData } from "../../../utils/hooks/useLocalData";

export const CreateWordList = () => {
	const { mutate } = useQueriesWordListSWR();

	const { storage } = useLocalData();
	const { listName, owner } = storage;

	const createWordList = async () => {
		const queriesWordList = new QueriesWordList();

		// todo > handle Error case
		await queriesWordList.createWordList({ listName, owner });

		mutate();
	};

	return (
		<button role='create-new-wordList' onClick={() => createWordList()}>
			Criar Lista
		</button>
	);
};
