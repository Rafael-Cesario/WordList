import { useRouter } from "next/router";
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

	return (
		<StyledWordList className='list' key={status + index} onClick={() => router.push(`/${link}/${status}-${index}`)}>
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
