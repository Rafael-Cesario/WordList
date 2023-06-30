import { IWord } from "@/services/interfaces/words";

// todo > Tests
export const groupWords = (words: IWord[]) => {
	// todo > get words per wordlist from user configs
	const userWordsPerWordList = 20;

	const group = [];
	let start = 0;

	while (start < words.length) {
		const groupSize = start + userWordsPerWordList;
		const slice = words.slice(start, groupSize);
		group.push(slice);
		start += userWordsPerWordList;
	}

	return group;
};
