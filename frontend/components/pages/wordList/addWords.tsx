import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledAddWords } from './styles/styledAddWords';

export const AddWords = () => {
	const [values, setValues] = useState({});

	const addNewWord = (e: FormEvent) => {
		e.preventDefault();
		console.log({ values });
		setValues({});
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
