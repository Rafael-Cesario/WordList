import { makeExecutableSchema } from '@graphql-tools/schema';
import { listResolver } from './resolvers/resolverList';
import { resolverWordList } from './resolvers/resolverWordList';
import { userResolver } from './resolvers/resolverUser';
import { wordsResolver } from './resolvers/resolverWords';
import { listTypeDef } from './types/listType';
import { userTypeDefs } from './types/userType';
import { wordListTypeDefs } from './types/wordListType';
import { wordsTypeDef } from './types/wordsType';

export const schema = makeExecutableSchema({
	typeDefs: [userTypeDefs, listTypeDef, wordListTypeDefs, wordsTypeDef],
	resolvers: [userResolver, listResolver, resolverWordList, wordsResolver],
});
