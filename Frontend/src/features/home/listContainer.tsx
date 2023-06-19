"use client";
import { useQueriesList } from "@/hooks/useQueriesList";
import { StyledListContainer } from "./styles/listContainerStyle";
import { Cookies } from "@/services/cookies";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/notification";
import { IList } from "@/services/interfaces/list";
import { Loading } from "./loading";
import { List } from "./list";

export const ListContainer = () => {
	const [{ lists, loading }, setLists] = useState<{ loading: boolean; lists: IList[] }>({ loading: true, lists: [] });
	const { requestReadLists } = useQueriesList();
	const { setNotificationValues } = useContext(NotificationContext);

	const loadLists = async () => {
		const cookies = new Cookies();
		const userCookies = await cookies.get("user");

		const { error, lists } = await requestReadLists({ userID: userCookies.ID });
		if (error || !lists) return setNotificationValues({ isOpen: true, message: error, title: "Erro ao carregar as listas", type: "error" });

		setLists({ loading: false, lists });
	};

	useEffect(() => {
		loadLists();
	}, []);

	return (
		<StyledListContainer>
			{loading && <Loading />}
			<div className="lists">{loading || lists.map((list) => <List key={String(list._id)} props={{ list }} />)}</div>
		</StyledListContainer>
	);
};
