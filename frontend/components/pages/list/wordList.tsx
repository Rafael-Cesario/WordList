import { useRouter } from "next/router";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";

interface PropsWordList {
	props: {
		index: number;
		list: string[][];
	};
}

export const WordList = ({ props: { index, list } }: PropsWordList) => {
	const router = useRouter();
	const { link } = useRouterQuery("");

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
