import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = process.env.NEXT_PUBLIC_URI_DATABASE;

export const client = new ApolloClient({
	link: new HttpLink({ uri }),
	cache: new InMemoryCache({ addTypename: false }),
});
