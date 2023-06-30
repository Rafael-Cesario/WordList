"use client";
import { useSelector } from "react-redux";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { StoreType } from "@/context/store";
import { IWord } from "@/services/interfaces/words";

export const WordsContainer = () => {
	const { words } = useSelector((state: StoreType) => state.words);

	// todo > Tests. Move to separeted file.
	const groupWords = (words: IWord[]) => {
		const group = [];

		// todo > get words per wordlist from user configs
		let start = 0;
		const userWordsPerWordList = 20;

		while (start < words.length) {
			const groupSize = start + userWordsPerWordList;
			const slice = words.slice(start, groupSize);
			group.push(slice);
			start += userWordsPerWordList;
		}

		return group;
	};

	return (
		<StyledWordsContainer>
			<h1 className="group-title">Estudando</h1>

			<div className="container">
				{groupWords(words).map((group) => {
					return (
						<div key={group[0].term + "group"} className="group">
							{group.map((word) => {
								return (
									<div className="word" key={word.term + "word"}>
										<p className="term">{word.term}</p>
										<p className="definitions">{word.definitions}</p>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</StyledWordsContainer>
	);
};
