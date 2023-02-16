export const convertListName = (listName: string) => {
	const newListName = "/" + listName.replace(/-/g, "_").replace(/ /g, "-");
	return newListName;
};
