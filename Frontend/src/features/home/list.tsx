import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";
import { RenameList } from "./renameList";
import { ListName } from "./listName";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);

	return (
		<StyledList>
			<ListName props={{ editable, showMenu, setShowMenu, list, listName, setListName }} />

			{showMenu && (
				<div className="menu">
					<button className="option">Entrar</button>
					<RenameList props={{ editable, setEditable, list, listName, setShowMenu }} />
					<button className="option">Deletar</button>
				</div>
			)}
		</StyledList>
	);
};
