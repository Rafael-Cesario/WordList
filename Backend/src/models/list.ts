import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class ListClass {
	@prop({ type: mongoose.Types.ObjectId, required: true })
	public userID!: mongoose.Types.ObjectId;

	@prop({ type: String, required: true, lowercase: true })
	public name!: string;

	@prop({ type: mongoose.Schema.Types.Array, required: true })
	public words!: Word[];
}

class Word {
	@prop({ type: String, required: true, lowercase: true })
	public term!: string;

	@prop({ type: String, required: true, lowercase: true })
	public definitions!: string;

	@prop({ type: Number, required: true })
	public correctTimes!: number;

	@prop({ type: Boolean, required: true })
	public learned!: boolean;
}

export const ListModel = getModelForClass(ListClass, { options: { customName: "List" } });
