import { NotificationContext } from "@/context/notification";
import { useQueriesWords } from "@/hooks/useQueriesWords";
import { WordListData } from "@/services/interfaces/list";
import { StorageKeys } from "@/services/interfaces/storage";
import { IWord } from "@/services/interfaces/words";
import { produce } from "immer";
import { useContext, useEffect, useState } from "react";

interface Props {
	props: {
		words: IWord[];
		setWords: React.Dispatch<React.SetStateAction<IWord[]>>;
		index: number;
		wordList: WordListData;
	};
}

export const RemoveWord = ({ props: { words, setWords, index, wordList } }: Props) => {
	const [confirmRemoveWord, setConfirmRemoveWord] = useState(false);

	const { requestRemoveWord } = useQueriesWords();
	const { setNotificationValues } = useContext(NotificationContext);

	const removeWord = async () => {
		const newWords = produce(words, (draft) => {
			draft.splice(index, 1);
		});

		const globalIndex = wordList.groupIndex * wordList.wordsPerWordList;
		const wordIndex = globalIndex + index;
		const { error } = await requestRemoveWord({ removeWord: { listID: wordList._id, wordIndex } });

		if (error) {
			return setNotificationValues({
				isOpen: true,
				type: "error",
				title: "Ops, um erro ocorreu ao tentar remover uma de suas palavras",
				message: error,
			});
		}

		const newStorage: WordListData = { ...wordList, words: newWords };
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(newStorage));

		setWords(newWords);
		setConfirmRemoveWord(false);
		setNotificationValues({ isOpen: true, type: "success", title: "Palavra removida", message: "" });
	};

	useEffect(() => {
		const timeOut = setTimeout(() => setConfirmRemoveWord(false), 5000);
		return () => clearTimeout(timeOut);
	}, [confirmRemoveWord]);

	return (
		<>
			{confirmRemoveWord && (
				<button
					role="remove-word-confirm"
					onClick={() => removeWord()}
					autoFocus={true}
					onBlur={() => setConfirmRemoveWord(false)}
					className="remove confirm">
					Clique novamente para remover esta palavra
				</button>
			)}

			{confirmRemoveWord || (
				<button role="remove-word" onClick={() => setConfirmRemoveWord(true)} title="Remover palavra" className="remove">
					x
				</button>
			)}
		</>
	);
};
