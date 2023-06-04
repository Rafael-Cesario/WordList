import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schemas/schemas";

const server = new ApolloServer({ schema });

export const startServer = async (port = 4000) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port },
	});

	console.log(`🚀 \x1b[32mServer ready at: ${url}\x1b[0m`);
};
