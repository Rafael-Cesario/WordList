"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { NotificationProvider } from "@/context/notification";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>
				<NotificationProvider>{children}</NotificationProvider>
			</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
