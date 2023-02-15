import { useEffect, useState } from "react";

export const useLocalData = () => {
	const [{ listName, listIndex, listStatus, owner }, setData] = useState({ listIndex: "0", listName: "", listStatus: "next", owner: "" });

	const getDataFromLocalStorage = () => {
		const storage = localStorage.getItem("wordList");

		// todo > send a message to user telling him that his data cannot be recovered and send him back to the previous page.
		if (!storage) return console.log("Error");

		const data = JSON.parse(storage);
		setData(data);
	};

	useEffect(() => {
		getDataFromLocalStorage();
	}, []);

	return { listName, listIndex, listStatus, owner };
};
