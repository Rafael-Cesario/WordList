import { useEffect, useState } from 'react';
import { getCookies } from '../../services/cookies';
import { createList, getLists } from '../../services/queries/queriesList';

type Lists = string[];
type SetLists = (lists: Lists) => void;

export const useLists = (initialState: []) => {
	const [lists, setLists] = useState<string[]>(initialState);
	const [firstLoad, setFirstLoad] = useState(false);

	const saveLists = async () => {
		const owner = (await getCookies('user')).data.cookie;
		const listName = lists[lists.length - 1];
		await createList({ owner, listName });
	};

	const loadLists = async () => {
		const owner = (await getCookies('user')).data.cookie;
		const lists = await getLists(owner);
		setLists(lists);
		setFirstLoad(false);
	};

	useEffect(() => {
		loadLists();
	}, []);

	useEffect(() => {
		if (!firstLoad) saveLists();
	}, [lists]);

	return [lists, setLists] as [Lists, SetLists];
};
