import { ICreateUser, RCreateUser } from "@/services/interfaces/user";
import { QueriesUser } from "@/services/queries/user";
import { useMutation } from "@apollo/client";

export const useQueriesUser = () => {
	const queriesUser = new QueriesUser();

	const [mutationCreateUser] = useMutation<RCreateUser, ICreateUser>(queriesUser.CREATE_USER);

	const requestCreateUser = async (createUser: ICreateUser) => {
		const response = await mutationCreateUser({ variables: createUser }).catch((e) => console.log(e.message));
		console.log({ response });
	};

	return { requestCreateUser };
};
