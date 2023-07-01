import { IWord } from "@/services/interfaces/words";

// todo > Tests
export const groupWords = (words: IWord[], wordsPerWordList: number) => {
	const group = [];
	let start = 0;

	while (start < words.length) {
		const groupSize = start + wordsPerWordList;
		const slice = words.slice(start, groupSize);
		group.push(slice);
		start += wordsPerWordList;
	}

	return group;
};
