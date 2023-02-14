import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextWordList } from "../../../contexts/contextWordList";
import { getCookies } from "../../../services/cookies";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	const { deleteWordList, changeWordListStatus } = useContext(ContextWordList);
	const { listName, listIndex, listStatus, link } = useRouterQuery("");
	const router = useRouter();

	// todo > answer with
	const answerWith = "Definição";

	const studyList = async () => {
		const owner = await getCookies("user");
		const params = { listName, listStatus, listIndex, owner };
		const data = JSON.stringify(params);
		localStorage.setItem("listData", data);
		router.push(`/${link}/studyList`);
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
