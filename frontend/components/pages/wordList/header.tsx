import Link from "next/link";
import { useQueriesWordsSWR } from "../../../utils/hooks/useQueriesWords";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledHeader } from "./styles/styledHeader";

export const Header = () => {
	const { link, listName, listStatus } = useRouterQuery("Carregando...");
	const { words } = useQueriesWordsSWR();

	const status: { [key: string]: string } = {
		next: "Próximas",
		current: "Estudando",
		done: "Finalizadas",
	};

	return (
		<StyledHeader>
			<Link className='link' href={`/${link}`}>
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
