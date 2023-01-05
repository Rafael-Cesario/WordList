import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schemas/schema';

const app = new ApolloServer({ schema });

export const startServer = async () => {
	const { url } = await startStandaloneServer(app, {
		listen: { port: 4000 },
	});

	console.log('Server: ' + url);
};
