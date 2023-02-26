import Link from "next/link";
import { convertListName } from "../../../utils/convertListName";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { StyledHeader } from "./styles/styledHeader";

export const Header = () => {
	const { words } = useQueriesWordsSWR();

	const { storage } = useLocalData();
	const link = convertListName(storage.listName);

	const status: { [key: string]: string } = {
		next: "Próximas",
		current: "Estudando",
		done: "Finalizadas",
	};

	return (
		<StyledHeader>
			<Link className='link' href={`${link}`}>
				Voltar
			</Link>
			<h1 role={"title"} className='title'>
				{storage.listName}
			</h1>

			<div className='info'>
				<p role={"user-words"}>Palavras na lista: {words?.length}</p>
				<p role={"list-status"}>Estudar lista: {status[storage.listStatus]}</p>
			</div>
		</StyledHeader>
	);
};
