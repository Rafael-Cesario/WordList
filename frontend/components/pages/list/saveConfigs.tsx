import { useRouter } from 'next/router';
import { ChangesInput } from '../../../interfaces/interfaceList';
import { IStorage } from '../../../interfaces/storage';
import { queriesList } from '../../../services/queries/queriesList';
import { convertListName } from '../../../utils/convertListName';

interface SaveConfigsProps {
	props: {
		values: { [key: string]: string };
		setShowConfigs: (show: boolean) => void;
		storage: IStorage;
		setStorage: (newStore: IStorage) => void;
	};
}

export const SaveConfigs = ({ props: { values, setShowConfigs, setStorage, storage } }: SaveConfigsProps) => {
	const router = useRouter();

	const changeListName = async () => {
		const newURL = '/' + convertListName(values.listName);

		const changes: ChangesInput = {
			owner: storage.owner,
			oldName: storage.listName,
			newName: values.listName,
		};

		await queriesList.changeListName(changes);

		const newStorage = { ...storage, listName: values.listName };
		localStorage.setItem('wordList', JSON.stringify(newStorage));
		setStorage(newStorage);

		setShowConfigs(false);
		router.push(newURL);
	};

	return (
		<button role="save-configs" onClick={() => changeListName()}>
			Salvar configs
		</button>
	);
};
