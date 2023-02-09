import { gql } from "@apollo/client";

export class QueriesTypeWords {
	GET_WORDS = gql`
		query GetWords($words: IGetWords!) {
			getWords(words: $words) {
				words
			}
		}
	`;

	ADD_WORDS = gql`
		mutation AddWords($words: IAddWords!) {
			addWords(words: $words) {
				message
			}
		}
	`;

	REMOVE_WORDS = gql`
		mutation RemoveWords($words: IRemoveWords!) {
			removeWords(words: $words) {
				message
			}
		}
	`;
	RENAME_WORDS = gql`
		mutation RenameWords($words: IRenameWords!) {
			renameWords(words: $words) {
				message
			}
		}
	`;
}
