import { useEffect, useState } from "react";
import { IStorage } from "../../interfaces/storage";

export const useLocalData = () => {
	const [storage, setStorage] = useState<IStorage>({
		listIndex: "",
		listName: "",
		listStatus: "next",
		owner: "",
	});

	useEffect(() => {
		const storage = localStorage.getItem("wordList");
		if (!storage) return;

		const data = JSON.parse(storage) as IStorage;
		setStorage({ ...data });
	}, []);

	return { storage };
};
