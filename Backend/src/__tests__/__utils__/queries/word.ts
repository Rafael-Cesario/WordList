import gql from "graphql-tag";
import request from "supertest-graphql";
import { IAddWords, IRemoveWord, IUpdateWords, RAddWords, RRemoveWord, RUpdateWords } from "../../../interfaces/word";

export class WordQueries {
	private ADD_WORDS = gql`
		mutation AddWords($addWords: IAddWords!) {
			addWords(addWords: $addWords) {
				message
			}
		}
	`;

	private REMOVE_WORD = gql`
		mutation RemoveWord($removeWord: IRemoveWord!) {
			removeWord(removeWord: $removeWord) {
				message
			}
		}
	`;

	private UPDATE_WORDS = gql`
		mutation UpdateWords($updateWords: IUpdateWords!) {
			updateWords(updateWords: $updateWords) {
				message
			}
		}
	`;

	async addWords(url: string, { addWords }: IAddWords) {
		const { data, errors } = await request<RAddWords>(url).mutate(this.ADD_WORDS).variables({ addWords });
		return { data: data?.addWords.message, error: errors?.[0].message };
	}

	async removeWord(url: string, { removeWord }: IRemoveWord) {
		const { data, errors } = await request<RRemoveWord>(url).mutate(this.REMOVE_WORD).variables({ removeWord });
		return { data: data?.removeWord.message, error: errors?.[0].message };
	}

	async updateWords(url: string, { updateWords }: IUpdateWords) {
		const { data, errors } = await request<RUpdateWords>(url).mutate(this.UPDATE_WORDS).variables({ updateWords });
		return { data: data?.updateWords.message, error: errors?.[0].message };
	}
}
