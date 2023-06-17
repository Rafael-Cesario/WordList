import { withPrivateRoute } from "@/components/withPrivateRoute";
import { Header } from "@/features/home/header";

const Home = () => {
	return (
		<>
			<Header />
		</>
	);
};

export default withPrivateRoute(Home);
