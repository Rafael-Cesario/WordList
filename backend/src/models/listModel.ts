import { prop, getModelForClass } from '@typegoose/typegoose';
import { ListType } from '../interfaces/listInterface';

export class List implements ListType {
	@prop({ type: String, required: [true, 'owner is required'], lowercase: true })
	public owner!: string;

	@prop({ type: String, required: [true, 'listName is required'], lowercase: true })
	public listName!: string;

	@prop({ type: Object, required: [true, 'wordLists is required'] })
	public wordLists!: {
		next: string[][][];
		current: string[][][];
		done: string[][][];
	};
}

export const ListModel = getModelForClass(List);
