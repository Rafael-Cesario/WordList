"use client";
import { StorageKeys } from "@/services/interfaces/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setWordList } from "./context/wordListSlice";
import { useDispatch } from "react-redux";

export const Loader = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const wordListData = sessionStorage.getItem(StorageKeys.wordList);
		if (!wordListData) return router.push("/");
		const wordList = JSON.parse(wordListData);
		dispatch(setWordList({ wordList }));
	}, []);

	return <></>;
};
