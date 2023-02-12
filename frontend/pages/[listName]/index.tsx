import { PageHead } from "../../components/head/head";
import { ContextWordListProvider } from "../../components/pages/list/contexts/contextWordList";
import { Header } from "../../components/pages/list/header";
import { List } from "../../components/pages/list/list";

const ListPage = () => {
	return (
		<ContextWordListProvider>
			<PageHead title={"WordList"} />
			<Header />
			<List />
		</ContextWordListProvider>
	);
};

export default ListPage;
