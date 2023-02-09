import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { ContextWords } from "./context/contextWords";
import { StyledHeader } from "./styles/styledHeader";

export const Header = () => {
	const { link, listName } = useRouterQuery("Carregando...");
	const [totalWords, setTotalWords] = useState(0);
	const { words } = useContext(ContextWords);

	useEffect(() => {
		setTotalWords(words.length);
	}, [words]);

	// todo > list status
	const listStatus = "Próximas";

	return (
		<StyledHeader>
			<Link className='link' href={`/${link}`}>
				Voltar
			</Link>
			<h1 className='title'>{listName}</h1>

			<div className='info'>
				<p>Palavras na lista: {totalWords}</p>
				<p>Estudar lista: {listStatus}</p>
			</div>
		</StyledHeader>
	);
};
