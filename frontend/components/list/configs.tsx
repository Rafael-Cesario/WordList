import { useRouter } from 'next/router';
import { useState } from 'react';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';
import { ChangesInput } from '../../services/queries/queriesTypesList';
import { TextInput } from '../inputs/inputs';
import { StyledConfigs } from './styledConfigs';

interface ConfigsProps {
	props: {
		setShowConfigs: (showConfigs: boolean) => void;
		listName: string;
	};
}

export const Configs = ({ props }: ConfigsProps) => {
	const { setShowConfigs, listName } = props;
	const router = useRouter();
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [showConfirmButton, setShowConfirmButton] = useState(false);

	const changeListName = async () => {
		const owner = (await getCookies('user')).data.cookie;
		const newURL = '/' + values.listName.replace(/-/g, '_').replace(/ /g, '-');

		const changes: ChangesInput = {
			owner,
			oldName: listName,
			newName: values.listName,
		};

		await queriesList.changeListName(changes);
		setShowConfigs(false);
		router.push(newURL);
	};

	const deleteList = async () => {
		const owner = (await getCookies('user')).data.cookie;

		await queriesList.deleteList({ owner, listName });

		router.push('/main');
	};

	return (
		<StyledConfigs>
			<h1>Configs</h1>
			<button className='close' onClick={() => setShowConfigs(false)}>
				x
			</button>

			<TextInput
				props={{
					content: 'Nome da lista',
					name: 'listName',
					values,
					setValues,
				}}
			/>

			<div className='options'>
				<button onClick={() => changeListName()}>Salvar configs</button>
				<button onClick={() => setShowConfirmButton(!showConfirmButton)}>Deletar lista</button>
			</div>

			{showConfirmButton && (
				<div className='confirm'>
					<span>Deletar lista {listName} ?</span>
					<div className='choices'>
						<button onClick={() => deleteList()}>Sim</button>
						<button onClick={() => setShowConfirmButton(false)}>Não</button>
					</div>
				</div>
			)}
		</StyledConfigs>
	);
};
