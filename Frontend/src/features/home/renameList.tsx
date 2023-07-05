import { NotificationContext } from "@/context/notification";
import { useQueriesList } from "@/hooks/useQueriesList";
import { Cookies } from "@/services/cookies";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { listSlice } from "./context/listSlice";
import { IList } from "@/services/interfaces/list";
import { UserCookies } from "@/services/interfaces/cookies";

interface RenameListProps {
	props: {
		editable: boolean;
		setEditable: (newState: boolean) => void;
		listName: string;
		list: IList;
		setShowMenu: (newState: boolean) => void;
	};
}

export const RenameList = ({ props: { editable, setEditable, listName, list, setShowMenu } }: RenameListProps) => {
	const { setNotificationValues } = useContext(NotificationContext);
	const { requestRenameList } = useQueriesList();
	const dispatch = useDispatch();

	const renameList = async () => {
		setEditable(false);
		setShowMenu(false);

		if (listName === list.name) return;

		const cookies = new Cookies();
		const userCookies = await cookies.get<UserCookies>("user");

		const { message, error } = await requestRenameList({ renameList: { ID: list._id, userID: String(userCookies.ID), newName: listName } });
		if (error) return setNotificationValues({ isOpen: true, type: "error", title: "Erro ao tentar renomear lista", message: error });

		dispatch(listSlice.actions.renameList({ ID: list._id, newName: listName }));
		setNotificationValues({ isOpen: true, type: "success", title: "Lista renomeada", message });
	};

	return (
		<>
			{editable || (
				<button role="rename-button" className="option" onClick={() => setEditable(true)}>
					Renomear
				</button>
			)}

			{editable && (
				<button role="save-button" className="option" onClick={() => renameList()}>
					Salvar
				</button>
			)}
		</>
	);
};
