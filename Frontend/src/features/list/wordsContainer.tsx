"use client";
import { useDispatch, useSelector } from "react-redux";
import { StyledWordsContainer } from "./styles/wordsContainerStyle";
import { StoreType } from "@/context/store";
import { groupWords } from "./utils/groupWords";
import { useQuery } from "@apollo/client";
import { QueriesList } from "@/services/queries/list";
import { useEffect } from "react";
import { onListLoad } from "./context/oneListSlice";
import { RGetOneList } from "@/services/interfaces/list";

interface Props {
	list: { listID: string; userID: string };
}

// todo > loading
export const WordsContainer = ({ list: { listID, userID } }: Props) => {
	const { list } = useSelector((state: StoreType) => state.oneList);
	const { words } = list;

	const queriesList = new QueriesList();
	const variables = { listID, userID };
	const { data, loading } = useQuery<RGetOneList>(queriesList.GET_ONE_LIST, { variables });
	const dispatch = useDispatch();

	useEffect(() => {
		const list = data?.getOneList;
		list && dispatch(onListLoad({ list }));
	}, [loading]);

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
