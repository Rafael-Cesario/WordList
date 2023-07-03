import { StoreType } from "@/context/store";
import { onListLoad } from "@/features/list/context/oneListSlice";
import { client } from "@/services/client";
import { RGetOneList } from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useOneList = (listID: string, userID: string) => {
	const queriesList = new QueriesList();
	const globalState = useSelector((state: StoreType) => state.oneList);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const variables = { listID, userID };

	const requestGetOneList = async () => {
		const cache = client.readQuery<RGetOneList>({ query: queriesList.GET_ONE_LIST, variables });

		if (cache?.getOneList) {
			dispatch(onListLoad({ list: cache.getOneList }));
			setLoading(false);
			return;
		}

		const { data } = await client.query<RGetOneList>({ query: queriesList.GET_ONE_LIST, variables });
		if (data) dispatch(onListLoad({ list: data.getOneList }));

		setLoading(false);
	};

	useEffect(() => {
		requestGetOneList();
	}, []);

	// todo > if error send notification;
	// todo > add loading to global State.

	return { list: globalState.list, loading };
};
