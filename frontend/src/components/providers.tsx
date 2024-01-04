"use client";
import StyledComponentsRegistry from "@/lib/styled-components";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};
