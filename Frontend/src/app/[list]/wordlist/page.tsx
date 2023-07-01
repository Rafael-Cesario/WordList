"use client";
import { WordListData } from "@/services/interfaces/list";
import { StorageKeys } from "@/services/interfaces/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultWordListData: WordListData = {
	_id: "",
	userID: "",
	groupIndex: 0,
	name: "",
	wordsPerWordList: 10,
	timesUntilLearning: 10,
	words: [],
};

const WordList = () => {
	const [wordListData, setWordListData] = useState<WordListData>(defaultWordListData);
	const router = useRouter();

	useEffect(() => {
		const wordListData = sessionStorage.getItem(StorageKeys.wordList);
		if (!wordListData) return router.push("/");
		setWordListData(JSON.parse(wordListData));
	}, []);

	return (
		<>
			<h1>WordList</h1>
			<p>{wordListData.groupIndex}</p>
		</>
	);
};

export default WordList;
