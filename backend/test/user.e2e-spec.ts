import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from "supertest-graphql";
import { userQueries } from "./__queries__/user";
import { CreateUserInput, CreateUserResponse, UserInput } from "./__interfaces__/user";
import { PrismaService } from "src/prisma.service";

describe("User e2e", () => {
	const defaultUser: UserInput = { email: "user01@email.com", name: "user 01", password: "Password123" };
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
			const createUserData = { ...defaultUser, email: "USER01@EMAIL.COM" };
			await createUserRequest({ createUserData });
			const user = await prisma.user.findFirst({ where: { email: createUserData.email.toLowerCase() } });
			expect(user.email).toBe(createUserData.email.toLowerCase());
		});

		it("Throws an error due to invalid email", async () => {
			const createUserData = { ...defaultUser, email: "not valid" };
			const { errors } = await createUserRequest({ createUserData });
			const message = errors[0].message[0];
			expect(message).toBe("email must be an email");
		});

		it("Throws an error due to name length", async () => {
			let createUserData = { ...defaultUser, name: "U" };
			let { errors } = await createUserRequest({ createUserData });
			let message = errors[0].message[0];
			expect(message).toBe("name must be longer than or equal to 3 characters");

			createUserData = { ...defaultUser, name: "qweasdzxcrtyfghvbnuiojklmqweasd" };
			({ errors } = await createUserRequest({ createUserData }));
			message = errors[0].message[0];
			expect(message).toBe("name must be shorter than or equal to 30 characters");
		});

		it("Throws an error due to invalid password length or type", async () => {
			const createUserData = { ...defaultUser, password: "short" };
			const { errors } = await createUserRequest({ createUserData });
			const message = errors[0].message[0];
			expect(message).toBe("password must be longer than or equal to 10 characters");
		});

		it.todo("Throws an error due to duplicated email");

		it.todo("Saves password as a hash");

		it.todo("Creates a new user");
	});
});
