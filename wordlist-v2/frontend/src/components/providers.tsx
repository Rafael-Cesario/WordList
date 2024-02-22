"use client";
import StyledComponentsRegistry from "@/lib/styled-components";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/services/client";
import { store } from "@/context/store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<ReduxProvider store={store}>
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</ReduxProvider>
		</ApolloProvider>
	);
};
