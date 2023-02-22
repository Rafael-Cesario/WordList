import { useRouter } from "next/router";
import { ChangesInput } from "../../../interfaces/interfaceList";
import { queriesList } from "../../../services/queries/queriesList";
import { useLocalData } from "../../../utils/hooks/useLocalData";

interface SaveConfigsProps {
	props: {
		values: { [key: string]: string };
		setShowConfigs: (show: boolean) => void;
	};
}

export const SaveConfigs = ({ props: { values, setShowConfigs } }: SaveConfigsProps) => {
	const router = useRouter();
	const { storage } = useLocalData();
	const { listName, owner } = storage;

	const changeListName = async () => {
		// todo > create a util function
		const newURL = "/" + values.listName.replace(/-/g, "_").replace(/ /g, "-");

		const changes: ChangesInput = {
			owner,
			oldName: listName,
			newName: values.listName,
		};

		await queriesList.changeListName(changes);

		const newStorage = JSON.stringify({ ...storage, listName: values.listName });
		localStorage.setItem("wordList", newStorage);

		setShowConfigs(false);
		router.push(newURL);
	};

	return (
		<button role='save-configs' onClick={() => changeListName()}>
			Salvar configs
		</button>
	);
};
