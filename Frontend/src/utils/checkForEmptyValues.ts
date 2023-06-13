export const checkForEmptyValues = (values: { [key: string]: string }) => {
	const emptyValues: { [key: string]: string } = {};
	const entries = Object.entries(values);

	entries.forEach(([key, value]) => {
		if (!value) emptyValues[key] = "Este campo não pode ficar vazio";
	});

	return emptyValues;
};
