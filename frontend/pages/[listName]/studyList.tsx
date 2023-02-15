import Link from "next/link";
import { useState } from "react";
import { PageHead } from "../../components/head/head";
import { EndList } from "../../components/pages/studyList/endList";
import { StudyContainer } from "../../components/pages/studyList/studyContainer";
import { StyledStudyList } from "../../components/pages/studyList/styles/styledStudyList";
import { useLocalData } from "../../utils/hooks/useLocalData";
import { useQueriesWordsSWR } from "../../utils/hooks/useQueriesWords";
import { useRouterQuery } from "../../utils/hooks/useRouterQuery";

const StudyList = () => {
	const { link } = useRouterQuery("");
	const { listIndex, listStatus } = useLocalData();
	const [haveListEnd, setHaveListEnd] = useState(false);
	const { words, isLoading } = useQueriesWordsSWR();

	if (isLoading) return <p>Carregando</p>;

	return (
		<StyledStudyList>
			<PageHead title={"WordList Study List"} />
			<Link href={`/${link}/${listStatus}-${listIndex}`}>Voltar</Link>

			{haveListEnd || <StudyContainer props={{ setHaveListEnd, words }} />}
			{haveListEnd && <EndList props={{ words }} />}
		</StyledStudyList>
	);
};

export default StudyList;
