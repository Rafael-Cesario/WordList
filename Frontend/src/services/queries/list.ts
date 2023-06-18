import { gql } from "@apollo/client";

export class QueriesList {
	CREATE_LIST = gql`
		mutation CreateList($createList: ICreateList!) {
			createList(createList: $createList) {
				message
			}
		}
	`;

	READ_LISTS = gql`
		query ReadLists($userID: String!) {
			readLists(userID: $userID) {
				userID
				_id
				name
			}
		}
	`;
}
