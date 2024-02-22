import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
	@Field()
	id: string;

	@Field()
	email: string;

	@Field()
	name: string;

	@Field()
	password: string;
}

@ObjectType()
export class LoginData {
	@Field()
	id: string;

	@Field()
	email: string;

	@Field()
	name: string;

	@Field()
	token: string;
}
