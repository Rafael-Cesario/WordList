import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";
import { useContext, useState } from "react";
import { useQueriesList } from "@/hooks/useQueriesList";
import { Cookies } from "@/services/cookies";
import { NotificationContext } from "@/context/notification";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [editable, setEditable] = useState(false);
	const [listName, setListName] = useState(list.name);

	const { setNotificationValues } = useContext(NotificationContext);
	const { requestRenameList } = useQueriesList();

	const renameList = async () => {
		setEditable(false);
		setShowMenu(false);

		if (listName === list.name) return;

		const cookies = new Cookies();
		const userCookies = await cookies.get("user");

		const { message, error } = await requestRenameList({ renameList: { ID: list._id, userID: String(userCookies.ID), newName: listName } });
		if (error) return setNotificationValues({ isOpen: true, type: "error", title: "Erro ao tentar renomear lista", message: error });

		setNotificationValues({ isOpen: true, type: "success", title: "Lista renomeada", message });
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
