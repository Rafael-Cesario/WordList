import { FormEvent, useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styles/styledNewList';
import produce from 'immer';
import { getCookies } from '../../../services/cookies';
import { queriesList } from '../../../services/queries/queriesList';

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

		const owner = await getCookies('user');
		const listName = values.name;
		await queriesList.createList({ owner, listName });

		setLists(
			produce(lists, draft => {
				draft.push(values.name);
			})
		);
		
		setValues({});
	};

	return (
		<StyledNewList>
			<button title={'Button new list'} onClick={() => setShowNewList(!showNewList)}>
				Nova lista
			</button>

			{showNewList && (
				<form onSubmit={e => createNewList(e)}>
					<h1 title={'New list'}>Nova Lista</h1>

					<TextInput
						props={{
							content: 'Nome',
							name: 'name',
							values,
							setValues,
						}}
					/>

					<button title={'Create new list'}>Criar nova lista</button>
				</form>
			)}
		</StyledNewList>
	);
};
