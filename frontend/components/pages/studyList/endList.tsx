import { useRouter } from "next/router";
import { StyledEndList } from "./styles/styledEndList";

interface PropsEndList {
	props: {
		words: string[][];
	};
}

export const EndList = ({ props: { words } }: PropsEndList) => {
	const router = useRouter();

	return (
		<StyledEndList>
			<h1 role='end-list'>Fim</h1>
			<button onClick={() => router.reload()}>Estudar lista novamente</button>

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
