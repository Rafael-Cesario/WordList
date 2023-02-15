import { useRouter } from "next/router";
import { ChangesInput } from "../../../interfaces/interfaceList";
import { queriesList } from "../../../services/queries/queriesList";
import { IStorage } from "../../../interfaces/storage";

interface SaveConfigsProps {
	props: {
		values: { [key: string]: string };
		listName: string;
		setShowConfigs: (show: boolean) => void;
	};
}

export const SaveConfigs = ({ props }: SaveConfigsProps) => {
	const router = useRouter();
	const { values, listName, setShowConfigs } = props;

	const changeListName = async () => {
		const storage = localStorage.getItem("wordList");
		if (!storage) throw new Error("delete List");

		const data = JSON.parse(storage) as IStorage;
		const owner = data.owner;
		const newURL = "/" + values.listName.replace(/-/g, "_").replace(/ /g, "-");

		const changes: ChangesInput = {
			owner,
			oldName: listName,
			newName: values.listName,
		};

		await queriesList.changeListName(changes);
		localStorage.setItem("wordList", JSON.stringify({ ...data, listName: values.listName }));

		setShowConfigs(false);

		router.push(newURL);
	};

	return <button onClick={() => changeListName()}>Salvar configs</button>;
};
