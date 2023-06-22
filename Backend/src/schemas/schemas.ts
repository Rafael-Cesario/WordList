import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeUser } from "./typedefs/user";
import { resolverUser } from "./resolvers/user";
import { typeList } from "./typedefs/list";
import { resolverList } from "./resolvers/list";
import { typeWord } from "./typedefs/word";
import { resolverWord } from "./resolvers/word";

export const schema = makeExecutableSchema({
	typeDefs: [typeUser, typeList, typeWord],
	resolvers: [resolverUser, resolverList, resolverWord],
});
