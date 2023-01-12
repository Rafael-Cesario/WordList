import { createList } from '../../../services/queries/queriesList';
import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styledNewList';
import { getCookies } from '../../../services/cookies';
import produce from 'immer';

interface NewListProps {
	props: {
		lists: string[];
		setLists: (lists: string[]) => void;
	};
}

export const NewList = ({ props }: NewListProps) => {
	const { lists, setLists } = props;
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	const createNewList = async (e: FormEvent) => {
		e.preventDefault();

		// todo : merge into a hook useLists

		// save on db
		const owner = (await getCookies('user')).data.cookie;
		const listName = values.name;
		await createList({ owner, listName });

		// update the ui
		const newLists = produce(lists, draft => {
			draft.push(listName);
		});

		setLists(newLists);

		// clean the input
		setValues({});
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
