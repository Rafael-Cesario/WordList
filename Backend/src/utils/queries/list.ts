import gql from "graphql-tag";
import request from "supertest-graphql";
import { ICreateList, RCreateList } from "../../interfaces/list";

export class ListQueries {
	private CREATE_LIST = gql`
		mutation CreateList($createList: ICreateList!) {
			createList(createList: $createList) {
				message
			}
		}
	`;

	async createList(url: string, { createList }: ICreateList) {
		const { data, errors } = await request<RCreateList>(url).mutate(this.CREATE_LIST).variables({ createList });
		return { data: data?.createList.message, error: errors?.[0].message };
	}
}
