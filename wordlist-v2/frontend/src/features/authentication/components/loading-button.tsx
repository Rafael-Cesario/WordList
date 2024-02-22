import { StyledLoadingButton } from "./styles/styled-loading-button";

interface Props {
	className: string;
}

export const LoadingButton = ({ className }: Props) => {
	return (
		<StyledLoadingButton type="button" className={`loading ${className}`}>
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</StyledLoadingButton>
	);
};
