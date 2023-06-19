import { IList } from "@/services/interfaces/list";
import { StyledList } from "./styles/listStyle";

export const List = ({ props: { list } }: { props: { list: IList } }) => {
	return <StyledList>{list.name}</StyledList>;
};
