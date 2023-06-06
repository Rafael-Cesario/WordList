import { prop, getModelForClass } from "@typegoose/typegoose";

class UserClass {
	@prop({ type: String, required: true, lowercase: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;
}

export const UserModel = getModelForClass(UserClass, { options: { customName: "User" } });
