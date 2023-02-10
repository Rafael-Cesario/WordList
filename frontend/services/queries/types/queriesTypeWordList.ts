import { gql } from "@apollo/client";

export class QueriesTypeWordList {
	GET_WORDlISTS = gql`
		query GetWordLists($getWordLists: GetWordListInput!) {
			getWordLists(getWordLists: $getWordLists) {
				owner
				listName
				wordLists {
					next
					current
					done
				}
			}
		}
	`;

	CREATE_WORDLIST = gql`
		mutation CreateWordList($wordList: WordListInput!) {
			createWordList(wordList: $wordList) {
				message
			}
		}
	`;

	DELETE_WORDLIST = gql`
		mutation DeleteWordList($deleteWordList: IDeleteWordList!) {
			deleteWordList(deleteWordList: $deleteWordList) {
				message
			}
		}
	`;

	CHANGE_WORDLIST_STATUS = gql`
		mutation ChangeWordListStatus($changeWordListStatus: IChangeWordListStatus!) {
			changeWordListStatus(changeWordListStatus: $changeWordListStatus) {
				message
			}
		}
	`;
}
