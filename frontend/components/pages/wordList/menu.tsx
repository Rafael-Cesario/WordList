import { useRouter } from "next/router";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { convertListName } from "../../../utils/convertListName";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	const router = useRouter();
	const queriesWordList = new QueriesWordList();

	const { words } = useQueriesWordsSWR();
	const { data: wordLists, mutate } = useQueriesWordListSWR();

	const { storage } = useLocalData();
	const { owner, listIndex, listName, listStatus } = storage;

	const link = convertListName(listName);

	const studyList = async () => {
		// todo > notification
		if (!words.length) return console.log("Add words first to study this list");
		router.push(`/${link}/studyList`);
	};

	// todo > create a component with this function
	const deleteWordList = async () => {
		await queriesWordList.deleteWordList({
			listName,
			owner,
			wordListIndex: Number(listIndex),
			wordListStatus: listStatus as TypeListStatus,
		});

		mutate();
		router.push(`/${listName}`);
	};

	const changeWordListStatus = async () => {
		const status: { [key: string]: TypeListStatus } = {
			next: "current",
			current: "done",
			done: "next",
		};

		const wordListIndex = Number(listIndex);
		const wordListStatusNew = status[listStatus];
		const wordListStatusOld = listStatus as TypeListStatus;

		const newStorage = JSON.stringify({ owner, listIndex, listName, listStatus: wordListStatusNew });
		localStorage.setItem("wordList", newStorage);

		await queriesWordList.changeWordListStatus({
			listName,
			owner,
			wordListIndex,
			wordListStatusOld,
			wordListStatusNew,
		});

		const newIndex = wordLists[wordListStatusNew].length;
		const newRoute = `/${link}/${wordListStatusNew}-${newIndex}`;
		router.push(newRoute);
	};

	return (
		<StyledMenu>
			<button onClick={() => studyList()}>Estudar lista</button>
			<button onClick={() => changeWordListStatus()}>Mudar o status da lista</button>
			<button onClick={() => deleteWordList()}>Excluir lista</button>

			{/* todo */}
			{/* <button>Responder com: {answerWith}</button> */}
		</StyledMenu>
	);
};
