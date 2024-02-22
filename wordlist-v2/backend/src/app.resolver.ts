import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
	constructor() {}

	@Query(() => String)
	async hello() {
		return "Hello Wordlist v2";
	}
}
