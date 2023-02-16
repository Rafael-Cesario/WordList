import { useRouter } from "next/router";
import { convertListName } from "../../../utils/convertListName";
import { useLists } from "../../../utils/hooks/useLists";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { StyledLists } from "./styles/styledLists";

export const Lists = () => {
	const router = useRouter();
	const { lists, isLoading, error } = useLists();
	const { storage } = useLocalData();

	if (isLoading) return <p>Carregando...</p>;
	if (error) return <p>Erro</p>;
	if (!lists.length) return <p>Você ainda não tem nenhuma lista</p>;

	const goToList = (listName: string) => {
		const newData = { ...storage, listName };
		const link = convertListName(listName);

		localStorage.setItem("wordList", JSON.stringify(newData));
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
