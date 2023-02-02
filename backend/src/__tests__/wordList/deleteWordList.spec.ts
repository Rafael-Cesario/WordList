import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../__utils__/queriesList';
import { QueriesWordList } from '../__utils__/queriesWordList';

const queriesWordList = new QueriesWordList();
const queriesList = new QueriesList();

describe('Delete wordList', () => {
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

	test('List not found', async () => {
		const deleteWordList = await queriesWordList.deleteWordList({ listName: 'list01', owner: 'user', wordListIndex: 0, wordListStatus: 'next' });
		const error = deleteWordList.errors![0].message;
		expect(error).toBe('List not found');
	});

	test('Delete wordList', async () => {
		await queriesList.createList({ listName: 'list01', owner: 'user' });
		await queriesWordList.createWordList({ listName: 'list01', owner: 'user' });
		const deleteWordList = await queriesWordList.deleteWordList({ listName: 'list01', owner: 'user', wordListIndex: 0, wordListStatus: 'next' });
		const message = deleteWordList.data.deleteWordList.message;
		expect(message).toBe('WordList deleted');

		const getList = await queriesWordList.getWordList({ listName: 'list01', owner: 'user' });
		const wordLists = getList.data.getWordLists.wordLists;
		expect(wordLists.next.length).toBe(0);
	});
});
