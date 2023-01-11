import { useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledNewList } from './styledNewList';

export const NewList = () => {
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState({});

	return (
		<StyledNewList>
			<button onClick={() => setShowNewList(!showNewList)}>Nova lista</button>

			{showNewList && (
				<form>
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
