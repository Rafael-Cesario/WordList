import { useEffect, useState } from 'react';
import { getCookies } from '../../services/cookies';
import { queriesList } from '../../services/queries/queriesList';

type Lists = string[];
type SetLists = (lists: Lists) => void;

export const useLists = (initialState: []) => {
	const [lists, setLists] = useState<string[]>(initialState);
	const [firstLoad, setFirstLoad] = useState(true);

	const createList = async () => {
		if (firstLoad) return;
		const owner = (await getCookies('user')).data.cookie;
		const listName = lists[lists.length - 1];
		await queriesList.createList({ owner, listName });
	};

	const getLists = async () => {
		const owner = (await getCookies('user')).data.cookie;
		const lists = await queriesList.getLists(owner);
		setLists(lists);
		setFirstLoad(false);
	};

	useEffect(() => {
		getLists();
	}, []);

	useEffect(() => {
		createList();
	}, [lists]);

	return [lists, setLists] as [Lists, SetLists];
};
