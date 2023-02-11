import { PageHead } from "../../components/head/head";
import { Header } from "../../components/pages/list/header";
import { List } from "../../components/pages/list/list";

const ListPage = () => {
	return (
		<>
			<PageHead title={"WordList"} />
			<Header />
			<List />
		</>
	);
};

export default ListPage;
