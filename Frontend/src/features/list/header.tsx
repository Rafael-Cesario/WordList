"use client";
import Link from "next/link";
import { StyledHeader } from "./styles/headerStyle";
import { AddWords } from "./addWords";
import { ListCookies } from "@/services/interfaces/cookies";
import { useContext, useEffect, useState } from "react";
import { useQueriesWords } from "@/hooks/useQueriesWords";
import { NotificationContext } from "@/context/notification";
import { useDispatch, useSelector } from "react-redux";
import { wordSlice } from "./context/wordSlice";
import { StoreType } from "@/context/store";

interface Props {
	listCookies: ListCookies;
}

export const Header = ({ listCookies }: Props) => {
	const { listName, words } = useSelector((state: StoreType) => state.words);
	const [loadingList, setLoadingList] = useState(true);

	const { requestGetWords } = useQueriesWords();
	const { setNotificationValues } = useContext(NotificationContext);
	const dispatch = useDispatch();

	const loadWords = async () => {
		const { listID, userID } = listCookies;
		const { list, error } = await requestGetWords(listID, userID);

		if (error)
			return setNotificationValues({
				isOpen: true,
				type: "error",
				title: "Error ao carregar suas palavras",
				message: "Tente sair e entrar novamente na sua lista.",
			});

		dispatch(wordSlice.actions.loadWords({ ...list }));
		setLoadingList(false);
	};

	useEffect(() => {
		loadWords();
	}, []);

	return (
		<StyledHeader>
			<Link className="link" href={"/"}>
				Voltar
			</Link>

			<div className="title">
				{loadingList ? <div className="loading" /> : <h1>{listName}</h1>}
				{loadingList ? (
					<div className="loading" />
				) : (
					<p>
						{words.length} {words.length === 1 ? "Palavra" : "Palavras"} na lista
					</p>
				)}
			</div>

			<AddWords />
		</StyledHeader>
	);
};
