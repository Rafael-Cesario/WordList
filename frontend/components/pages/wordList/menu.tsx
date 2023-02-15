import { useRouter } from "next/router";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { IStorage } from "../../../interfaces/storage";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	const router = useRouter();
	const queriesWordList = new QueriesWordList();
	const { words } = useQueriesWordsSWR();
	const { link } = useRouterQuery("");
	const { data: wordLists } = useQueriesWordListSWR();

	// todo > answer with
	// const answerWith = "Definição";

	const studyList = async () => {
		// todo > notification
		if (!words.length) return console.log("Add words first to study this list");
		router.push(`/${link}/studyList`);
	};

	const deleteWordList = async () => {
		const storage = localStorage.getItem("wordList");
		if (!storage) throw new Error("");

		const { owner, listIndex, listName, listStatus } = JSON.parse(storage) as IStorage;

		await queriesWordList.deleteWordList({
			listName,
			owner,
			wordListIndex: Number(listIndex),
			wordListStatus: listStatus as TypeListStatus,
		});

		router.push(`/${listName}`);
	};

	// todo > save new Status in the localStorage
	const changeWordListStatus = async () => {
		const status: { [key: string]: TypeListStatus } = {
			next: "current",
			current: "done",
			done: "next",
		};

		const storage = localStorage.getItem("wordList");
		if (!storage) throw new Error("");

		const { owner, listIndex, listName, listStatus } = JSON.parse(storage) as IStorage;

		const wordListIndex = Number(listIndex);
		const wordListStatusNew = status[listStatus];
		const wordListStatusOld = listStatus as TypeListStatus;

		localStorage.setItem("wordList", JSON.stringify({ owner, listIndex, listName, listStatus: wordListStatusNew }));

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
