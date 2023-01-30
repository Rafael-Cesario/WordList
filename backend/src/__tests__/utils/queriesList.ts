import { server } from '../../app';
import { IChangeListName, ICreateList, IDeleteList, IGetLists } from './interfaces/interfacesList';
import { ResponseType } from './interfaces/queriesInterface';
import { QueriesTypeList } from './Types/queriesTypeList';

const queriesTypeList = new QueriesTypeList();

export class QueriesList {
	async createList(newList: ICreateList) {
		const response = (await server.executeOperation({
			query: queriesTypeList.CREATE_LIST,
			variables: { newList },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async changeListName(changes: IChangeListName) {
		const response = (await server.executeOperation({
			query: queriesTypeList.CHANGE_LIST_NAME,
			variables: { changes },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async deleteList({ owner, listName }: IDeleteList) {
		const response = (await server.executeOperation({
			query: queriesTypeList.DELETE_LIST,
			variables: { owner, listName },
		})) as ResponseType;

		return response.body.singleResult;
	}

	async getLists({ owner }: IGetLists) {
		const response = (await server.executeOperation({
			query: queriesTypeList.GET_LISTS,
			variables: { owner },
		})) as ResponseType;

		return response.body.singleResult;
	}
}
