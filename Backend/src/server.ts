import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

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

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

export const startServer = async (port = 4000) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port },
	});

	console.log(`🚀 \x1b[32mServer ready at: ${url}\x1b[0m`);
};
