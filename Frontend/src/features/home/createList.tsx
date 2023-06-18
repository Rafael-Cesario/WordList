"use client";

import { useContext, useState } from "react";
import { StyledCreateList } from "./styles/createListStyle";
import { NotificationContext } from "@/context/notification";
import { Cookies } from "@/services/cookies";

export const CreateList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [listName, setListName] = useState("");
	const { setNotificationValues } = useContext(NotificationContext);

	const createList = async () => {
		if (!listName) return setNotificationValues({ isOpen: true, message: "Digite um nome para sua lista", title: "Lista sem nome", type: "error" });

		const cookies = new Cookies();
		const userCookies = await cookies.get("user");
		console.log({ userCookies });
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
