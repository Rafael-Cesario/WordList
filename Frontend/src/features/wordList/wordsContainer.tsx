"use client";
import { produce } from "immer";
import { StoreType } from "@/context/store";
import { useSelector } from "react-redux";
import { StyledWordsContainer } from "./styles/wordsContianerStyle";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "@/context/notification";
import { StorageKeys } from "@/services/interfaces/storage";
import { WordListData } from "@/services/interfaces/list";
import { useQueriesWords } from "@/hooks/useQueriesWords";
import { RemoveWord } from "./removeWord";

export const WordsContainer = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	const [words, setWords] = useState(wordList.words);
	const [haveWordsChanged, setHaveWordsChanged] = useState(false);

	const { setNotificationValues } = useContext(NotificationContext);
	const { requestUpdateWords } = useQueriesWords();

	const renameWord = (wordIndex: number, key: "term" | "definitions", newValue: string) => {
		const newState = produce(words, (draft) => {
			draft[wordIndex][key] = newValue;
		});

		setHaveWordsChanged(true);
		setWords(newState);
	};

	useEffect(() => {
		setWords(wordList.words);
	}, [wordList]);

	const saveWords = async () => {
		const firstWordIndex = wordList.groupIndex * wordList.wordsPerWordList;
		const { error } = await requestUpdateWords({ updateWords: { listID: wordList._id, newWords: words, firstWordIndex } });

		if (error) {
			return setNotificationValues({
				isOpen: false,
				type: "error",
				title: "Ops, um erro ocorreu ao tentar salvar suas palavras",
				message: error,
			});
		}

		const newStorage: WordListData = { ...wordList, words };
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(newStorage));

		setHaveWordsChanged(false);
		setNotificationValues({ isOpen: true, type: "success", title: "Alterações salvas", message: "Suas palavras foram salvas com sucesso." });
	};

	return (
		<StyledWordsContainer>
			{haveWordsChanged && (
				<button onClick={() => saveWords()} className="save">
					Salvar alterações
				</button>
			)}

			{words.map((word, index) => {
				return (
					<div className="group" key={"group" + index}>
						<input type="text" className="word" value={word.term} onChange={(e) => renameWord(index, "term", e.target.value)} />
						<input type="text" className="word" value={word.definitions} onChange={(e) => renameWord(index, "definitions", e.target.value)} />

						<RemoveWord />
					</div>
				);
			})}
		</StyledWordsContainer>
	);
};
