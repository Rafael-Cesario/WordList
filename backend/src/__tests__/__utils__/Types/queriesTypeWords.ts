export class QueriesTypeWords {
	GET_WORDS = `#graphql
		query GetWords($words:IGetWords!){
			getWords(words:$words){
				words
			}
		}
	`;

	ADD_WORDS = `#graphql
		mutation AddWords($words: IAddWords!){
			addWords(words:$words){
				message
			}
		}
	`;

	REMOVE_WORDS = `#graphql
		mutation RemoveWords($words: IRemoveWords!){
			removeWords(words:$words){
				message
			}
		}
	`;
	RENAME_WORDS = `#graphql
		mutation RenameWords($words: IRenameWords!){
			renameWords(words:$words){
				message
			}
		}
	`;
}
