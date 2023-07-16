import { StoreType } from "@/context/store";
import { WordListData } from "@/services/interfaces/list";
import { StorageKeys } from "@/services/interfaces/storage";
import { IWord } from "@/services/interfaces/words";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
	words: IWord[][];
	title: string;
}

export const WordsGroup = ({ title, words }: Props) => {
	const { list } = useSelector((state: StoreType) => state.oneList);
	const router = useRouter();

	const goToWordList = (groupIndex: number) => {
		const wordListData: WordListData = {
			...list,
			groupIndex,
			words: words[groupIndex],
			answerWith: "definitions",
		};

		sessionStorage.setItem(StorageKeys.wordList, JSON.stringify(wordListData));

		const listNameAsLink = list.name.replaceAll(" ", "-");
		router.push(`/${listNameAsLink}/wordlist`);
	};

	return (
		<>
			<h1 className="group-title">{title}</h1>

			<div className="container">
				{words.map((group, index) => {
					return (
						<div role="words-group" onClick={() => goToWordList(index)} key={group[0].term + "group"} className="group">
							{group.map((word, index) => {
								return (
									<div className="word" key={word.term + "word" + index}>
										<p className="term">{word.term}</p>
										<p className="definitions">{word.definitions}</p>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</>
	);
};
