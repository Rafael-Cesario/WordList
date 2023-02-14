import produce from "immer";
import { FormEvent, useEffect, useState } from "react";
import { StyledStudyContainer } from "./styles/styledStudyContainer";

interface PropsStudyContaienr {
	props: {
		words: string[][];
		setHaveListEnd: (state: boolean) => void;
	};
}

export const StudyContainer = ({ props: { setHaveListEnd, words } }: PropsStudyContaienr) => {
	const [studyWords, setStudyWords] = useState(words);
	const [wordIndex, setWordIndex] = useState(0);
	const [value, setValue] = useState("");
	const [answerState, setAnswerState] = useState("");

	useEffect(() => {
		setStudyWords(words);
	}, [words]);

	const showAnswer = (e: FormEvent) => {
		e.preventDefault();
		if (answerState) return nextQuestion();

		const answer = document.querySelector("#answer") as HTMLTitleElement;
		answer.classList.toggle("hide");

		console.log({ answer: answer.textContent, value });
		const isAnswerRight = answer.textContent === value ? "right" : "wrong";
		answer.classList.toggle(isAnswerRight);
		setAnswerState(isAnswerRight);
	};

	const nextQuestion = () => {
		if (!answerState) return;

		const answer = document.querySelector("#answer") as HTMLTitleElement;
		answer.classList.toggle("hide");

		console.log({ answer: answer.textContent, value });
		const isAnswerRight = answer.textContent === value ? "right" : "wrong";
		answer.classList.toggle(isAnswerRight);
		setAnswerState(isAnswerRight);

		if (answerState === "right") {
			const newWords = produce(studyWords, draft => {
				draft.splice(wordIndex, 1);
			});

			if (!newWords.length) return setHaveListEnd(true);

			if (wordIndex === 10 || wordIndex === newWords.length - 1 || newWords.length === 1) setWordIndex(0);
			else setWordIndex(wordIndex + 1);

			setValue("");
			setStudyWords(newWords);
			setAnswerState("");
			return;
		}

		if (wordIndex === 10 || wordIndex === studyWords.length - 1 || studyWords.length === 1) setWordIndex(0);
		else setWordIndex(wordIndex + 1);

		setAnswerState("");
		setValue("");
	};

	return (
		<StyledStudyContainer>
			<div className='question'>
				<h1>{studyWords[wordIndex][0]}</h1>
				<h1 id='answer' className='hide'>
					{studyWords[wordIndex][1]}
				</h1>
			</div>

			<form onSubmit={e => showAnswer(e)}>
				<input value={value} onChange={e => setValue(e.target.value)} className='answer' type='text' placeholder='Resposta' />

				<div className='buttons'>
					{answerState === "wrong" && (
						<button type='button' onClick={() => setAnswerState("right")}>
							Marcar como correta
						</button>
					)}
					<button>Confirmar</button>
					<button type='button'>Não sei</button>
				</div>
			</form>

			<h2 className='words-left'>
				{studyWords.length} {studyWords.length > 1 ? "palavras" : "palavra"} para o fim da lista
			</h2>
		</StyledStudyContainer>
	);
};
