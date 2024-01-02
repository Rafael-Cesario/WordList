import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from "supertest-graphql";
import { userQueries } from "./__queries__/user";
import { CreateUserInput, CreateUserResponse } from "./__interfaces__/user";
import { PrismaService } from "src/prisma.service";

describe("User e2e", () => {
	let app: INestApplication;
	let prisma: PrismaService;

	const createUserRequest = async (variables: CreateUserInput) => {
		return await request<CreateUserResponse, CreateUserInput>(app.getHttpServer())
			.mutate(userQueries.CREATE_USER)
			.variables({ ...variables });
	};

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
		prisma = moduleFixture.get(PrismaService);
		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ transform: true }));
		await app.init();
	});

	describe("Create user", () => {
		afterEach(async () => {
			await prisma.user.deleteMany();
		});

		it("Saves all emails in lowercase", async () => {
			const createUserData = { email: "USER01@EMAIL.COM", name: "user01", password: "Password123" };
			await createUserRequest({ createUserData });
			const user = await prisma.user.findFirst({ where: { email: createUserData.email.toLowerCase() } });
			expect(user.email).toBe(createUserData.email.toLowerCase());
		});

		it.todo("Throws an error due to invalid email");

		it.todo("Throws an error due to name length");

		it.todo("Throws an error due to invalid password length or type");

		it.todo("Throws an error due to duplicated email");

		it.todo("Saves password as a hash");

		it.todo("Creates a new user");
	});
});
