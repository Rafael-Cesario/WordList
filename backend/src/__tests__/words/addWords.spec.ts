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

describe('Add words', () => {
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

	test('Add new Word', async () => {
		const addWords = await queriesWords.addWords({
			listName: 'list01',
			owner: 'user',
			status: 'next',
			listIndex: 0,
			term: 'word01',
			definition: 'word02',
		});

		const message = addWords.data.addWords.message;
		expect(message).toBe('New word added');

		const list = await ListModel.findOne({ listName: 'list01', owner: 'user' });
		const words = list?.wordLists.next[0];
		expect(words).toEqual([['word01', 'word02']]);
	});

	test('List not found', async () => {
		const addWords = await queriesWords.addWords({
			listName: 'non-existent name',
			owner: 'user',
			status: 'next',
			listIndex: 0,
			term: 'word01',
			definition: 'word02',
		});

		const [error] = addWords.errors!;
		expect(error.message).toBe('List not found');
	});
});
