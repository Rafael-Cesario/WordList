import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeUser } from "./typedefs/user";
import { resolverUser } from "./resolvers/user";
import { typeList } from "./typedefs/list";
import { resolverList } from "./resolvers/list";

export const schema = makeExecutableSchema({
	typeDefs: [typeUser, typeList],
	resolvers: [resolverUser, resolverList],
});
