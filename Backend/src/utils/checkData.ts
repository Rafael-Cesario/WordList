// todo > Tests
export const checkData = (data: object) => {
	const entries = Object.entries(data);
	const errors: string[] = [];

	entries.forEach(([key, value]) => {
		if (!value) errors.push(`${key} was not provided`);
	});

	return errors.join(", ");
};
