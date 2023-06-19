import { ICreateList } from "@/services/interfaces/list";
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

	return { requestCreateList };
};
