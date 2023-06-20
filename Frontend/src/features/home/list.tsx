import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<StyledList onClick={() => setShowMenu(!showMenu)}>
			{list.name}

			{showMenu && (
				<div className="menu">
					<button className="option">Entrar</button>
					<button className="option">Renomear</button>
					<button className="option">Deletar</button>
				</div>
			)}
		</StyledList>
	);
};
