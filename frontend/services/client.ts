import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_DATABASE || 'http://localhost:4000';

const client = new ApolloClient({
	uri,
	cache: new InMemoryCache(),
});
