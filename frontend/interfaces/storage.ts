import { TypeListStatus } from './interfaceWordList';

export interface IStorage {
	owner: string;
	listName: string;
	listIndex:string;
	listStatus: TypeListStatus;
}
