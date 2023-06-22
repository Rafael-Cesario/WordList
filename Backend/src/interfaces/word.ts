export interface Word {
	term: string;
	definitions: string
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
