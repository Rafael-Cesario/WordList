"use client";
import { useQueriesList } from "@/hooks/useQueriesList";
import { StyledListContainer } from "./styles/listContainerStyle";
import { Cookies } from "@/services/cookies";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/notification";
import { Loading } from "./loading";
import { List } from "./list";
import { listSlice } from "./context/listSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/context/store";

export const ListContainer = () => {
	const { lists } = useSelector((state: StoreType) => state.lists);
	const [loading, setLoading] = useState(true);
	const { requestReadLists } = useQueriesList();
	const { setNotificationValues } = useContext(NotificationContext);
	const dispatch = useDispatch();

	const loadLists = async () => {
		const cookies = new Cookies();
		const userCookies = await cookies.get("user");

		const { error, lists } = await requestReadLists({ userID: String(userCookies.ID) });
		if (error || !lists) return setNotificationValues({ isOpen: true, message: error, title: "Erro ao carregar as listas", type: "error" });

		setLoading(false);
		dispatch(listSlice.actions.loadLists({ lists }));
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
