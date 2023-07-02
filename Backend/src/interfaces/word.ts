export interface IWord {
	term: string;
	definitions: string;
	learned: boolean;
	correctTimes: number;
}

export interface IAddWords {
	addWords: {
		listID: string;
		words: IWord[];
	};
}

export interface RAddWords {
	addWords: {
		message: string;
	};
}

export interface IRemoveWord {
	removeWord: {
		listID: string;
		wordIndex: number;
	};
}

export interface RRemoveWord {
	removeWord: {
		message: string;
	};
}

export interface IUpdateWords {
	updateWords: {
		listID: string;
		firstWordIndex: number;
		newWords: IWord[];
	};
}

export interface RUpdateWords {
	updateWords: { message: string };
}

export interface IGetWords {
	getWords: {
		userID: string;
		listID: string;
	};
}

export interface RGetWords {
	getWords: {
		listName: string;
		words: IWord[];
	}
}