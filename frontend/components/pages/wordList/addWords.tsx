import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledAddWords } from './styles/styledAddWords';

interface AddWordsProps {
	props: {
		addWords: (words: [string, string]) => Promise<void>;
	};
}

export const AddWords = ({ props: { addWords } }: AddWordsProps) => {
	const [values, setValues] = useState<{ [key: string]: string }>({ term: '', definition: '' });

	const addNewWord = async (e: FormEvent) => {
		e.preventDefault();

		// todo > verify for repeated words

		await addWords([values.term, values.definition]);

		setValues({ term: '', definition: '' });
		const termInput = document.querySelector('#term') as HTMLInputElement;
		termInput.focus();
	};

	return (
		<StyledAddWords>
			<h1 className='title'>Adicionar Palavras</h1>

			<form onSubmit={e => addNewWord(e)}>
				<TextInput props={{ content: 'Termo', name: 'term', values, setValues }} />
				<TextInput props={{ content: 'Definição', name: 'definition', values, setValues }} />
				<button className='btn-add-words'>Adicionar</button>
			</form>
		</StyledAddWords>
	);
};
