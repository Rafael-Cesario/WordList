import { useRouter } from "next/router";
import { convertListName } from "../../../utils/convertListName";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { EmptyWordList } from "./emptyWordList";
import { StyledWordList } from "./styles/styledWordList";

interface PropsWordList {
	props: {
		index: number;
		list: string[][];
		status: string;
	};
}

export const WordList = ({ props: { index, list, status } }: PropsWordList) => {
	const router = useRouter();
	const { storage } = useLocalData();

	if (!list.length) return <EmptyWordList props={{ index, status }} />;

	const goToWordList = (listStatus: string, listIndex: string) => {
		const newStorage = JSON.stringify({ ...storage, listStatus, listIndex });
		localStorage.setItem("wordList", newStorage);

		const linkListName = convertListName(storage.listName);

		const url = `${linkListName}/wordList`;
		router.push(url);
	};

	return (
		<StyledWordList className='list' key={status + index} onClick={() => goToWordList(status, String(index))}>
			{list.map(([term, definition], index) => {
				return (
					<div key={index} className='words'>
						<p className='term'>{term}</p>
						<p className='definition'>{definition}</p>
					</div>
				);
			})}
		</StyledWordList>
	);
};
