import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);

	const renameList = () => {
		console.log({ listName });

		setEditable(false);
		setShowMenu(false);

		if (listName === list.name) return;
	};

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

					{editable || (
						<button className="option" onClick={() => setEditable(true)}>
							Renomear
						</button>
					)}

					{editable && (
						<button className="option" onClick={() => renameList()}>
							Salvar
						</button>
					)}

					<button className="option">Deletar</button>
				</div>
			)}
		</StyledList>
	);
};
