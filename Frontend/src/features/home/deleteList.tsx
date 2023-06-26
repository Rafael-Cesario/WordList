import { NotificationContext } from "@/context/notification";
import { useQueriesList } from "@/hooks/useQueriesList";
import { Cookies } from "@/services/cookies";
import { IList } from "@/services/interfaces/list";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { listSlice } from "./context/listSlice";

interface DeleteListProps {
	props: {
		list: IList;
		setConfirmDelete: (newState: boolean) => void;
	};
}

export const DeleteList = ({ props: { list, setConfirmDelete } }: DeleteListProps) => {
	const [listName, setListName] = useState("");

	const { requestDeleteList } = useQueriesList();
	const { setNotificationValues } = useContext(NotificationContext);
	const dispatch = useDispatch();

	const deleteList = async () => {
		const isSameName = list.name.toLowerCase() === listName.trim().toLowerCase();
		if (!isSameName)
			return setNotificationValues({
				isOpen: true,
				type: "error",
				title: "Deletar lista",
				message: "O nome que você digitou não é igual ao nome da lista.",
			});

		const cookies = new Cookies();
		const userCookies = await cookies.get("user");

		const { message, error } = await requestDeleteList({ deleteList: { ID: list._id, userID: String(userCookies.ID) } });
		if (error) return setNotificationValues({ isOpen: true, type: "error", title: "Error ao deletar lista", message: error });

		dispatch(listSlice.actions.deleteList({ ID: list._id }));

		setNotificationValues({ isOpen: true, type: "success", title: "Lista deletada", message: `${message}: ${list.name}` });
		setConfirmDelete(false);
	};

	return (
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

				<input
					role="submit-input"
					id="submit-delete"
					type="text"
					placeholder="Digite o nome da lista para confirmar"
					onChange={(e) => setListName(e.target.value)}
				/>

				<button role="submit" onClick={() => deleteList()} className="submit">
					Deletar lista
				</button>
			</div>
		</div>
	);
};
