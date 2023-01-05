import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolver } from './resolvers/userResolver';
import { userTypeDefs } from './types/userType';

const helloTypeDefs = `#graphql
	type Query {
		hello: String!
	}
`;

const helloResolver = {
	Query: {
		hello: () => 'Hello World',
	},
};

const schema = makeExecutableSchema({
	typeDefs: [helloTypeDefs, userTypeDefs],
	resolvers: [helloResolver, userResolver],
});

const app = new ApolloServer({ schema });

export const startServer = async () => {
	const { url } = await startStandaloneServer(app, {
		listen: { port: 4000 },
	});

	console.log('Server: ' + url);
};
