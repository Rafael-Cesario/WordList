import { gql } from "@apollo/client";

export class QueriesWords {
	ADD_WORDS = gql`
		mutation AddWords($addWords: IAddWords!) {
			addWords(addWords: $addWords) {
				message
			}
		}
	`;

	REMOVE_WORD = gql`
		mutation RemoveWord($removeWord: IRemoveWord!) {
			removeWord(removeWord: $removeWord) {
				message
			}
		}
	`;

	UPDATE_WORDS = gql`
		mutation UpdateWords($updateWords: IUpdateWords!) {
			updateWords(updateWords: $updateWords) {
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
				words
			}
		}
	`;
}
