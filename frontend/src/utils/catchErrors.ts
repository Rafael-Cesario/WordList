import { errorCodes } from "@/services/interfaces/errors";

export const catchErrors = (message: string, key: "user") => {
	const [code] = message.split(":");
	const errors = errorCodes[key];
	const errorMessage = errors[code as keyof typeof errors];
	return errorMessage || "Um erro inesperado ocorreu.";
};
