import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./user.dto";
import { PrismaService } from "src/prisma.service";
import { hashPassword } from "src/utils/crypt";

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
}
