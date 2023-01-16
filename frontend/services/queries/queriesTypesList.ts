import { gql } from '@apollo/client';

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

export interface ChangesInput {
	owner: string;
	oldName: string;
	newName: string;
}

export const CHANGE_LIST_NAME = gql`
	mutation ChangeListName($changes: ChangesInput) {
		changeListName(changes: $changes) {
			message
		}
	}
`;

export interface DeleteListInput {
	owner: string;
	listName: string;
}

export const DELETE_LIST = gql`
	mutation DeleteList($owner: String!, $listName: String!) {
		deleteList(owner: $owner, listName: $listName) {
			message
		}
	}
`;
