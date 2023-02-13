import { useContext } from "react";
import { ContextWordList } from "../list/contexts/contextWordList";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	// todo > answer with
	const answerWith = "Definição";

	const { deleteWordList, changeWordListStatus } = useContext(ContextWordList);

	return (
		<StyledMenu>
			<button>Estudar lista</button>
			<button>Responder com: {answerWith}</button>
			<button onClick={() => changeWordListStatus()}>Mudar tempo de estudo</button>
			<button onClick={() => deleteWordList()}>Excluir lista</button>
		</StyledMenu>
	);
};
