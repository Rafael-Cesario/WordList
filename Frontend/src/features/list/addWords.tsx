"use client";
import { INotification } from "@/context/notification";
import { useContext, useState } from "react";
import { StyledAddWords } from "./styles/addWordsStyle";
import { NotificationContext } from "@/context/notification";
import { useQueriesWords } from "@/hooks/useQueriesWords";
import { Cookies } from "@/services/cookies";
import { CookiesKeys, ListCookies } from "@/services/interfaces/cookies";
import { useDispatch } from "react-redux";
import { oneListSlice } from "./context/oneListSlice";
import { client } from "@/services/client";
import { QueriesList } from "@/services/queries/list";
import { IGetOneList, RGetOneList } from "@/services/interfaces/list";
import { produce } from "immer";

const defaultOneWord = { term: "", definitions: "", correctTimes: 0, learned: false };

const notificationError: INotification = {
	isOpen: true,
	type: "error",
	title: "Campos vazios",
	message: "Parece que você deixou algum campo vazio ao tentar adicionar novas palavras.",
};

// todo > Tests
export const AddWords = () => {
	const [menuAddWords, setMenuAddWords] = useState<"" | "one" | "many">("");
	const [oneWord, setOneWord] = useState(defaultOneWord);
	const [manyWords, setManyWords] = useState("");

	const { setNotificationValues } = useContext(NotificationContext);
	const { requestAddWords } = useQueriesWords();
	const dispatch = useDispatch();

	const generateClass = (name: "one" | "many") => {
		return menuAddWords === name ? "active" : "";
	};

	// todo > If bad template send notification.
	const getTextareaWords = () => {
		const separatedWords = manyWords.split("\n");

		const withoutEmpties = separatedWords.filter((word) => {
			const [term, definitions] = word.split(":");
			if (term && definitions) return word;
		});

		const wordsObject = withoutEmpties.map((word) => {
			const [term, definitions] = word.split(":");
			return { term: term.trim(), definitions: definitions.trim(), correctTimes: 0, learned: false };
		});

		return wordsObject;
	};

	const submitWords = async () => {
		if (menuAddWords === "one" && (!oneWord.term || !oneWord.definitions)) return setNotificationValues(notificationError);
		if (menuAddWords === "many" && !manyWords) return setNotificationValues(notificationError);

		const words = menuAddWords === "one" ? [oneWord] : [...getTextareaWords()];

		const cookies = new Cookies();
		const key: CookiesKeys = "list";
		const { listID, userID } = await cookies.get<ListCookies>(key);

		const addWords = { addWords: { listID, words } };
		const { message, error } = await requestAddWords(addWords);

		if (error) return setNotificationValues({ isOpen: true, type: "error", title: "Erro ao adicionar palavras", message: error });

		// todo > move to a separetd file
		const updateListCache = () => {
			const queriesList = new QueriesList();
			const listCache = client.readQuery<RGetOneList, IGetOneList>({
				query: queriesList.GET_ONE_LIST,
				variables: { listID, userID },
			});

			if (listCache) {
				listCache.getOneList = produce(listCache.getOneList, (draft) => {
					draft.words.push(...words);
				});
			}

			client.writeQuery({
				data: listCache,
				query: queriesList.GET_ONE_LIST,
				variables: { listID, userID },
			});
		};

		updateListCache();
		dispatch(oneListSlice.actions.addWord({ newWords: words }));
		setNotificationValues({ isOpen: true, type: "success", title: "Novas palavras adicionadas", message });
		setOneWord(defaultOneWord);
		setManyWords("");

		if (menuAddWords === "one") inputFocus();
		if (menuAddWords === "many") clearTextarea();
	};

	const clearTextarea = () => {
		const textElement = document.querySelector("#many-words") as HTMLTextAreaElement;
		textElement.value = "";
	};

	const inputFocus = () => {
		const inputElement = document.querySelector("#one-word") as HTMLInputElement;
		inputElement.focus();
	};

	return (
		<>
			<button role="open-menu" onClick={() => setMenuAddWords("one")} className="add-words-button">
				Adicionar palavras
			</button>

			{menuAddWords && (
				<StyledAddWords>
					<div role="menu-container" className="container">
						<div className="menu">
							<button onClick={() => setMenuAddWords("one")} className={generateClass("one")}>
								Individual
							</button>
							<button role="menu-change-many" onClick={() => setMenuAddWords("many")} className={generateClass("many")}>
								Adicionar várias
							</button>
						</div>

						<button className="close" onClick={() => setMenuAddWords("")}>
							x
						</button>

						<h1 className="title">Adicione novas palavras</h1>

						{menuAddWords === "one" && (
							<>
								<input
									role="input-term"
									id={"one-word"}
									onKeyUp={(e) => e.key === "Enter" && submitWords()}
									autoFocus={true}
									type="text"
									placeholder="Termo"
									className="term"
									value={oneWord.term}
									onChange={(e) => setOneWord({ ...oneWord, term: e.target.value })}
								/>
								<input
									role="input-translation"
									value={oneWord.definitions}
									onKeyUp={(e) => e.key === "Enter" && submitWords()}
									type="text"
									placeholder="Definições"
									className="definitions"
									onChange={(e) => setOneWord({ ...oneWord, definitions: e.target.value })}
								/>
							</>
						)}

						{menuAddWords === "many" && (
							<>
								<p className="info">Siga o template abaixo para adicionar novas palavras.</p>
								<textarea
									role="many-words"
									id={"many-words"}
									onChange={(e) => setManyWords(e.target.value)}
									placeholder={`Termo : Definição01, Definição02, Definição03\nOutro termo : Outra definição `}></textarea>
							</>
						)}

						<button role="add-words" onClick={() => submitWords()} className="submit">
							Adicionar
						</button>
					</div>
				</StyledAddWords>
			)}
		</>
	);
};
