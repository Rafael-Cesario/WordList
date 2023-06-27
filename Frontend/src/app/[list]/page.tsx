import { Header } from "@/features/list/header";

const List = ({ params }: { params: { list: string } }) => {
	const listID = params.list.split("-").pop();
	console.log({ listID });

	return (
		<>
			<Header />
		</>
	);
};

export default List;
