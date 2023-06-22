import gql from "graphql-tag";
import request from "supertest-graphql";
import { ICreateList, IReadLists, RCreateList, RReadLists } from "../../../interfaces/list";

export class ListQueries {
	private CREATE_LIST = gql`
		mutation CreateList($createList: ICreateList!) {
			createList(createList: $createList) {
				list {
					_id
					name
					userID
				}
			}
		}
	`;

	private READ_LISTS = gql`
		query ReadLists($userID: String!) {
			readLists(userID: $userID) {
				userID
				_id
				name
			}
		}
	`;

	async createList(url: string, { createList }: ICreateList) {
		const { data, errors } = await request<RCreateList>(url).mutate(this.CREATE_LIST).variables({ createList });
		return { data: data?.createList.list, error: errors?.[0].message };
	}

	async readLists(url: string, { userID }: IReadLists) {
		const { data, errors } = await request<RReadLists>(url).query(this.READ_LISTS).variables({ userID });
		return { data: data?.readLists, error: errors?.[0].message };
	}
}
