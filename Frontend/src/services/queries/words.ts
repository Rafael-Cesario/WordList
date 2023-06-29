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

	GET_WORDS = gql`
		query getWords($getWords: IGetWords!) {
			getWords(getWords: $getWords) {
				listName
				words {
					term
					definitions
					correctTimes
					learned
				}
			}
		}
	`;
}
