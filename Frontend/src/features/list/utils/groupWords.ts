import { IWord } from "@/services/interfaces/words";

// todo > Tests
export const groupWords = (words: IWord[], wordsPerWordList: number, timesUntilLearning: number) => {
	const notLearned = [];
	const learned = [];

	let index = 0;
	let tempNotLearned = [];
	let tempLearned = [];

	while (index < words.length) {
		const alreadyLearned = words[index].correctTimes >= timesUntilLearning;

		if (alreadyLearned) tempLearned.push(words[index]);
		if (!alreadyLearned) tempNotLearned.push(words[index]);

		if (tempLearned.length === wordsPerWordList) {
			learned.push(tempLearned);
			tempLearned = [];
		}

		if (tempNotLearned.length === wordsPerWordList) {
			notLearned.push(tempNotLearned);
			tempNotLearned = [];
		}

		index++;
	}

	if (tempLearned.length) learned.push(tempLearned);
	if (tempNotLearned.length) notLearned.push(tempNotLearned);

	return { notLearned, learned };
};
