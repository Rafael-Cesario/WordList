import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schemas/schema';

const testEnvironment = process.env.NODE_ENV === 'test';

export const server = new ApolloServer({
	schema,

	formatError: error => ({ message: error.message }),
});

export const startServer = async (port?: number) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: port ?? 4000 },
	});

	testEnvironment || console.log('Server: ' + url);

	return { url, server };
};
