import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.dto";
import { LoginData } from "./user.model";

@Resolver()
export class UserResolver {
	constructor(private userService: UserService) {}

	@Mutation(() => String)
	async createUser(@Args("createUserData") createUserData: CreateUserInput) {
		return this.userService.createUser(createUserData);
	}

	@Mutation(() => LoginData)
	async login(@Args("loginData") loginData: LoginInput) {
		return this.userService.login(loginData);
	}
}
