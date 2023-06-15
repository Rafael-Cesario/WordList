/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateUser, ILogin, RCreateUser, RLogin } from "@/services/interfaces/user";
import { QueriesUser } from "@/services/queries/user";
import { catchError } from "@/utils/catchError";
import { useMutation } from "@apollo/client";

export const useQueriesUser = () => {
	const queriesUser = new QueriesUser();

	const [mutationCreateUser] = useMutation<RCreateUser, ICreateUser>(queriesUser.CREATE_USER);
	const [mutationLogin] = useMutation<RLogin, ILogin>(queriesUser.LOGIN);

	const requestCreateUser = async (createUser: ICreateUser) => {
		try {
			await mutationCreateUser({ variables: createUser });
			return { success: "success" };
		} catch (e: any) {
			return { error: catchError(e.message, "user") };
		}
	};

	const requestLogin = async (login: ILogin) => {
		try {
			const { data } = await mutationLogin({ variables: login });
			return { token: data?.login.token };
		} catch (e: any) {
			return { error: catchError(e.message, "user") };
		}
	};

	return { requestCreateUser, requestLogin };
};
