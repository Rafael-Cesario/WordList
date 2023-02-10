/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChangeWordListStatus, ICreateWordList, IDeleteWordList, IGetWordLists } from "../../interfaces/interfaceWordList";
import { client } from "../client";
import { QueriesTypeWordList } from "./types/queriesTypeWordList";

const queriesTypeWordList = new QueriesTypeWordList();

export class QueriesWordList {
	async getWordLists(getWordLists: IGetWordLists) {
		try {
			const response = await client.query({
				query: queriesTypeWordList.GET_WORDlISTS,
				variables: { getWordLists },
			});

			return response.data.getWordLists;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async createWordList(wordList: ICreateWordList) {
		try {
			const response = await client.mutate({
				mutation: queriesTypeWordList.CREATE_WORDLIST,
				variables: { wordList },
			});

			return response.data.createWordList;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async deleteWordList(deleteWordList: IDeleteWordList) {
		try {
			const response = await client.mutate({
				mutation: queriesTypeWordList.DELETE_WORDLIST,
				variables: { deleteWordList },
			});

			return response.data.deleteWordList;
		} catch (error: any) {
			return { error: error.message };
		}
	}

	async changeWordListStatus(changeWordListStatus: IChangeWordListStatus) {
		try {
			const response = await client.mutate({
				mutation: queriesTypeWordList.CHANGE_WORDLIST_STATUS,
				variables: { changeWordListStatus },
			});

			return response.data.changeWordListStatus;
		} catch (error: any) {
			return { error: error.message };
		}
	}
}
