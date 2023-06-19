/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/services/client";
import { ICreateList, IReadLists, RReadLists } from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesList = () => {
	const queriesList = new QueriesList();

	const [mutationCreateList] = useMutation(queriesList.CREATE_LIST);

	const requestCreateList = async (createList: ICreateList) => {
		const message = "Uma nova lista foi criada";
		let error = "";

		await mutationCreateList({ variables: createList }).catch((e) => {
			error = catchError(e.message, "list");
		});

		return { message, error };
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
