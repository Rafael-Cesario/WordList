/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheList } from "@/services/cache/cacheList";
import { client } from "@/services/client";
import {
	ICreateList,
	IDeleteList,
	IList,
	IReadLists,
	IRenameList,
	IUpdateConfigs,
	RCreateList,
	RDeleteList,
	RReadLists,
	RRenameList,
	RUpdateConfigs,
} from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";
import { produce } from "immer";

export const useQueriesList = () => {
	const queriesList = new QueriesList();
	const cacheList = new CacheList();

	const [mutationCreateList] = useMutation<RCreateList>(queriesList.CREATE_LIST);
	const [mutationRenameList] = useMutation<RRenameList>(queriesList.RENAME_LIST);
	const [mutationDeleteList] = useMutation<RDeleteList>(queriesList.DELETE_LIST);
	const [mutationUpdateConfigs] = useMutation<RUpdateConfigs, IUpdateConfigs>(queriesList.UPDATE_CONFIGS);

	const requestCreateList = async ({ createList }: ICreateList) => {
		let list: IList = { userID: "", _id: "", name: "" };
		let error = "";

		try {
			const { data } = await mutationCreateList({ variables: { createList } });
			if (!data) throw new Error("Data is undefined");
			list = data.createList.list;

			const cache = cacheList.read(createList.userID);
			cache.readLists = [...cache.readLists, list];
			cacheList.update(createList.userID, cache);
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { list, error };
	};

	const requestReadLists = async (readLists: IReadLists) => {
		try {
			const cache = cacheList.read(readLists.userID);
			if (cache.readLists.length) return { lists: cache.readLists };

			const { data } = await client.query<RReadLists>({
				query: queriesList.READ_LISTS,
				variables: readLists,
			});

			const lists = data.readLists;
			return { lists };
		} catch (e: any) {
			return { error: "Um erro ocorreu tentando carregar suas listas, por favor recarregue a página." };
		}
	};

	const requestRenameList = async ({ renameList }: IRenameList) => {
		const message = "Sua lista foi renomeada";
		let error = "";

		try {
			await mutationRenameList({ variables: { renameList } });
			const cache = cacheList.read(renameList.userID);
			const listIndex = cache.readLists.findIndex((list) => list._id === renameList.ID);
			cache.readLists[listIndex].name = renameList.newName;
			cacheList.update(renameList.userID, cache);
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { message, error };
	};

	const requestDeleteList = async ({ deleteList }: IDeleteList) => {
		const message = "Sua lista foi deletada com sucesso";
		let error = "";

		try {
			await mutationDeleteList({ variables: { deleteList } });
			const cache = cacheList.read(deleteList.userID);
			const listIndex = cache.readLists.findIndex((list) => list._id === deleteList.ID);
			cache.readLists = produce(cache.readLists, (draft) => draft.splice(listIndex, 1));
			cacheList.update(deleteList.userID, cache);
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { message, error };
	};

	const requestUpdateConfigs = async ({ updateConfigs }: IUpdateConfigs) => {
		try {
			await mutationUpdateConfigs({ variables: { updateConfigs } });
			return { data: "Suas configurações foram salvas.", error: null };
		} catch (e: any) {
			const error = catchError(e.message, "list");
			return { data: "", error };
		}
	};

	return { requestCreateList, requestReadLists, requestRenameList, requestDeleteList, requestUpdateConfigs };
};
