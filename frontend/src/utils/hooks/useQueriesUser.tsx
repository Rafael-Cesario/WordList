import { CreateUserInput, CreateUserResponse, LoginInput, LoginResponse } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { useMutation } from "@apollo/client";
import { catchErrors } from "../catchErrors";
import { useDispatch } from "react-redux";
import { setNotificationError } from "@/context/slices/notification-slice";

export const useQueriesUser = () => {
	const dispatch = useDispatch();

	const [createUser, { loading: createUserLoading }] = useMutation<CreateUserResponse, CreateUserInput>(
		userQueries.CREATE_USER
	);
	const [login, { loading: loginLoading }] = useMutation<LoginResponse, LoginInput>(userQueries.LOGIN);

	const createUserMutation = async (createUserData: CreateUserInput) => {
		try {
			await createUser({ variables: createUserData });
			return true;
		} catch (error: any) {
			const message = catchErrors(error.message, "user");
			dispatch(setNotificationError({ message }));
			return false;
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
