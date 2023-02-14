import { StyledStudyContainer } from "./styles/styledStudyContainer";

export const StudyContainer = () => {
	return (
		<StyledStudyContainer>
			<div className='question'>
				<h1>Pergunta</h1>
				<h1>Resposta</h1>
			</div>

			<input className='answer' type='text' placeholder='Resposta' />

			<div className='buttons'>
				<button>Confirmar</button>
				<button>Não sei</button>
			</div>

			<h2 className='words-left'>xx palavras até terminar a lista</h2>
		</StyledStudyContainer>
	);
};
