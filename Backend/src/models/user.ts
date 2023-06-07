import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import { encryptPassword } from "../utils/crypt";

@pre<UserClass>("save", function () {
	this.password = encryptPassword(this.password);
})
class UserClass {
	@prop({ type: String, required: true, lowercase: true })
	public email!: string;

	@prop({ type: String, required: true })
	public password!: string;
}

export const UserModel = getModelForClass(UserClass, { options: { customName: "User" } });
