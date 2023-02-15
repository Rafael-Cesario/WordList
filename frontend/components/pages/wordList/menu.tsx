import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextWords } from "../../../contexts/contextWords";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	const router = useRouter();
	const queriesWordList = new QueriesWordList();
	const { words } = useContext(ContextWords);
	const { listName, listIndex, listStatus, link } = useRouterQuery("");
	const { data: wordLists } = useQueriesWordListSWR();

	// todo > answer with
	// const answerWith = "Definição";

	const studyList = async () => {
		// todo > notification
		if (!words.length) return console.log("Add words first to study this list");

		const owner = await getCookies("user");
		const params = { listName, listStatus, listIndex, owner };
		const data = JSON.stringify(params);
		localStorage.setItem("listData", data);
		router.push(`/${link}/studyList`);
	};

	const deleteWordList = async () => {
		const owner = await getCookies("user");

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

		const owner = await getCookies("user");
		const wordListIndex = Number(listIndex);
		const wordListStatusNew = status[listStatus];
		const wordListStatusOld = listStatus as TypeListStatus;

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
