import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { Configs } from "./configs";
import { ContextWordList } from "../../../contexts/contextWordList";
import { CreateWordList } from "./createWordList";
import { StyledHeader } from "./styles/styledHeader";

export const Header = () => {
	const { listName } = useRouterQuery("Carregando...");
	const [showConfigs, setShowConfigs] = useState(false);
	const [totalWords, setTotalWords] = useState(0);
	const { wordList } = useContext(ContextWordList);

	const getTotalWords = () => {
		const keys = Object.keys(wordList) as ("next" | "current" | "done")[];
		let count = 0;

		keys.forEach(key => {
			wordList[key].forEach(list => {
				count += list.length;
			});
		});

		setTotalWords(count);
	};

	useEffect(() => {
		getTotalWords();
	}, [wordList]);

	return (
		<StyledHeader>
			<Link href={"/main"}> Voltar </Link>

			<div className='title'>
				<h1>{listName}</h1>
				<span role={"wordsCount"}>{totalWords} palavras</span>
			</div>

			<div className='menus'>
				<CreateWordList />
				<button onClick={() => setShowConfigs(!showConfigs)}>Configs</button>
			</div>

			{showConfigs && <Configs props={{ setShowConfigs, listName }} />}
		</StyledHeader>
	);
};
