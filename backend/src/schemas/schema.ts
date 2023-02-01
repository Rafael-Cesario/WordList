import { makeExecutableSchema } from '@graphql-tools/schema';
import { listResolver } from './resolvers/listResolver';
import { resolverWordList } from './resolvers/resolverWordList';
import { userResolver } from './resolvers/userResolver';
import { wordsResolver } from './resolvers/wordsResolver';
import { listTypeDef } from './types/listType';
import { userTypeDefs } from './types/userType';
import { wordListTypeDefs } from './types/wordListType';
import { wordsTypeDef } from './types/wordsType';

export const schema = makeExecutableSchema({
	typeDefs: [userTypeDefs, listTypeDef, wordListTypeDefs, wordsTypeDef],
	resolvers: [userResolver, listResolver, resolverWordList, wordsResolver],
});
