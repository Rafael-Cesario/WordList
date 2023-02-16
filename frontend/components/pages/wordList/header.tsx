import Link from "next/link";
import { convertListName } from "../../../utils/convertListName";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { StyledHeader } from "./styles/styledHeader";

export const Header = () => {
	const { words } = useQueriesWordsSWR();

	const { storage } = useLocalData();
	const { listName, listStatus } = storage;
	const link = convertListName(listName);

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
			<h1 className='title'>{listName}</h1>

			<div className='info'>
				<p>Palavras na lista: {words?.length}</p>
				<p>Estudar lista: {status[listStatus]}</p>
			</div>
		</StyledHeader>
	);
};
