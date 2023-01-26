interface IGetWords {
	owner: string;
	listName: string;
	status: string;
	listIndex: number;
}

class QueriesWords {
	// todo > add words

	// todo > get words
	async getWords({ owner, listName, status, listIndex }: IGetWords) {
		return;
	}

	// todo > rename words
	// todo > remove Words
}

export const queriesWords = new QueriesWords();
