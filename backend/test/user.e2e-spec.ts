import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from "supertest-graphql";
import { userQueries } from "./__queries__/user";
import { CreateUserInput, CreateUserResponse, LoginInput, LoginResponse, UserInput, ValidateTokenResponse } from "./__interfaces__/user";
import { PrismaService } from "src/prisma.service";
import { ValidateTokenInput } from "./__interfaces__/user";

describe("User e2e", () => {
	const defaultUser: UserInput = { email: "user01@email.com", name: "user 01", password: "Password123" };
	let app: INestApplication;
	let prisma: PrismaService;

	const createUserRequest = async (variables: CreateUserInput) => {
		return await request<CreateUserResponse, CreateUserInput>(app.getHttpServer())
			.mutate(userQueries.CREATE_USER)
			.variables({ ...variables });
	};

	const loginRequest = async (variables: LoginInput) => {
		return await request<LoginResponse, LoginInput>(app.getHttpServer()).mutate(userQueries.LOGIN).variables(variables);
	};

	const validateTokenRequest = async (variables: ValidateTokenInput) => {
		return await request<ValidateTokenResponse, ValidateTokenInput>(app.getHttpServer()).mutate(userQueries.VALIDATE_TOKEN).variables(variables);
	};

	beforeAll(async () => {
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

		it("Transform email to lowercase", async () => {
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

		it("Throws an error due to duplicated email", async () => {
			await createUserRequest({ createUserData: defaultUser });
			const { errors } = await createUserRequest({ createUserData: defaultUser });
			const [errorCode] = errors[0].message.split(":");
			expect(errorCode).toBe("duplicated");
		});

		it("Hashes user password", async () => {
			await createUserRequest({ createUserData: defaultUser });
			const user = await prisma.user.findFirst({ where: { email: defaultUser.email } });
			expect(user.password).not.toBe(defaultUser.password);
		});

		it("Creates a new user", async () => {
			await createUserRequest({ createUserData: defaultUser });
			const users = await prisma.user.findMany();
			expect(users.length).toBe(1);
		});
	});

	describe("Login", () => {
		beforeAll(async () => {
			await createUserRequest({ createUserData: { ...defaultUser } });
		});

		afterAll(async () => {
			await prisma.user.deleteMany();
		});

		it("Throws an error due to invalid email", async () => {
			const { errors } = await loginRequest({ loginData: { email: "wrong@email.com", password: defaultUser.password } });
			const message = errors[0].message;
			expect(message).toBe("Unauthorized: Invalid Credentials");
		});

		it("Throws an error due to invalid password", async () => {
			const { errors } = await loginRequest({ loginData: { email: defaultUser.email, password: "wrong" } });
			const message = errors[0].message;
			expect(message).toBe("Unauthorized: Invalid Credentials");
		});

		it("Removes password from response", async () => {
			const { email, password } = defaultUser;
			const { data } = await loginRequest({ loginData: { email, password } });
			expect(data.login).not.toHaveProperty("password");
		});

		it("Generates a token", async () => {
			const { email, name, password } = defaultUser;
			const { data } = await loginRequest({ loginData: { email, password } });
			expect(data.login).toEqual({ id: expect.any(String), token: expect.any(String), email, name });
		});
	});

	describe("Validate Token", () => {
		it("Throws an error due to string is not a valid JWT token", async () => {
			const { errors } = await validateTokenRequest({ tokenData: { token: "123" } });
			const message = errors[0].message[0];
			expect(message).toBe("token must be a jwt string");
		});

		it("Validates a token", async () => {
			const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBlbWFpbC5jb20iLCJpYXQiOjE3MDQzODg1MjAsImV4cCI6MTcwNDk5MzMyMH0.BiMqhpHD5TveKjewDG9TFZJzh3ArrEmNZfIch5MBi50";
			let { data } = await validateTokenRequest({ tokenData: { token: invalidToken } });
			expect(data.validateToken).toBeFalsy();

			const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBlbWFpbC5jb20iLCJpYXQiOjE3MDQzODg1MjAsImV4cCI6MTcwNDk5MzMyMH0.BiMqhpHD5TveKjewDG9TFZJzh3ArrEmNZfIch5MBi58";
			({ data } = await validateTokenRequest({ tokenData: { token: validToken } }));
			expect(data.validateToken).toBeTruthy();
		});
	});
});
