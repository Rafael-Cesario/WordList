import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
	mutation CreateList($newList: NewListInput!) {
		createList(newList: $newList) {
			message
		}
	}
`;

export const GET_LISTS = gql`
	query GetLists($owner: String!) {
		getLists(owner: $owner) {
			lists
		}
	}
`;

export const CHANGE_LIST_NAME = gql`
	mutation ChangeListName($changes: ChangesInput) {
		changeListName(changes: $changes) {
			message
		}
	}
`;

export const DELETE_LIST = gql`
	mutation DeleteList($owner: String!, $listName: String!) {
		deleteList(owner: $owner, listName: $listName) {
			message
		}
	}
`;

export const CREATE_WORD_LIST = gql`
	mutation CreateWordList($wordList: WordListInput!) {
		createWordList(wordList: $wordList) {
			message
		}
	}
`;

export const GET_WORD_LISTS = gql`
	query GetWordLists($getWordLists: GetWordListInput!) {
		getWordLists(getWordLists: $getWordLists) {
			listName
			owner
			wordLists {
				next
				current
				done
			}
		}
	}
`;
