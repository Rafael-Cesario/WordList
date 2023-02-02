import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../__utils__/queriesList';
import { QueriesWordList } from '../__utils__/queriesWordList';

const queriesWordList = new QueriesWordList();
const queriesList = new QueriesList();

describe('Get wordList', () => {
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
		const getLists = await queriesWordList.getWordList({ listName: 'list01', owner: 'UserEmail' });
		const list = getLists.errors![0].message;
		expect(list).toBe('List not found');
	});

	test('Get list', async () => {
		await queriesList.createList({ listName: 'list01', owner: 'UserEmail' });
		const getLists = await queriesWordList.getWordList({ listName: 'list01', owner: 'UserEmail' });
		const list = getLists.data.getWordLists;
		expect(list.wordLists).toHaveProperty('next');
		expect(list.wordLists).toHaveProperty('current');
		expect(list.wordLists).toHaveProperty('done');
	});
});
