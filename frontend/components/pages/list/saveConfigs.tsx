import { getCookies } from '../../../services/cookies';
import { ChangesInput } from '../../../interfaces/interfaceList';
import { queriesList } from '../../../services/queries/queriesList';

interface SaveConfigsProps {
	props: {
		values: { [key: string]: string };
		listName: string;
		setShowConfigs: (show: boolean) => void;
	};
}

export const SaveConfigs = ({ props }: SaveConfigsProps) => {
	const { values, listName, setShowConfigs } = props;

	const changeListName = async () => {
		const owner = await getCookies('user');
		const newURL = '/' + values.listName.replace(/-/g, '_').replace(/ /g, '-');

		const changes: ChangesInput = {
			owner,
			oldName: listName,
			newName: values.listName,
		};

		await queriesList.changeListName(changes);
		setShowConfigs(false);
		location.href = newURL;
	};

	return <button onClick={() => changeListName()}>Salvar configs</button>;
};
