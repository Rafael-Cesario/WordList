import { ICreateList } from "@/services/interfaces/list";
import { QueriesList } from "@/services/queries/list";
import { useMutation } from "@apollo/client";

export const useQueriesList = () => {
	const queriesList = new QueriesList();

	const [mutationCreateList] = useMutation(queriesList.CREATE_LIST);

	const requestCreateList = async (createList: ICreateList) => {
		const response = await mutationCreateList({ variables: createList });
		console.log({ response });
		return response;
	};

	return { requestCreateList };
};
