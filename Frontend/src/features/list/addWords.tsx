"use client";
import { INotification } from "@/context/notification";
import { useContext, useState } from "react";
import { StyledAddWords } from "./styles/addWordsStyle";
import { NotificationContext } from "@/context/notification";

export const AddWords = () => {
	const [menuAddWords, setMenuAddWords] = useState<"" | "one" | "many">("");
	const [oneWord, setOneWord] = useState({ term: "", definitions: "" });
	const [manyWords, setManyWords] = useState("");

	const { setNotificationValues } = useContext(NotificationContext);

	const generateClass = (name: "one" | "many") => {
		return menuAddWords === name ? "active" : "";
	};

	const notificationError: INotification = {
		isOpen: true,
		type: "error",
		title: "Campos vazios",
		message: "Parece que você deixou algum campo vazio ao tentar adicionar novas palavras.",
	};

	const getTextareaWords = () => {
		const words = manyWords
			.split("\n")
			.map((word) => word.split(":"))
			.filter((word) => {
				const [term, definition] = word;
				if (term && definition) return [term.trim(), definition.trim()];
			});

		return words;
	};

	const submitOneWord = () => {
		if (menuAddWords === "one" && (!oneWord.term || !oneWord.definitions)) return setNotificationValues(notificationError);
		if (menuAddWords === "many" && !manyWords) return setNotificationValues(notificationError);
	};

	return (
		<>
			<button onClick={() => setMenuAddWords("one")} className="add-words-button">
				Adicionar palavras
			</button>

			{menuAddWords && (
				<StyledAddWords>
					<div className="container">
						<div className="menu">
							<button onClick={() => setMenuAddWords("one")} className={generateClass("one")}>
								Individual
							</button>
							<button onClick={() => setMenuAddWords("many")} className={generateClass("many")}>
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
									onKeyUp={(e) => e.key === "Enter" && submitOneWord()}
									autoFocus={true}
									type="text"
									placeholder="Termo"
									className="term"
									onChange={(e) => setOneWord({ ...oneWord, term: e.target.value })}
								/>
								<input
									onKeyUp={(e) => e.key === "Enter" && submitOneWord()}
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
									onChange={(e) => setManyWords(e.target.value)}
									placeholder={`Termo : Definição01, Definição02, Definição03\nOutro termo : Outra definição `}></textarea>
							</>
						)}

						<button onClick={() => submitOneWord()} className="submit">
							Adicionar
						</button>
					</div>
				</StyledAddWords>
			)}
		</>
	);
};
