import { client } from "../client";
import { IReadLists, RReadLists } from "../interfaces/list";
import { QueriesList } from "../queries/list";

export class CacheList {
	private queriesList = new QueriesList();

	read(userID: string) {
		const cacheList = client.readQuery<RReadLists, IReadLists>({
			query: this.queriesList.READ_LISTS,
			variables: { userID },
		});

		return cacheList || { readLists: [] };
	}

	update(userID: string, cacheList: RReadLists) {
		client.writeQuery<RReadLists, IReadLists>({
			query: this.queriesList.READ_LISTS,
			variables: { userID },
			data: cacheList,
		});
	}
}
