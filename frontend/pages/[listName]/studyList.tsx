import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHead } from "../../components/head/head";
import { EndList } from "../../components/pages/studyList/endList";
import { StudyContainer } from "../../components/pages/studyList/studyContainer";
import { StyledStudyList } from "../../components/pages/studyList/styles/styledStudyList";
import { TypeListStatus } from "../../interfaces/interfaceWordList";
import { QueriesWords } from "../../services/queries/queriesWords";
import { useLocalData } from "../../utils/hooks/useLocalData";
import { useRouterQuery } from "../../utils/hooks/useRouterQuery";

const StudyList = () => {
	const queriesWords = new QueriesWords();
	const { link } = useRouterQuery("");
	const { listIndex, listName, listStatus, owner } = useLocalData();
	const [haveListEnd, setHaveListEnd] = useState(true);
	const [words, setWords] = useState([["", ""]]);

	const getWords = async () => {
		if (!listName) return;

		const getWords = await queriesWords.getWords({
			words: {
				listIndex,
				listName,
				owner,
				status: listStatus as TypeListStatus,
			},
		});

		setWords(getWords.words);
	};

	useEffect(() => {
		getWords();
	}, [listName]);

	return (
		<StyledStudyList>
			<PageHead title={"WordList Study List"} />
			<Link href={`/${link}/${listStatus}-${listIndex}`}>Voltar</Link>

			{haveListEnd || <StudyContainer props={{ setHaveListEnd, setWords, words }} />}
			{haveListEnd && <EndList props={{ setHaveListEnd, setWords, words }} />}
		</StyledStudyList>
	);
};

export default StudyList;
