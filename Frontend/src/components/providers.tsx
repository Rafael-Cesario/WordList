"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { NotificationProvider } from "@/context/notification";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<ApolloProvider client={client}>
				<NotificationProvider>{children}</NotificationProvider>
			</ApolloProvider>
		</StyledComponentsRegistry>
	);
};
