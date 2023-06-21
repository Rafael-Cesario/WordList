import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";
import { RenameList } from "./renameList";
import { ListName } from "./listName";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);

	const [confirmDelete, setConfirmDelete] = useState(false);

	return (
		<StyledList>
			<ListName props={{ editable, showMenu, setShowMenu, list, listName, setListName }} />

			{showMenu && (
				<div className="menu">
					<button className="option">Entrar</button>
					<RenameList props={{ editable, setEditable, list, listName, setShowMenu }} />
					<button className="option" onClick={() => setConfirmDelete(true)}>
						Deletar
					</button>
				</div>
			)}

			{confirmDelete && (
				<div className="container">
					<div className="delete">
						<div className="line" />
						<button className="close" onClick={() => setConfirmDelete(false)}>
							x
						</button>

						<h1 className="title">Quer mesmo deletar a lista {list.name}?</h1>
						<p className="text">Esta ação não poderá ser desfeita.</p>
						<p className="text">Deletar esta lista irá também deletar todas as palavras adicionadas nela.</p>

						<label htmlFor="submit-delete">
							{`"`}
							{list.name}
							{'"'}
						</label>
						<input id="submit-delete" type="text" placeholder="Digite o nome da lista para confirmar" />

						<button className="submit">Deletar lista</button>
					</div>
				</div>
			)}
		</StyledList>
	);
};
