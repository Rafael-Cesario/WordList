import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styledNewList';

export const NewList = () => {
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState({});

	const createList = async (e: FormEvent) => {
		e.preventDefault();
		console.log({ values });

		// TODO

		// save new list on db

		// update page with new lists

		// clean the input
	};

	return (
		<StyledNewList>
			<button onClick={() => setShowNewList(!showNewList)}>Nova lista</button>

			{showNewList && (
				<form onSubmit={e => createList(e)}>
					<h1>Nova Lista</h1>

					<TextInput
						props={{
							content: 'Nome',
							name: 'name',
							values,
							setValues,
						}}
					/>

					<button>Criar nova lista</button>
				</form>
			)}
		</StyledNewList>
	);
};
