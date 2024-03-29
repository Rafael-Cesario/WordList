"use client";
import { useContext, useState } from "react";
import { StyledCreateList } from "./styles/createListStyle";
import { NotificationContext } from "@/context/notification";
import { Cookies } from "@/services/cookies";
import { useQueriesList } from "@/hooks/useQueriesList";
import { useDispatch } from "react-redux";
import { listSlice } from "./context/listSlice";
import { UserCookies } from "@/services/interfaces/cookies";

export const CreateList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [listName, setListName] = useState("");
	const { setNotificationValues } = useContext(NotificationContext);
	const { requestCreateList } = useQueriesList();
	const dispatch = useDispatch();

	const createList = async () => {
		if (!listName) return setNotificationValues({ isOpen: true, message: "Digite um nome para sua lista", title: "Lista sem nome", type: "error" });

		const cookies = new Cookies();
		const userCookies = await cookies.get<UserCookies>("user");

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
			<button role="show-create-input" onClick={() => setIsOpen(!isOpen)}>
				Criar nova Lista
			</button>

			{isOpen && (
				<StyledCreateList>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>

						<h1 className="title">Criar nova lista</h1>

						<input
							role="list-name"
							type="text"
							className="list-name"
							placeholder="Nome"
							onKeyUp={(e) => e.key === "Enter" && createList()}
							autoFocus={true}
							onChange={(e) => setListName(e.target.value)}
						/>

						<button role="create-list" onClick={() => createList()} className="create-button">
							Criar
						</button>
					</div>
				</StyledCreateList>
			)}
		</>
	);
};
