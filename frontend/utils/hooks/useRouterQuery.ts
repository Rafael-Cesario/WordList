import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRouterQuery = (initialState: string) => {
	const [listName, setListName] = useState(initialState);
	const router = useRouter();

	const getListName = () => {
		const query = router.query.listName as string;
		const listName = query.replace(/-/g, ' ').replace(/_/g, '-');
		setListName(listName);
	};

	useEffect(() => {
		if (router.isReady) getListName();
	}, [router]);

	return [listName, setListName] as [string, (newName: string) => void];
};
