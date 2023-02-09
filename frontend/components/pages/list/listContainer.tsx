import { useRouter } from "next/router";
import { useRouterQuery } from "../../../utils/hooks/useRouterQuery";
import { StyledListContainer } from "./styles/styledListContainer";

interface ListContainerProps {
	props: {
		status: string;
		lists: string[][][];
	};
}

export const ListContainer = ({ props: { status, lists } }: ListContainerProps) => {
	const router = useRouter();
	const { link } = useRouterQuery("");

	const goToList = (listIndex: number) => {
		router.push(`/${link}/${listIndex}`);
	};

	if (!lists.length) {
		return (
			<StyledListContainer>
				<h1>{status}</h1>
				<p>Você ainda não tem nenhuma lista com este status</p>
			</StyledListContainer>
		);
	}

	console.log({ lists });

	return (
		<StyledListContainer>
			<h1>{status}</h1>

			<div className='lists'>
				{lists.map((list, index) => {
					return (
						<div className='list' key={"next" + index} onClick={() => goToList(index)}>
							{list.map(([term, definition], index) => {
								return (
									<div key={index} className='words'>
										<p className='term'>{term}</p>
										<p className='definition'>{definition}</p>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</StyledListContainer>
	);
};
