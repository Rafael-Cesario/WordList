import { prop, index, pre, getModelForClass } from '@typegoose/typegoose';
import { encryptPassword } from '../utils/crypt';

@pre<User>('save', function () {
	const encryptedPassword = encryptPassword(this.password);
	this.password = encryptedPassword;
})
@index({ email: 1 }, { unique: true })
class User {
	@prop({ type: String, required: [true, 'Email is required'], lowercase: true })
	public email!: string;

	@prop({ type: String, required: [true, 'Name is required'], maxlength: 30 })
	public name!: string;

	@prop({ type: String, required: [true, 'Password is required'] })
	public password!: string;
}

export const UserModel = getModelForClass(User);
