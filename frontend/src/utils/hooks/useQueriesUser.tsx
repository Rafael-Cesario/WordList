import { CreateUserInput, CreateUserResponse } from "@/services/interfaces/user";
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

	return { createUserMutation, createUserLoading };
};
