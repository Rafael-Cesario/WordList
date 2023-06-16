import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class ListClass {
	@prop({ type: mongoose.Types.ObjectId, required: true })
	public userID!: mongoose.Types.ObjectId;

	@prop({ type: String, required: true, lowercase: true })
	public name!: string;
}

export const ListModel = getModelForClass(ListClass, { options: { customName: "List" } });
