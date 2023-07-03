import { NotificationContext } from "@/context/notification";
import { useQueriesWords } from "@/hooks/useQueriesWords";
import { IWord } from "@/services/interfaces/words";
import { produce } from "immer";
import { useContext, useEffect, useState } from "react";

interface Props {
	props: {
		_id: string;
		index: number;
		groupIndex: number;
		wordsPerWordList: number;
		words: IWord[];
		setWords: React.Dispatch<React.SetStateAction<IWord[]>>;
	};
}

export const RemoveWord = ({ props: { words, setWords, index, groupIndex, wordsPerWordList, _id } }: Props) => {
	const [confirmRemoveWord, setConfirmRemoveWord] = useState(false);

	const { requestUpdateWords } = useQueriesWords();
	const { setNotificationValues } = useContext(NotificationContext);

	const removeWord = async () => {
		const newWords = produce(words, (draft) => {
			draft.splice(index, 1);
		});

		const firstWordIndex = groupIndex * wordsPerWordList;
		const { error } = await requestUpdateWords({ updateWords: { listID: _id, newWords, firstWordIndex } });

		if (error) {
			return setNotificationValues({
				isOpen: false,
				type: "error",
				title: "Ops, um erro ocorreu ao tentar remover uma de suas palavras",
				message: error,
			});
		}

		setWords(newWords);
		setConfirmRemoveWord(false);

		// update session storage
	};

	useEffect(() => {
		const timeOut = setTimeout(() => setConfirmRemoveWord(false), 5000);
		return () => clearTimeout(timeOut);
	}, [confirmRemoveWord]);

	return (
		<>
			{confirmRemoveWord && (
				<button onClick={() => removeWord()} autoFocus={true} onBlur={() => setConfirmRemoveWord(false)} className="remove confirm">
					Clique novamente para remover esta palavra
				</button>
			)}

			{confirmRemoveWord || (
				<button onClick={() => setConfirmRemoveWord(true)} title="Remover palavra" className="remove">
					x
				</button>
			)}
		</>
	);
};
