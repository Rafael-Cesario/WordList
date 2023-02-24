import { useState } from "react";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { Options } from "./options";
import { StyledWordsContainer } from "./styles/styledWordsContainer";

export const WordsContainer = () => {
	const { words, error, isLoading } = useQueriesWordsSWR();

	if (isLoading) return <Paragraph text='Carregando suas palavras' />;
	if (error) return <Paragraph text='Um erro ocorreu, tente recarregar a página' />;
	if (!words?.length) return <Paragraph text='Suas palavras aparecerão aqui' />;

	const [options, setOptions] = useState({ show: false, index: 0 });
	const [values, setValues] = useState({ term: "", definition: "" });

	const showOptions = (input: HTMLInputElement, value: string, index: number) => {
		input.value = value;

		setTimeout(() => {
			setOptions({ show: true, index });
		}, 200);
	};

	const hideOptions = (index: number) => {
		setTimeout(() => {
			setOptions({ show: false, index });
		}, 100);
	};

	return (
		<StyledWordsContainer role={"words-container"} className='words'>
			{words.map(([term, definition], index) => {
				return (
					<div key={`${term}-${index}`} className='word'>
						{options.show && index === options.index && <Options props={{ index, values }} />}

						<input
							className='term'
							type='text'
							placeholder={term}
							onChange={e => setValues({ ...values, term: e.target.value })}
							onFocus={e => showOptions(e.target, term, index)}
							onBlur={() => hideOptions(index)}
							role={`input-${term}`}
						/>

						<input
							className='definition'
							type='text'
							placeholder={definition}
							onChange={e => setValues({ ...values, definition: e.target.value })}
							onFocus={e => showOptions(e.target, definition, index)}
							onBlur={() => hideOptions(index)}
						/>
					</div>
				);
			})}
		</StyledWordsContainer>
	);
};

const Paragraph = ({ text }: { text: string }) => {
	return (
		<StyledWordsContainer>
			<p role={"para"}>{text}</p>
		</StyledWordsContainer>
	);
};
