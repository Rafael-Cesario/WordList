import { PageHead } from "../../components/head/head";
import { Header } from "../../components/pages/list/header";
import { List } from "../../components/pages/list/list";
import { StyledList } from "../../styles/styledList";

const ListPage = () => {
	return (
		<>
			<PageHead title={"WordList"} />

			<StyledList>
				<Header />
				<List />
			</StyledList>
		</>
	);
};

export default ListPage;
