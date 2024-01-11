"use client";
import StyledComponentsRegistry from "@/lib/styled-components";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/services/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
