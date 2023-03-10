export class QueriesTypeWordList {
	GET_WORD_LISTS = `#graphql
		query GetWordLists ($getWordLists: GetWordListInput!){
			getWordLists(getWordLists: $getWordLists){
				owner, listName, wordLists {
					next, current, done
				}
			}
		}
	`;

	CREATE_WORD_LIST = `#graphql
		mutation CreateWordList($wordList:WordListInput!){
			createWordList(wordList:$wordList){
				message
			}
		}
	`;

	DELETE_WORDLIST = `#graphql
		mutation DeleteWordList($deleteWordList: IDeleteWordList!) {
			deleteWordList(deleteWordList: $deleteWordList) {
				message
			}
		}
	`;

	CHANGE_WORDLIST_STATUS = `#graphql
		mutation ChangeWordListStatus($changeWordListStatus: IChangeWordListStatus!){
			changeWordListStatus(changeWordListStatus: $changeWordListStatus){
				message
			}
		}
	`;
}
