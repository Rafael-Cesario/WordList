import { useState } from 'react';
import { TextInput } from '../../inputs/inputs';
import { StyledConfigs } from './styles/styledConfigs';
import { SaveConfigs } from './saveConfigs';
import { DeleteList } from './deleteList';
import { IStorage } from '../../../interfaces/storage';

interface ConfigsProps {
	props: {
		storage: IStorage;
		setStorage: (newStore: IStorage) => void;
		setShowConfigs: (showConfigs: boolean) => void;
	};
}

export const Configs = ({ props }: ConfigsProps) => {
	const { setShowConfigs, storage, setStorage } = props;
	const [values, setValues] = useState<{ [key: string]: string }>({});

	return (
		<StyledConfigs>
			<h1 role="configs-title">Configs</h1>
			<button role="close-configs" className="close" onClick={() => setShowConfigs(false)}>
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

			<div className="options">
				<SaveConfigs props={{ values, setShowConfigs, storage, setStorage }} />
				<DeleteList />
			</div>
		</StyledConfigs>
	);
};
