import { useRouter } from "next/router";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { EmptyWordList } from "./emptyWordList";

interface PropsWordList {
	props: {
		index: number;
		list: string[][];
	};
}

export const WordList = ({ props: { index, list } }: PropsWordList) => {
	const router = useRouter();
	const { link } = useRouterQuery("");

	if (!list.length) return <EmptyWordList props={{ index }} />;

	return (
		<div className='list' key={"next" + index} onClick={() => router.push(`/${link}/${index}`)}>
			{list.map(([term, definition], index) => {
				return (
					<div key={index} className='words'>
						<p className='term'>{term}</p>
						<p className='definition'>{definition}</p>
					</div>
				);
			})}
		</div>
	);
};
