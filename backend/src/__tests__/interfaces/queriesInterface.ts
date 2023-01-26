export interface ResponseType {
	body: {
		singleResult: {
			data: { [key: string]: any };
			errors?: { [key: string]: string }[];
		};
	};
}
