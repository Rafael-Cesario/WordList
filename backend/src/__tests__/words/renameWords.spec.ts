import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../__utils__/queriesList';
import { QueriesWordList } from '../__utils__/queriesWordList';
import { QueriesWords } from '../__utils__/queriesWords';

const queriesWords = new QueriesWords();
const queriesList = new QueriesList();
const queriesWordList = new QueriesWordList();

describe('Rename words', () => {
	beforeAll(async () => {
		await startServer(0);
		await startDatabase();
	});

	beforeEach(async () => {
		await queriesList.createList({ listName: 'list01', owner: 'user' });
		await queriesWordList.createWordList({ listName: 'list01', owner: 'user' });
	});

	afterEach(async () => {
		await ListModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connections[0].dropDatabase();
		await mongoose.connections[0].close();
	});

	test('get Words', async () => {
		await queriesWords.addWords({
			listName: 'list01',
			owner: 'user',
			status: 'next',
			listIndex: 0,
			term: 'word01',
			definition: 'word02',
		});

		const renameWords = await queriesWords.renameWords({
			listName: 'list01',
			owner: 'user',
			listIndex: 0,
			listStatus: 'next',
			wordIndex: 0,
			newWords: ['new Word01', 'new Word02'],
		});

		const message = renameWords.data.renameWords.message;
		expect(message).toBe('Words updated');

		const getWords = await queriesWords.getWords({
			listName: 'list01',
			owner: 'user',
			status: 'next',
			listIndex: 0,
		});

		const words = getWords.data.getWords.words;
		expect(words).toEqual([['new Word01', 'new Word02']]);
	});

	test('list not found', async () => {
		const renameWords = await queriesWords.renameWords({
			listName: 'non-existent name',
			owner: 'user',
			listIndex: 0,
			listStatus: 'next',
			wordIndex: 0,
			newWords: ['new Word01', 'new Word02'],
		});

		const [error] = renameWords.errors!;
		expect(error.message).toBe('List not found');
	});
});
