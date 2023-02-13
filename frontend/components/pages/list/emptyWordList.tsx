import { useRouter } from "next/router";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledEmptyWordList } from "./styles/styledEmptyWordList";

interface PropsEmptyWordList {
	props: {
		index: number;
		status: string;
	};
}

export const EmptyWordList = ({ props: { index, status } }: PropsEmptyWordList) => {
	const router = useRouter();
	const { link } = useRouterQuery("");

	return (
		<StyledEmptyWordList className='list' onClick={() => router.push(`/${link}/${status}-${index}`)}>
			<p>Lista vazia</p>
		</StyledEmptyWordList>
	);
};
