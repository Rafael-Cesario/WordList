import { useRouter } from "next/router";
import { IStorage } from "../../../interfaces/storage";
import { useLists } from "../../../utils/hooks/useLists";
import { StyledLists } from "./styles/styledLists";

export const Lists = () => {
	const router = useRouter();
	const { lists, isLoading, error } = useLists();

	// todo > error and is loading
	if (isLoading) return <p>Carregando...</p>;
	if (error) return <p>Erro</p>;

	const goToList = (listName: string) => {
		const storage = localStorage.getItem("wordList");
		if (!storage) return console.log("Error");

		const data = JSON.parse(storage) as IStorage;
		const newData = { ...data, listName };
		localStorage.setItem("wordList", JSON.stringify(newData));

		const link = "/" + listName.replace(/-/g, "_").replace(/ /g, "-");
		router.push(link);
	};

	return (
		<StyledLists>
			{lists.map(listName => {
				return (
					<button onClick={() => goToList(listName)} key={listName} title={"List"}>
						{listName}
					</button>
				);
			})}
		</StyledLists>
	);
};
