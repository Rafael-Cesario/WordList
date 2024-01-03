import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserInput, LoginInput } from "./user.dto";
import { PrismaService } from "src/prisma.service";
import { comparePasswords, hashPassword } from "src/utils/crypt";
import { generateToken } from "src/utils/token";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(createUserData: CreateUserInput) {
		const isDuplicated = await this.prisma.user.findFirst({ where: { email: createUserData.email } });
		if (isDuplicated) throw new ConflictException("duplicated: Email already in use.");

		createUserData.password = hashPassword(createUserData.password);

		await this.prisma.user.create({ data: createUserData });
		return `New user ${createUserData.name} created with success.`;
	}

	async login(loginData: LoginInput) {
		const { email, password } = loginData;

		const user = await this.prisma.user.findFirst({ where: { email } });
		if (!user) throw new UnauthorizedException("Unauthorized: Invalid Credentials");

		const isPasswordCorrect = comparePasswords(password, user.password);
		if (!isPasswordCorrect) throw new UnauthorizedException("Unauthorized: Invalid Credentials");

		const token = generateToken(email);
		delete user.password;

		return { ...user, token };
	}
}
