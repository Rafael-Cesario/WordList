import gql from "graphql-tag";
import request from "supertest-graphql";
import { IAddWords, RAddWords } from "../../../interfaces/word";

export class WordQueries {
	private ADD_WORDS = gql`
		mutation AddWords($addWords: IAddWords!) {
			addWords(addWords: $addWords) {
				message
			}
		}
	`;

	async addWords(url: string, { addWords }: IAddWords) {
		const { data, errors } = await request<RAddWords>(url).mutate(this.ADD_WORDS).variables({ addWords });
		return { data: data?.addWords.message, error: errors?.[0].message };
	}
}
