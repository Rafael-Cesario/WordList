import { StyledEndList } from "./styles/styledEndList";

interface PropsEndList {
	props: {
		setHaveListEnd: (state: boolean) => void;
		words: string[][];
		setWords: (words: string[][]) => void;
	};
}

export const EndList = ({ props: { setHaveListEnd, setWords, words } }: PropsEndList) => {
	return (
		<StyledEndList>
			<h1>Fim</h1>
			<button>Estudar lista novamente</button>

			<div className='words'>
				{words.map(([term, definition], index) => {
					return (
						<div key={term + index} className='word'>
							<p>{term}</p>
							<p>{definition}</p>
						</div>
					);
				})}
			</div>
		</StyledEndList>
	);
};
