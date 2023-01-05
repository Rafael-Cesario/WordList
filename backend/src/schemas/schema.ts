import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolver } from './resolvers/userResolver';
import { userTypeDefs } from './types/userType';

export const schema = makeExecutableSchema({
	typeDefs: [userTypeDefs],
	resolvers: [userResolver],
});
