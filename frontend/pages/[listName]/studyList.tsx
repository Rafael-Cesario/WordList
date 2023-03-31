import Link from 'next/link';
import { useState } from 'react';
import { PageHead } from '../../components/head/head';
import { EndList } from '../../components/pages/studyList/endList';
import { StudyContainer } from '../../components/pages/studyList/studyContainer';
import { StyledStudyList } from '../../components/pages/studyList/styles/styledStudyList';
import { convertListName } from '../../utils/convertListName';
import { useLocalData } from '../../utils/hooks/useLocalData';
import { useQueriesWordsSWR } from '../../utils/hooks/useQueriesWords';

const StudyList = () => {
	const { words, isLoading } = useQueriesWordsSWR();

	const { storage } = useLocalData();
	const link = convertListName(storage.listName);

	const [haveListEnd, setHaveListEnd] = useState(false);

	if (isLoading || !words) return <p>Carregando</p>;

	return (
		<StyledStudyList>
			<PageHead title={'WordList Study List'} />
			<Link href={`/${link}/wordList`}>Voltar</Link>

			{haveListEnd || <StudyContainer props={{ setHaveListEnd, words }} />}
			{haveListEnd && <EndList props={{ words }} />}
		</StyledStudyList>
	);
};

export default StudyList;
