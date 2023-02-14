import Link from "next/link";
import { useContext } from "react";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledHeader } from "./styles/styledHeader";
import { ContextWords } from "../../../contexts/contextWords";

export const Header = () => {
	const { link, listName, listStatus } = useRouterQuery("Carregando...");
	const { words } = useContext(ContextWords);

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
