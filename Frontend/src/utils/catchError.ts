import { IErrorsCode } from "@/services/interfaces/errors";
import { errorsCode } from "@/services/interfaces/errors";

export const catchError = (e: string, entity: keyof IErrorsCode): string => {
	const [code] = e.split(":");
	const group = errorsCode[entity];
	const error = group[code as keyof typeof group];
	console.log(code);
	return error || errorsCode.default;
};
