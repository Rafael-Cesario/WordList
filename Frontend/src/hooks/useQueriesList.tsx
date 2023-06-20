/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/services/client";
import { ICreateList, IList, IReadLists, RCreateList, RReadLists } from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesList = () => {
	const queriesList = new QueriesList();

	const [mutationCreateList] = useMutation<RCreateList>(queriesList.CREATE_LIST);

	const requestCreateList = async (createList: ICreateList) => {
		let list: IList = { userID: "", _id: "", name: "" };
		let error = "";

		try {
			const { data } = await mutationCreateList({ variables: createList });
			if (!data) throw new Error("Data is undefined");
			list = data.createList.list;
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
			console.log(`Read Lists: ${e.message}`);
			return { error: "Um erro ocorreu tentando carregar suas listas, por favor recarregue a página." };
		}
	};

	return { requestCreateList, requestReadLists };
};
