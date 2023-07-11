import { AllProviders } from "@/components/providers";
import { render, waitFor } from "@testing-library/react";

export const renderWithProviders = async (component: React.ReactNode) => {
	await waitFor(() => {
		render(<AllProviders>{component}</AllProviders>);
	});
};
