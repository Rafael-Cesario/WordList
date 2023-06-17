import { CreateList } from "./createList";
import { StyledHeader } from "./styles/headerStyle";

export const Header = () => {
	return (
		<StyledHeader>
			<h1 className="title">WordList</h1>

			<div className="menu">
				<button>Perfil</button>
				<CreateList />
			</div>
		</StyledHeader>
	);
};
