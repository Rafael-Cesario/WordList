import { CreateUserInput, CreateUserResponse, LoginInput, LoginResponse } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { useMutation } from "@apollo/client";
import { catchErrors } from "../catchErrors";

export const useQueriesUser = () => {
	const [createUser, { loading: createUserLoading }] = useMutation<CreateUserResponse, CreateUserInput>(
		userQueries.CREATE_USER
	);
	const [login, { loading: loginLoading }] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);

	const createUserMutation = async (createUserData: CreateUserInput) => {
		let errorMessage = "";

		try {
			await createUser({ variables: createUserData });
		} catch (error: any) {
			errorMessage = catchErrors(error.message, "user");
		} finally {
			return { error: errorMessage };
		}
	};

	const loginMutation = async (loginData: LoginInput) => {
		let data: LoginResponse | undefined;
		let errorMessage = "";

		try {
			const response = await login({ variables: loginData });
			if (!response.data) throw new Error("Server didn't return data");
			data = response.data;
		} catch (error: any) {
			errorMessage = catchErrors(error.message, "user");
		} finally {
			return { data, error: errorMessage };
		}
	};

	return { createUserMutation, createUserLoading, loginMutation, loginLoading };
};
