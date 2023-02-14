import produce from "immer";
import { useEffect, useState } from "react";
import { TypeListStatus } from "../../../interfaces/interfaceWordList";
import { QueriesWords } from "../../../services/queries/queriesWords";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { StyledStudyContainer } from "./styles/styledStudyContainer";

interface PropsStudyContaienr {
	props: {
		setHaveListEnd: (state: boolean) => void;
	};
}

export const StudyContainer = ({ props: { setHaveListEnd } }: PropsStudyContaienr) => {
	const queriesWords = new QueriesWords();
	const [words, setWords] = useState([["", ""]]);
	const { listIndex, listName, listStatus, owner } = useLocalData();

	const getWords = async () => {
		if (!listName) return;

		const getWords = await queriesWords.getWords({
			words: {
				listIndex,
				listName,
				owner,
				status: listStatus as TypeListStatus,
			},
		});

		setWords(getWords.words);
	};

	useEffect(() => {
		getWords();
	}, [listName]);

	const [wordIndex, setWordIndex] = useState(0);
	const [value, setValue] = useState("");
	const [answerState, setAnswerState] = useState("");

	const showAnswer = () => {
		const answer = document.querySelector("#answer") as HTMLTitleElement;
		answer.classList.toggle("hide");

		console.log({ answer: answer.textContent, value });
		const isAnswerRight = answer.textContent === value ? "right" : "wrong";
		answer.classList.toggle(isAnswerRight);
		setAnswerState(isAnswerRight ? isAnswerRight : "");
	};

	const nextQuestion = () => {
		showAnswer();

		console.log({ answerState });
		if (answerState === "right") {
			const newWords = produce(words, draft => {
				draft.splice(wordIndex, 1);
			});

			setWords(newWords);

			if (!newWords.length) return setHaveListEnd(true);
		}

		if (wordIndex === 10 || wordIndex === words.length - 1) setWordIndex(0);
		else setWordIndex(wordIndex + 1);
	};

	return (
		<StyledStudyContainer>
			<div className='question'>
				<h1>{words[wordIndex][0]}</h1>
				<h1 id='answer' className='hide'>
					{words[wordIndex][1]}
				</h1>
			</div>

			<input onChange={e => setValue(e.target.value)} className='answer' type='text' placeholder='Resposta' />

			<div className='buttons'>
				<button onClick={() => nextQuestion()}>Confirmar</button>
				<button>Não sei</button>
			</div>

			<h2 className='words-left'>xx palavras até terminar a lista</h2>
		</StyledStudyContainer>
	);
};
