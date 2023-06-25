/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/services/client";
import {
	ICreateList,
	IDeleteList,
	IList,
	IReadLists,
	IRenameList,
	RCreateList,
	RDeleteList,
	RReadLists,
	RRenameList,
} from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesList = () => {
	const queriesList = new QueriesList();

	const [mutationCreateList] = useMutation<RCreateList>(queriesList.CREATE_LIST);
	const [mutationRenameList] = useMutation<RRenameList>(queriesList.RENAME_LIST);
	const [mutationDeleteList] = useMutation<RDeleteList>(queriesList.DELETE_LIST);

	const readListCache = (userID: string) => {
		const cacheList = client.readQuery<RReadLists, IReadLists>({
			query: queriesList.READ_LISTS,
			variables: { userID },
		});

		return cacheList || { readLists: [] };
	};

	const requestCreateList = async ({ createList }: ICreateList) => {
		let list: IList = { userID: "", _id: "", name: "" };
		let error = "";

		try {
			const { data } = await mutationCreateList({ variables: { createList } });
			if (!data) throw new Error("Data is undefined");
			list = data.createList.list;

			const cacheList = readListCache(createList.userID);
			cacheList.readLists.push(list);

			client.writeQuery<RReadLists, IReadLists>({
				query: queriesList.READ_LISTS,
				variables: { userID: createList.userID },
				data: cacheList,
			});
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { list, error };
	};

	const requestReadLists = async (readLists: IReadLists) => {
		try {
			const { data } = await client.query<RReadLists>({ query: queriesList.READ_LISTS, variables: readLists });
			const lists = data.readLists;
			return { lists };
		} catch (e: any) {
			return { error: "Um erro ocorreu tentando carregar suas listas, por favor recarregue a página." };
		}
	};

	const requestRenameList = async (renameList: IRenameList) => {
		const message = "Sua lista foi renomeada";
		let error = "";

		try {
			await mutationRenameList({ variables: renameList });
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { message, error };
	};

	const requestDeleteList = async (deleteList: IDeleteList) => {
		const message = "Sua lista foi deletada com sucesso";
		let error = "";

		try {
			await mutationDeleteList({ variables: deleteList });
		} catch (e: any) {
			error = catchError(e.message, "list");
		}

		return { message, error };
	};

	return { requestCreateList, requestReadLists, requestRenameList, requestDeleteList };
};
