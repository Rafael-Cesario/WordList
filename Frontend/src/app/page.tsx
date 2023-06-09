import { withPrivateRoute } from "@/components/withPrivateRoute";

const Home = () => {
	return <h1>WordList</h1>;
};

export default withPrivateRoute(Home);
