"use client";
import { CookiesKeys } from "@/services/interfaces/storage";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { groupWords } from "./utils/groupWords";
import { useOneList } from "@/hooks/list/useOneList";
import { useRouter } from "next/navigation";
import { Cookies } from "@/services/cookies";

interface Props {
	list: { listID: string; userID: string };
}

// todo > loading
export const WordsContainer = ({ list: { listID, userID } }: Props) => {
	const { list } = useOneList(listID, userID);
	const { words, wordsPerWordList } = list;

	const router = useRouter();

	const goToWordList = (groupIndex: number) => {
		const indexStartOfGroup = groupIndex * wordsPerWordList;
		const indexEndOfGroup = indexStartOfGroup + wordsPerWordList;
		const wordsFromCurrentGroup = words.slice(indexStartOfGroup, indexEndOfGroup);

		const cookies = new Cookies();
		const wordListData = { ...list, words: wordsFromCurrentGroup, groupIndex };

		cookies.set(CookiesKeys.wordList, {
			key: CookiesKeys.wordList,
			maxAge: 60 * 60 * 24 * 7, // 7 Days
			value: JSON.stringify(wordListData),
		});

		const listNameAsLink = list.name.replaceAll(" ", "-");
		router.push(`/${listNameAsLink}/WordList`);
	};

	return (
		<StyledWordsContainer>
			<h1 className="group-title">Estudando</h1>

			<div className="container">
				{groupWords(words, wordsPerWordList).map((group, index) => {
					return (
						<div onClick={() => goToWordList(index)} key={group[0].term + "group"} className="group">
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
