"use client";
import { useContext, useState } from "react";
import { StyledCreateList } from "./styles/createListStyle";
import { NotificationContext } from "@/context/notification";
import { Cookies } from "@/services/cookies";
import { useQueriesList } from "@/hooks/useQueriesList";
import { useDispatch } from "react-redux";
import { listSlice } from "./context/listSlice";

export const CreateList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [listName, setListName] = useState("");
	const { setNotificationValues } = useContext(NotificationContext);
	const { requestCreateList } = useQueriesList();
	const dispatch = useDispatch();

	const createList = async () => {
		if (!listName) return setNotificationValues({ isOpen: true, message: "Digite um nome para sua lista", title: "Lista sem nome", type: "error" });

		const cookies = new Cookies();
		const userCookies = await cookies.get("user");

		const createList = { name: listName, userID: String(userCookies.ID) };
		const { list, error } = await requestCreateList({ createList });
		if (error) return setNotificationValues({ isOpen: true, message: error, title: "Erro ao criar lista", type: "error" });

		dispatch(listSlice.actions.createList({ list }));

		setListName("");
		setIsOpen(false);

		setNotificationValues({
			isOpen: true,
			message: "Sua nova lista deve estar aparecendo no final de suas listas",
			title: "Nova Lista",
			type: "success",
		});
	};

	return (
		<>
			<button onClick={() => setIsOpen(!isOpen)}>Criar nova Lista</button>

			{isOpen && (
				<StyledCreateList>
					<input className="name" type="text" placeholder="Nome" onChange={(e) => setListName(e.target.value)} />
					<button onClick={() => createList()} className="create">
						Criar
					</button>
				</StyledCreateList>
			)}
		</>
	);
};
