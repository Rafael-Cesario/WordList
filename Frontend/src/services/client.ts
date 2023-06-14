import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: process.env.URI_DATABASE,
	cache: new InMemoryCache(),
});
