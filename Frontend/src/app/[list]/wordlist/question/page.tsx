"use client";
import { NavigateToList } from "@/components/navigate";
import { StoreType } from "@/context/store";
import { StyledQuestion } from "@/features/question/styles/questionStyle";
import { setWordList } from "@/features/wordList/context/wordListSlice";
import { WordListData } from "@/services/interfaces/list";
import { StorageKeys } from "@/services/interfaces/storage";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// todo > Loading components
const Question = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	const [words, setWords] = useState(wordList.words);
	const [currentWord, setCurrentWord] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [userAnswer, setUserAnswer] = useState("");
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

	const question = words[currentWord]?.[wordList.answerWith === "term" ? "definitions" : "term"];
	const answer = words[currentWord]?.[wordList.answerWith];

	const dispatch = useDispatch();

	const getWordList = () => {
		const storage = sessionStorage.getItem(StorageKeys.wordList);
		if (!storage) return <NavigateToList params="/wordlist" />;
		const wordList: WordListData = JSON.parse(storage);
		dispatch(setWordList({ wordList }));
		setWords(wordList.words);
	};

	const checkAnswer = () => {
		if (!userAnswer) return false;
		const userAnswerRegExp = new RegExp(userAnswer, "i");
		const isCorrect = !!answer.match(userAnswerRegExp);
		return isCorrect;
	};

	// todo >
	// limit the range to 10 words
	const goToNextWord = () => {
		let nextWord = currentWord + 1;
		const lastWordIndex = words.length - 1;
		nextWord = nextWord > lastWordIndex ? 0 : nextWord;
		setCurrentWord(nextWord);
	};

	const removeCurrentWord = () => {
		const newWords = produce(words, (draft) => {
			draft.splice(currentWord, 1);
		});

		// todo >
		// if there is no more words, show text about ending with a button to redo
		// send a backend request to update the correct times of words.

		setWords(newWords);
	};

	const submit = () => {
		const isAnswerCorrect = checkAnswer();
		setIsAnswerCorrect(isAnswerCorrect);

		setShowAnswer(!showAnswer);
		if (!showAnswer) return;

		if (!isAnswerCorrect) goToNextWord();
		if (isAnswerCorrect) removeCurrentWord();

		setUserAnswer("");
	};

	useEffect(() => {
		getWordList();
	}, []);

	return (
		<StyledQuestion isCorrect={isAnswerCorrect}>
			<NavigateToList params="/wordlist" />

			{!!words.length || (
				<>
					<h1 className="title-end">Lista finalizada</h1>
					<button className="button-end" onClick={() => setWords(wordList.words)}>
						Reiniciar
					</button>
				</>
			)}

			{!!words.length && (
				<div className="container">
					<h1 className="question">{question}</h1>
					<h2 className={`answer ${showAnswer && "active"}`}>{answer}</h2>

					<input
						onKeyUp={(e) => e.key === "Enter" && submit()}
						value={userAnswer}
						onChange={(e) => setUserAnswer(e.target.value)}
						placeholder="Resposta..."
						type="text"
						id="answer"
						autoFocus={true}
					/>

					<div className="buttons">
						<button onClick={() => submit()}>Confirmar</button>
						<button className={showAnswer ? (isAnswerCorrect ? "" : "active") : ""}>Marcar como correta</button>
					</div>

					<p className="words-left">{words.length} palavras até o fim da lista</p>
				</div>
			)}
		</StyledQuestion>
	);
};

export default Question;
