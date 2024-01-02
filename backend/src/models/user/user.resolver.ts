import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserInput } from "./user.dto";

@Resolver()
export class UserResolver {
  constructor (private userService: UserService) {}

  @Mutation(() => String)
  async createUser (@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}