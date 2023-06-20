"use client";
import StyledComponentsRegistry from "@/lib/registry";
import { client } from "@/services/client";
import { ApolloProvider } from "@apollo/client";
import { NotificationProvider } from "@/context/notification";
import { store } from "@/context/store";
import { Provider as ReduxProvider } from "react-redux";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<StyledComponentsRegistry>
				<ReduxProvider store={store}>
					<NotificationProvider>{children}</NotificationProvider>
				</ReduxProvider>
			</StyledComponentsRegistry>
		</ApolloProvider>
	);
};
