import { removeError, sendError } from './error';

export const verifyValues = (fields: { [key: string]: string | undefined }) => {
	const hasErrors = Object.values(fields).filter(value => value !== undefined);
	const errors = Object.entries(fields);

	if (hasErrors.length) {
		errors.forEach(([key, error]) => {
			error && sendError(error);
			error || removeError(key);
		});

		return true;
	}

	errors.forEach(([key, error]) => error || removeError(key));
	return false;
};
