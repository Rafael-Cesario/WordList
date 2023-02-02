import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../__utils__/queriesList';
import { QueriesWordList } from '../__utils__/queriesWordList';

const queriesList = new QueriesList();
const queriesWordList = new QueriesWordList();

describe('Create wordlist', () => {
	beforeAll(async () => {
		await startServer(0);
		await startDatabase();
	});

	afterEach(async () => {
		await ListModel.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connections[0].dropDatabase();
		await mongoose.connections[0].close();
	});

	test('Create wordlist', async () => {
		await queriesList.createList({ listName: 'list01', owner: 'UserEmail' });
		const createWordList = await queriesWordList.createWordList({ listName: 'list01', owner: 'UserEmail' });
		const message = createWordList.data.createWordList.message;
		expect(message).toBe('New wordList created');

		const getWordList = await queriesWordList.getWordList({ listName: 'list01', owner: 'UserEmail' });
		const wordLists = getWordList.data.getWordLists.wordLists;
		expect(wordLists.next).toEqual([[]]);
	});

	test('List not found', async () => {
		const createWordList = await queriesWordList.createWordList({ listName: 'list01', owner: 'UserEmail' });
		const error = createWordList.errors![0].message;
		expect(error).toBe('List not found');
	});
});
