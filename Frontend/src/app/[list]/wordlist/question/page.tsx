"use client";
import { NavigateToList } from "@/components/navigate";
import { StoreType } from "@/context/store";
import { StyledQuestion } from "@/features/question/styles/questionStyle";
import { setWordList } from "@/features/wordList/context/wordListSlice";
import { WordListData } from "@/services/interfaces/list";
import { StorageKeys } from "@/services/interfaces/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// todo > Loading components
const Question = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	const [words, setWords] = useState(wordList.words);
	const [currentWord, setCurrentWord] = useState(0);

	const dispatch = useDispatch();

	const getWordList = () => {
		const storage = sessionStorage.getItem(StorageKeys.wordList);
		if (!storage) return <NavigateToList params="/wordlist" />;
		const wordList: WordListData = JSON.parse(storage);
		dispatch(setWordList({ wordList }));
		setWords(wordList.words);
	};

	useEffect(() => {
		getWordList();
	}, []);

	const question = words[currentWord]?.[wordList.answerWith === "term" ? "definitions" : "term"];
	const answer = words[currentWord]?.[wordList.answerWith];

	return (
		<StyledQuestion>
			<NavigateToList params="/wordlist" />

			<div className="container">
				<h1 className="question">{question}</h1>
				<h2 className="answer">{answer}</h2>

				<input placeholder="Resposta..." type="text" id="answer" autoFocus={true} />

				<div className="buttons">
					<button>Confirmar</button>
					<button>Marcar como correta</button>
				</div>

				<p className="words-left">{words.length} palavras até o fim da lista</p>
			</div>
		</StyledQuestion>
	);
};

export default Question;
