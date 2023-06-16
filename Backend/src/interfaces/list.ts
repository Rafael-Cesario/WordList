export interface List {
	userID: string;
	ID: string;
	name: string;
}

export interface IReadLists {
	userID: string;
}

export interface RReadLists {
	readLists: List[];
}
