import Link from "next/link";
import { useEffect, useState } from "react";
import { Configs } from "./configs";
import { CreateWordList } from "./createWordList";
import { StyledHeader } from "./styles/styledHeader";
import { useQueriesWordListSWR } from "../../../utils/hooks/useQueriesWordList";
import { useLocalData } from "../../../utils/hooks/useLocalData";

export const Header = () => {
	const { storage } = useLocalData();
	const { listName } = storage;

	const [showConfigs, setShowConfigs] = useState(false);
	const [totalWords, setTotalWords] = useState(0);

	const { data: wordLists } = useQueriesWordListSWR();

	const getTotalWords = () => {
		if (!wordLists) return;

		const keys = Object.keys(wordLists) as ("next" | "current" | "done")[];
		let count = 0;

		keys.forEach(key => {
			wordLists[key].forEach((list: string[]) => {
				count += list.length;
			});
		});

		setTotalWords(count);
	};

	useEffect(() => {
		getTotalWords();
	}, [wordLists]);

	return (
		<StyledHeader>
			<Link href={"/main"}> Voltar </Link>

			<div className='title'>
				<h1 role={"listName"}>{listName}</h1>
				<span role={"words-count"}>{totalWords} palavras</span>
			</div>

			<div className='menus'>
				<CreateWordList />
				<button onClick={() => setShowConfigs(!showConfigs)}>Configs</button>
			</div>

			{showConfigs && <Configs props={{ setShowConfigs, listName }} />}
		</StyledHeader>
	);
};
