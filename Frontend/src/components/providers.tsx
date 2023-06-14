"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</StyledComponentsRegistry>
	);
};
