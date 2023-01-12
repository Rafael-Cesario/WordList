import { makeExecutableSchema } from '@graphql-tools/schema';
import { listResolver } from './resolvers/listResolver';
import { userResolver } from './resolvers/userResolver';
import { listTypeDef } from './types/listType';
import { userTypeDefs } from './types/userType';

export const schema = makeExecutableSchema({
	typeDefs: [userTypeDefs, listTypeDef],
	resolvers: [userResolver, listResolver],
});
