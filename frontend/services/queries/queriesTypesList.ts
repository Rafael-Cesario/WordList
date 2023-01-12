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
