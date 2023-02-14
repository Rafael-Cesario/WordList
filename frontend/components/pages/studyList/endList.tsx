interface PropsEndList {
	props: {
		setHaveListEnd: (state: boolean) => void;
		words: string[][];
		setWords: (words: string[][]) => void;
	};
}

export const EndList = ({ props: { setHaveListEnd, setWords, words } }: PropsEndList) => {
	return (
		<>
			<h1>Fim</h1>
			<button>Estudar lista novamente</button>

			<div className='words'></div>
		</>
	);
};
