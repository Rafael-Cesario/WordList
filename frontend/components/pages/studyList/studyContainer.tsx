import produce from 'immer';
import { FormEvent, useEffect, useState } from 'react';
import { StyledStudyContainer } from './styles/styledStudyContainer';

interface PropsStudyContaienr {
	props: {
		words: string[][];
		setHaveListEnd: (state: boolean) => void;
	};
}

export const StudyContainer = ({ props: { setHaveListEnd, words } }: PropsStudyContaienr) => {
	const [studyWords, setStudyWords] = useState(words);
	const [wordIndex, setWordIndex] = useState(0);
	const [value, setValue] = useState('');
	const [answerState, setAnswerState] = useState('');

	useEffect(() => {
		setStudyWords(words);
	}, [words]);

	const checkAnswer = (userAnswer: string, answer: string) => {
		if (userAnswer.trim().toLowerCase() === answer.trim().toLowerCase()) return 'right';
		return 'wrong';
	};

	const showAnswer = (e: FormEvent) => {
		e.preventDefault();
		if (answerState) return nextQuestion();

		const answer = document.querySelector('#answer') as HTMLTitleElement;
		answer.classList.toggle('hide');

		const isAnswerRight = checkAnswer(value, answer.textContent as string);
		answer.classList.toggle(isAnswerRight);
		setAnswerState(isAnswerRight);
	};

	const nextQuestion = (makeRight?: boolean) => {
		if (!answerState) return;

		const answer = document.querySelector('#answer') as HTMLTitleElement;
		answer.classList.toggle('hide');

		const isAnswerRight = checkAnswer(value, answer.textContent as string);
		answer.classList.toggle(isAnswerRight);

		if (answerState === 'right' || makeRight) {
			const newWords = produce(studyWords, (draft) => {
				draft.splice(wordIndex, 1);
			});

			if (!newWords.length) return setHaveListEnd(true);
			if (newWords.length - 1 > wordIndex) setWordIndex(0);

			setValue('');
			setStudyWords(newWords);
			setAnswerState('');
			return;
		}

		if (wordIndex === 10 || wordIndex === studyWords.length - 1 || studyWords.length === 1) setWordIndex(0);
		else setWordIndex(wordIndex + 1);

		setAnswerState('');
		setValue('');
	};

	return (
		<StyledStudyContainer>
			<div className="question">
				<h1 role="question">{studyWords[wordIndex][0]}</h1>
				<h1 role="answer" id="answer" className="hide">
					{studyWords[wordIndex][1]}
				</h1>
			</div>

			<form onSubmit={(e) => showAnswer(e)}>
				<input role={'input-answer'} value={value} onChange={(e) => setValue(e.target.value)} className="answer" type="text" placeholder="Resposta" />

				<div className="buttons">
					<button role={'confirm'}>Confirmar</button>
					{answerState === 'wrong' && (
						<button role={'force-right'} type="button" onClick={() => nextQuestion(true)}>
							Marcar como correta
						</button>
					)}
				</div>
			</form>

			<h2 className="words-left" role={'words-left'}>
				{studyWords.length} {studyWords.length > 1 ? 'palavras' : 'palavra'} para o fim da lista
			</h2>
		</StyledStudyContainer>
	);
};
