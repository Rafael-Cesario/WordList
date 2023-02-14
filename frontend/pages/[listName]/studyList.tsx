import Link from "next/link";
import { PageHead } from "../../components/head/head";
import { StudyContainer } from "../../components/pages/studyList/studyContainer";
import { StyledStudyList } from "../../components/pages/studyList/styles/styledStudyList";
import { useLocalData } from "../../utils/hooks/useLocalData";
import { useRouterQuery } from "../../utils/hooks/useRouterQuery";

const StudyList = () => {
	const { link } = useRouterQuery("");
	const { listStatus, listIndex } = useLocalData();

	return (
		<StyledStudyList>
			<PageHead title={"WordList Study List"} />
			<Link href={`/${link}/${listStatus}-${listIndex}`}>Voltar</Link>
			<StudyContainer />
		</StyledStudyList>
	);
};

export default StudyList;
