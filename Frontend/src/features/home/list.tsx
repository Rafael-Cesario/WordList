import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";
import { RenameList } from "./renameList";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);

	return (
		<StyledList>
			{editable || (
				<p className="listName" onClick={() => setShowMenu(!showMenu)}>
					{list.name}
				</p>
			)}

			{editable && (
				<input autoFocus={true} className="editable" type="text" placeholder="Nome" value={listName} onChange={(e) => setListName(e.target.value)} />
			)}

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
