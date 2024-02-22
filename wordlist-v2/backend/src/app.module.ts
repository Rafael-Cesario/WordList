import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { join } from "path";
import { AppResolver } from "./app.resolver";
import { PrismaModule } from "./prisma.module";
import { UserModule } from "./models/user/user.module";

const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), "src/schema.gql"),
	sortSchema: true,
	playground: false,
	plugins: [ApolloServerPluginLandingPageLocalDefault()],
	formatError: (error: any) => ({ message: error.extensions?.originalError?.message || error.message }),
});

@Module({
	imports: [graphqlModule, PrismaModule, UserModule],
	providers: [AppResolver],
})
export class AppModule {}
