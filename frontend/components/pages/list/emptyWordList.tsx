import { useRouter } from "next/router";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledEmptyWordList } from "./styles/styledEmptyWordList";

interface PropsEmptyWordList {
	props: {
		index: number;
	};
}

export const EmptyWordList = ({ props: { index } }: PropsEmptyWordList) => {
	const router = useRouter();
	const { link } = useRouterQuery("");

	return (
		<StyledEmptyWordList className='list' onClick={() => router.push(`/${link}/${index}`)}>
			<p>Lista vazia</p>
		</StyledEmptyWordList>
	);
};
