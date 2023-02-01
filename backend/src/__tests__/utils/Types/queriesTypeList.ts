export class QueriesTypeList {
	CREATE_LIST = `#graphql
		mutation CreateList ($newList: NewListInput!){
			createList(newList: $newList) {
				message
			}
		}
	`;

	CHANGE_LIST_NAME = `#graphql
		mutation ChangeListName ($changes: ChangesInput!) {
			changeListName (changes:$changes) {
				message
			}
		}
	`;

	DELETE_LIST = `#graphql
		mutation DeleteList ($owner: String!, $listName: String!) {
			deleteList(owner:$owner, listName:$listName) {
				message
			}
		}
	`;

	GET_LISTS = `#graphql
		query GetLists($owner:String!){
			getLists(owner:$owner) {
				lists
			}
		}
	`;
}
