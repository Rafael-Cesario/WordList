import { graphql } from "msw";

export const handlersUser = [
	graphql.query("ReadUser", (req, res, ctx) => {
		const { email } = req.variables;
		const user = { email: "userEmail", name: "userName", password: "userPassword" };
		if (!email) throw new Error("Email was not provided");
		return res(ctx.data({ readUser: { message: "success", user } }));
	}),

	graphql.mutation("Login", (req, res, ctx) => {
		const { user } = req.variables;
		if (user.email === "wrong") throw new Error("Email/password is wrong");
		return res(ctx.data({ login: { message: "success", token: "a0sdf8792ç3l4kjas0df8967123ç45lkjasd9f" } }));
	}),

	graphql.mutation("CreateUser", (req, res, ctx) => {
		const { user } = req.variables;
		if (!user.email) throw new Error("Email was not provided");
		return res(ctx.data({ createUser: { message: "success", user } }));
	}),
];
