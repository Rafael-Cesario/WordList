import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const uri = process.env.NEXT_PUBLIC_DATABASE || 'http://localhost:4000';

export const client = new ApolloClient({
	link: new HttpLink({ uri, fetch }),
	cache: new InMemoryCache(),
});
