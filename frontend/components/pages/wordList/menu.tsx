import { StyledMenu } from "./styles/styledMenu";

export const Menu = () => {
	// todo > answer with
	const answerWith = "Definição";

	return (
		<StyledMenu>
			<button>Estudar lista</button>
			<button>Mudar tempo de estudo</button>
			<button>Responder com: {answerWith}</button>
		</StyledMenu>
	);
};
