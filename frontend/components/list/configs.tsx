import { useState } from 'react';
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
	const [values, setValues] = useState({});
	const [showConfirmButton, setShowConfirmButton] = useState(false);

	// todo
	const saveConfigs = () => {
		return;
	};

	// todo
	const deleteList = () => {
		return;
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
					name: 'ListName',
					values,
					setValues,
				}}
			/>

			<div className="options">
				<button onClick={() => saveConfigs()}>Salvar configs</button>
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
