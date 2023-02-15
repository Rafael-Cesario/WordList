import { useRouter } from "next/router";
import { IStorage } from "../../../interfaces/storage";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
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
	const { link } = useRouterQuery("");

	if (!list.length) return <EmptyWordList props={{ index, status }} />;

	const goToWordList = (listStatus: string, listIndex: string) => {
		const storage = localStorage.getItem("wordList");
		if (!storage) throw new Error("");

		const data = JSON.parse(storage) as IStorage;
		localStorage.setItem("wordList", JSON.stringify({ ...data, listStatus, listIndex }));

		const url = `/${link}/${listStatus}-${listIndex}`;
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
