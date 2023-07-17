"use client";
import { useDispatch, useSelector } from "react-redux";
import { StyledMenu } from "./styles/menuStyle";
import { setSearch } from "./context/searchSlice";
import { StoreType } from "@/context/store";
import { AnswerWith, WordListData, mapAnswerWith } from "@/services/interfaces/list";
import { setAnswerWith } from "./context/wordListSlice";
import { StorageKeys } from "@/services/interfaces/storage";
import Link from "next/link";

export const Menu = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);
	const listNameLink = wordList.name.replaceAll(" ", "-");
	const dispatch = useDispatch();

	const changeAnswerWith = () => {
		const newAnswerWith: AnswerWith = wordList.answerWith === "definitions" ? "term" : "definitions";
		dispatch(setAnswerWith({ newAnswerWith }));

		const newStorage: WordListData = { ...wordList, answerWith: newAnswerWith };
		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(newStorage));
	};

	return (
		<StyledMenu>
			<div className="buttons">
				<Link href={`/${listNameLink}/wordlist/question`}>Estudar palavras</Link>
				<button role="answer-with" onClick={() => changeAnswerWith()}>
					Responder com: {mapAnswerWith[wordList.answerWith]}
				</button>
			</div>

			<input
				id="search-input"
				onChange={(e) => dispatch(setSearch({ newSearchValue: e.target.value }))}
				className="search"
				type="text"
				placeholder="Procure por uma palavra ou sua tradução..."
			/>

			<div className="line" />
		</StyledMenu>
	);
};
