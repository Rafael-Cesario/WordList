import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextWordList } from "../../../contexts/contextWordList";
import { ContextWords } from "../../../contexts/contextWords";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { getCookies } from "../../../services/cookies";
import { QueriesWordList } from "../../../services/queries/queriesWordList";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	const { changeWordListStatus } = useContext(ContextWordList);
	const { words } = useContext(ContextWords);
	const { listName, listIndex, listStatus, link } = useRouterQuery("");
	const router = useRouter();

	// todo > answer with
	const answerWith = "Definição";

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
		const queriesWordList = new QueriesWordList();
		const owner = await getCookies("user");

		await queriesWordList.deleteWordList({
			listName,
			owner,
			wordListIndex: Number(listIndex),
			wordListStatus: listStatus as TypeListStatus,
		});

		router.push(`/${listName}`);
	};

	return (
		<StyledMenu>
			<button onClick={() => studyList()}>Estudar lista</button>
			<button>Responder com: {answerWith}</button>
			<button onClick={() => changeWordListStatus()}>Mudar tempo de estudo</button>
			<button onClick={() => deleteWordList()}>Excluir lista</button>
		</StyledMenu>
	);
};
