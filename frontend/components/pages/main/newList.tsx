import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styles/styledNewList';
import { queriesList } from '../../../services/queries/queriesList';
import { useLists } from '../../../utils/hooks/useLists';
import { useLocalData } from '../../../utils/hooks/useLocalData';
import { sendError } from '../wordList/utils/sendError';

export const NewList = () => {
	const { mutate } = useLists();
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const { storage } = useLocalData();

	const createNewList = async (e: FormEvent) => {
		e.preventDefault();

		const owner = storage.owner;
		const listName = values.name;

		if (!listName) return sendError('name', 'Escolha um nome para sua lista');

		await queriesList.createList({ owner, listName });
		mutate();

		setValues({});
	};

	return (
		<StyledNewList>
			<button role={'btn-new-list'} onClick={() => setShowNewList(!showNewList)}>
				Nova lista
			</button>

			{showNewList && (
				<form onSubmit={e => createNewList(e)}>
					<h1 role={'new-list-title'}>Nova Lista</h1>

					<TextInput
						props={{
							content: 'Nome',
							name: 'name',
							values,
							setValues,
						}}
					/>

					<button role={'create-new-list'}>Criar nova lista</button>
				</form>
			)}
		</StyledNewList>
	);
};
