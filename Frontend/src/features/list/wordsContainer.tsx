"use client";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { groupWords } from "./utils/groupWords";
import { useOneList } from "@/hooks/list/useOneList";

interface Props {
	list: { listID: string; userID: string };
}

// todo > loading
export const WordsContainer = ({ list: { listID, userID } }: Props) => {
	const { list } = useOneList(listID, userID);
	const { words, wordsPerWordList } = list;

	return (
		<StyledWordsContainer>
			<h1 className="group-title">Estudando</h1>

			<div className="container">
				{groupWords(words, wordsPerWordList).map((group) => {
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
