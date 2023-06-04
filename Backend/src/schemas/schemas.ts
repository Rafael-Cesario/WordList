import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeUser } from "./typedefs/user";
import { resolverUser } from "./resolvers/user";

const typeDefs = `#graphql
  type Query {
    hello: String!
  }
`;

const resolvers = {
	Query: {
		hello: () => "World",
	},
};

export const schema = makeExecutableSchema({
	typeDefs: [typeDefs, typeUser],
	resolvers: [resolvers, resolverUser],
});
