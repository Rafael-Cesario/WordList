const List = ({ params }: { params: { list: string } }) => {
	const listID = params.list.split("-").pop();
	console.log({ listID });

	return <h1>List page</h1>;
};

export default List;
