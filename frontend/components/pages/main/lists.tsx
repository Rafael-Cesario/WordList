import { useRouter } from "next/router";
import { useLists } from "../../../utils/hooks/useLists";
import { StyledLists } from "./styles/styledLists";

export const Lists = () => {
	const router = useRouter();
	const { lists, isLoading, error } = useLists();

	// todo > error and is loading
	if (isLoading) return <p>Carregando...</p>;
	if (error) return <p>Erro</p>;

	return (
		<StyledLists>
			{lists.map(list => {
				const link = "/" + list.replace(/-/g, "_").replace(/ /g, "-");

				return (
					<button onClick={() => router.push(link)} key={list} title={"List"}>
						{list}
					</button>
				);
			})}
		</StyledLists>
	);
};
