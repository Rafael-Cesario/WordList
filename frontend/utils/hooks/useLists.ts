import { useEffect, useState } from "react";
import { getCookies } from "../../services/cookies";
import { queriesList } from "../../services/queries/queriesList";

type Lists = string[];
type SetLists = (lists: Lists) => void;

export const useLists = (initialState: string[]) => {
	const [lists, setLists] = useState<string[]>(initialState);

	const getLists = async () => {
		const owner = await getCookies("user");
		const getLists = await queriesList.getLists(owner);
		setLists(getLists.lists);
	};

	useEffect(() => {
		getLists();
	}, []);

	return [lists, setLists] as [Lists, SetLists];
};
