import Link from "next/link";
import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useState } from "react";
import { RenameList } from "./renameList";
import { ListName } from "./listName";
import { DeleteList } from "./deleteList";
import { Cookies } from "@/services/cookies";
import { CookiesKeys, ListCookies } from "@/services/interfaces/cookies";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const setCookies = async () => {
		const cookies = new Cookies();
		const cookieKey: CookiesKeys = "list";

		const value: ListCookies = {
			userID: list.userID,
			listID: list._id,
			listName: list.name,
		};

		await cookies.set(cookieKey, {
			key: "list",
			value: JSON.stringify(value),
			maxAge: 60 * 60 * 24 * 7, // 7 days
		});
	};

	return (
		<StyledList>
			<ListName props={{ editable, showMenu, setShowMenu, list, listName, setListName }} />

			{showMenu && (
				<div role="menu" className="menu">
					<Link onClick={() => setCookies()} href={`${list.name.replaceAll(" ", "-")}`} className="option">
						Entrar
					</Link>

					<RenameList props={{ editable, setEditable, list, listName, setShowMenu }} />

					<button role="show-delete-list" className="option" onClick={() => setConfirmDelete(true)}>
						Deletar
					</button>
				</div>
			)}

			{confirmDelete && <DeleteList props={{ list, setConfirmDelete }} />}
		</StyledList>
	);
};
