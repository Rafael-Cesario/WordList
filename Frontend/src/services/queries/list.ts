import { gql } from "@apollo/client";

export class QueriesList {
	CREATE_LIST = gql`
		mutation CreateList($createList: ICreateList!) {
			createList(createList: $createList) {
				list {
					_id
					userID
					name
				}
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

	RENAME_LIST = gql`
		mutation RenameList($renameList: IRenameList!) {
			renameList(renameList: $renameList) {
				list {
					_id
					userID
					name
				}
			}
		}
	`;

	DELETE_LIST = gql`
		mutation DeleteList($deleteList: IDeleteList!) {
			deleteList(deleteList: $deleteList) {
				message
			}
		}
	`;

	GET_ONE_LIST = gql`
		query GetOneList($listID: String!, $userID: String!) {
			getOneList(listID: $listID, userID: $userID) {
				_id
				userID
				name
				wordsPerWordList
				timesUntilLearning
				words {
					term
					definitions
					learned
					correctTimes
				}
			}
		}
	`;
}
