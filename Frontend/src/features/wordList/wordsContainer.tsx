"use client";

import { StoreType } from "@/context/store";
import { useSelector } from "react-redux";
import { StyledWordsContainer } from "./styles/wordsContianerStyle";

export const WordsContainer = () => {
	const { wordList } = useSelector((state: StoreType) => state.wordList);

	return (
		<StyledWordsContainer>
			{wordList.words.map((word) => {
				return (
					<div className="group" key={word.term}>
						<p className="word">{word.term}</p>
						<p className="word">{word.definitions}</p>
					</div>
				);
			})}
		</StyledWordsContainer>
	);
};
