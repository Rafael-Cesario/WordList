import { useContext, useState } from "react";
import { ContextWords } from "../../../contexts/contextWords";
import { Options } from "./options";
import { StyledWordsContainer } from "./styles/styledWordsContainer";

export const WordsContainer = () => {
	const [options, setOptions] = useState({ show: false, index: 0 });
	const [values, setValues] = useState({ term: "", definition: "" });
	const { words } = useContext(ContextWords);

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

	if (!words?.length)
		return (
			<StyledWordsContainer>
				<p>Suas palavras aparecerão aqui</p>
			</StyledWordsContainer>
		);

	return (
		<StyledWordsContainer className='words'>
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
