import { NavigateToList } from "@/components/navigate";
import { StyledQuestion } from "@/features/question/styles/questionStyle";

const Question = () => {
	return (
		<StyledQuestion>
			<NavigateToList params="/wordlist" />

			<div className="container">
				<h1 className="question">english word</h1>
				<h2 className="answer">translation</h2>

				<input placeholder="Resposta..." type="text" id="answer" autoFocus={true} />

				<div className="buttons">
					<button>Confirmar</button>
					<button>Marcar como correta</button>
				</div>

				<p className="words-left">13 palavras até o fim da lista</p>
			</div>
		</StyledQuestion>
	);
};

export default Question;
