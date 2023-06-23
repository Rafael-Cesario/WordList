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
		updatedWords: IWord[];
	};
}

export interface RUpdateWords {
	updateWords: { message: string };
}
