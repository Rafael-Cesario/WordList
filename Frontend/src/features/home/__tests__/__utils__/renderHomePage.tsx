import Home from "@/app/page";
import { Notification } from "@/components/notification";
import { AllProviders } from "@/components/providers";
import { render, waitFor } from "@testing-library/react";

export const renderHomePage = async () => {
	await waitFor(() =>
		render(
			<AllProviders>
				<Notification />
				<Home />
			</AllProviders>
		)
	);
};
