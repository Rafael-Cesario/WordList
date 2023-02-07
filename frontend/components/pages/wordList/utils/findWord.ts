export const findWord = (words: string[][], word: string) => {
	const hasWord = words.filter(([term]) => term.toLowerCase() === word.toLocaleLowerCase());
	return hasWord.length ? true : false;
};
