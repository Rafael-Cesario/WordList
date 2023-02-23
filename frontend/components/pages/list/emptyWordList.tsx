import { useRouter } from "next/router";
import { convertListName } from "../../../utils/convertListName";
import { useLocalData } from "../../../utils/hooks/useLocalData";
import { StyledEmptyWordList } from "./styles/styledEmptyWordList";

interface PropsEmptyWordList {
	props: {
		index: number;
		status: string;
	};
}

export const EmptyWordList = ({ props: { index, status } }: PropsEmptyWordList) => {
	const router = useRouter();
	const { storage } = useLocalData();

	const goToWordList = (listStatus: string, listIndex: string) => {
		const newStorage = JSON.stringify({ ...storage, listStatus, listIndex });
		localStorage.setItem("wordList", newStorage);

		const linkListName = convertListName(storage.listName);

		const url = `${linkListName}/wordList`;
		router.push(url);
	};

	return (
		<StyledEmptyWordList className='list' onClick={() => goToWordList(status, String(index))}>
			<p role={"empty-list"}>Lista vazia</p>
		</StyledEmptyWordList>
	);
};
