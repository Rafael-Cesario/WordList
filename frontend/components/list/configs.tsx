import { useRouter } from 'next/router';
import { useState } from 'react';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';
import { TextInput } from '../inputs/inputs';
import { StyledConfigs } from './styledConfigs';
import { SaveConfigs } from './saveConfigs';

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
				<SaveConfigs props={{ values, listName, setShowConfigs }} />
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
