/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { RequestDocument } from 'graphql-request/dist/types';
import { request } from 'graphql-request';
import { IStorage } from '../../interfaces/storage';
import { GET_LISTS } from '../../services/queries/types/queriesTypesList';

export const useLists = () => {
	const [owner, setOwner] = useState('');
	const fetcher = ([query, owner]: [RequestDocument, string]) => request('http://localhost:4000', query, { owner });
	const { data, error, isLoading, mutate } = useSWR([GET_LISTS, owner], fetcher);

	useEffect(() => {
		const storage = localStorage.getItem('wordList');
		if (!storage) return console.log('Error lists');

		const data = JSON.parse(storage) as IStorage;
		setOwner(data.owner);
	}, []);

	return {
		lists: data?.getLists.lists as string[],
		error,
		isLoading,
		mutate,
	};
};
