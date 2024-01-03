import { Field, InputType, PickType } from "@nestjs/graphql";
import { IsString, Length, IsEmail, MinLength } from "class-validator";
import { Transform } from "class-transformer";

@InputType()
export class CreateUserInput {
	@Transform(({ value }) => value.toLowerCase())
	@IsEmail()
	@Field()
	email: string;

	@Length(3, 30)
	@Field()
	name: string;

	@IsString()
	@MinLength(10)
	@Field()
	password: string;
}

@InputType()
export class LoginInput extends PickType(CreateUserInput, ["email"]) {
	@IsString()
	@Field()
	password: string;
}
