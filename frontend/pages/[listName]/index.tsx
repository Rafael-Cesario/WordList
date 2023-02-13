import { PageHead } from "../../components/head/head";
import { ContextWordListProvider } from "../../components/pages/list/contexts/contextWordList";
import { Header } from "../../components/pages/list/header";
import { ListContainer } from "../../components/pages/list/listContainer";

const ListPage = () => {
	return (
		<ContextWordListProvider>
			<PageHead title={"WordList"} />
			<Header />
			<ListContainer />
		</ContextWordListProvider>
	);
};

export default ListPage;
