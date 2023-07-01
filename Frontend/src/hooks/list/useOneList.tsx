import { StoreType } from "@/context/store";
import { onListLoad } from "@/features/list/context/oneListSlice";
import { RGetOneList } from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useOneList = (listID: string, userID: string) => {
	const globalState = useSelector((state: StoreType) => state.oneList);
	const queriesList = new QueriesList();
	const variables = { listID, userID };
	const { data, loading } = useQuery<RGetOneList>(queriesList.GET_ONE_LIST, { variables });
	const list = data?.getOneList;
	const dispatch = useDispatch();

	// todo > if error send notification;
	// todo > add loading to global State.

	useEffect(() => {
		list && dispatch(onListLoad({ list }));
	}, [loading]);

	return { list: list || globalState.list, loading };
};
