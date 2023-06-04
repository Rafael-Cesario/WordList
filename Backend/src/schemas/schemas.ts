import { makeExecutableSchema } from "@graphql-tools/schema";

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
	typeDefs: [typeDefs],
	resolvers: [resolvers],
});
