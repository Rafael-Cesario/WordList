import { useContext } from "react";
import { ContextWordList } from "../list/contexts/contextWordList";
import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	// todo > answer with
	const answerWith = "Definição";

	const { deleteWordList } = useContext(ContextWordList);

	return (
		<StyledMenu>
			<button>Estudar lista</button>
			<button>Mudar tempo de estudo</button>
			<button>Responder com: {answerWith}</button>
			<button onClick={() => deleteWordList()}>Excluir lista</button>
		</StyledMenu>
	);
};
