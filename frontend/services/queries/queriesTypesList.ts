import { gql } from '@apollo/client';

export const CREATE_LIST = gql`
	mutation CreateList($newList: NewListInput!) {
		createList(newList: $newList) {
			message
		}
	}
`;
