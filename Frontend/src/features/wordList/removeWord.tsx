import { IWord } from "@/services/interfaces/words";
import { produce } from "immer";
import { useEffect, useState } from "react";

interface Props {
	props: {
		index: number;
		groupIndex: number;
		words: IWord[];
		setWords: React.Dispatch<React.SetStateAction<IWord[]>>;
	};
}

export const RemoveWord = ({ props: { words, setWords, index, groupIndex } }: Props) => {
	const [confirmRemoveWord, setConfirmRemoveWord] = useState(false);

	const removeWord = () => {
		const newWords = produce(words, (draft) => {
			draft.splice(index, 1);
		});

		setWords(newWords);
		setConfirmRemoveWord(false);

		// update session storage
		// update database
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
