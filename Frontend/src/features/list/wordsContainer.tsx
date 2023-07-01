"use client";
import { useSelector } from "react-redux";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { StoreType } from "@/context/store";
import { groupWords } from "./utils/groupWords";
import { useQuery } from "@apollo/client";
import { QueriesList } from "@/services/queries/list";

interface Props {
	list: { listID: string; userID: string };
}

export const WordsContainer = ({ list: { listID, userID } }: Props) => {
	const { words } = useSelector((state: StoreType) => state.words);

	const queriesList = new QueriesList();
	const variables = { listID, userID };
	const { data, loading, error } = useQuery(queriesList.GET_ONE_LIST, { variables });
	console.log({ data, loading, error });

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
