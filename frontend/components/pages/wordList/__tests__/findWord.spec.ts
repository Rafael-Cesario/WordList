import { describe } from 'vitest';
import { findWord } from '../utils/findWord';

describe('Find word', () => {
	test('Return true if word is present', () => {
		const words = [
			['word', 'word'],
			['word', 'word'],
			['target', 'word'],
			['word', 'word'],
			['word', 'word'],
		];

		const hasWord = findWord(words, 'TARGET');
		expect(hasWord).toBe(true);
	});

	test('Returns false, word is not present', () => {
		const words = [
			['word', 'word'],
			['word', 'word'],
			['target', 'word'],
			['word', 'word'],
			['word', 'word'],
		];

		const hasWord = findWord(words, 'non-existed word');
		expect(hasWord).toBe(false);
	});
});
