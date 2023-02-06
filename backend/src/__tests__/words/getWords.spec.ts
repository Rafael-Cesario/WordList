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

describe('Get words', () => {
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

		const getWords = await queriesWords.getWords({
			listName: 'list01',
			owner: 'user',
			status: 'next',
			listIndex: 0,
		});

		const words = getWords.data.getWords.words;
		expect(words).toEqual([['word01', 'word02']]);
	});

	test('list not found', async () => {
		const getWords = await queriesWords.getWords({
			listName: 'non-existent name',
			owner: 'user',
			status: 'next',
			listIndex: 0,
		});

		const [error] = getWords.errors!;
		expect(error.message).toBe('List not found');
	});
});
