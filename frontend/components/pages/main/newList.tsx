import { createList } from '../../../services/queries/queriesList';
import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styledNewList';
import { getCookies } from '../../../services/cookies';

export const NewList = () => {
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	const createNewList = async (e: FormEvent) => {
		e.preventDefault();

		const owner = (await getCookies('user')).data.cookie;
		const listName = values.name;
		await createList({ owner, listName });

		// update page with new lists

		// clean the input
	};

	return (
		<StyledNewList>
			<button onClick={() => setShowNewList(!showNewList)}>Nova lista</button>

			{showNewList && (
				<form onSubmit={e => createNewList(e)}>
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
