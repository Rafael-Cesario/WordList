import { useState } from 'react';
import { TextInput } from '../../inputs/inputs';

export const NewList = () => {
	const [showNewList, setShowNewList] = useState(false);
	const [values, setValues] = useState({});

	return (
		<div>
			<button onClick={() => setShowNewList(!showNewList)}>Nova lista</button>

			{showNewList && (
				<form>
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
		</div>
	);
};
