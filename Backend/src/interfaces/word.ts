export interface Word {
	term: string;
	definitions: string;
	learned: boolean;
	correctTimes: number;
}

export interface IAddWords {
	addWords: {
		listID: string;
		words: Word[];
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
