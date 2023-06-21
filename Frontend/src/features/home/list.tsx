import Link from "next/link";
import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";
import { RenameList } from "./renameList";
import { ListName } from "./listName";
import { DeleteList } from "./deleteList";

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
					<Link href={`${list.name.replaceAll(" ", "-")}-${list._id}`} className="option">
						Entrar
					</Link>

					<RenameList props={{ editable, setEditable, list, listName, setShowMenu }} />

					<button className="option" onClick={() => setConfirmDelete(true)}>
						Deletar
					</button>
				</div>
			)}

			{confirmDelete && <DeleteList props={{ list, setConfirmDelete }} />}
		</StyledList>
	);
};
