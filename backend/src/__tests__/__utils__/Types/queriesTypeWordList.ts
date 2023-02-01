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
}
