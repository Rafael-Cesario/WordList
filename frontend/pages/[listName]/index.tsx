import { PageHead } from '../../components/head/head';
import { Header } from '../../components/pages/list/header';
import { ListContainer } from '../../components/pages/list/listContainer';

const ListPage = () => {
	return (
		<>
			<PageHead title={'WordList'} />
			<Header />
			<ListContainer />
		</>
	);
};

export default ListPage;
