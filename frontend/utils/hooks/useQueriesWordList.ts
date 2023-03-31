import useSWR from 'swr';
import { request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { QueriesTypeWordList } from '../../services/queries/types/queriesTypeWordList';
import { useEffect, useState } from 'react';
import { IStorage } from '../../interfaces/storage';
import { IGetWordLists } from '../../interfaces/interfaceWordList';

export const useQueriesWordListSWR = () => {
	const [{ listName, owner }, setStorage] = useState<IStorage>({ listName: '', owner: '', listIndex: '', listStatus: 'next' });
	const queriesTypeWordList = new QueriesTypeWordList();

	const getWordLists = { listName, owner };

	const fetcher = ([query, getWordLists]: [RequestDocument, IGetWordLists]) => request('http://localhost:4000', query, { getWordLists });

	const { data, error, isLoading, mutate } = useSWR([queriesTypeWordList.GET_WORDlISTS, getWordLists], fetcher);

	useEffect(() => {
		const storage = localStorage.getItem('wordList');
		if (!storage) return console.log('Error lists');

		const data = JSON.parse(storage) as IStorage;
		setStorage(data);
	}, []);

	return {
		data: data?.getWordLists?.wordLists,
		error,
		isLoading,
		mutate,
	};
};
