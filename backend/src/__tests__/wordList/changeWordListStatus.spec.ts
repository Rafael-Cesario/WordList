import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { startServer } from '../../app';
import { startDatabase } from '../../database';
import { ListModel } from '../../models/listModel';
import { QueriesList } from '../__utils__/queriesList';
import { QueriesWordList } from '../__utils__/queriesWordList';

const queriesList = new QueriesList();
const queriesWordList = new QueriesWordList();

describe('Change wordList status', () => {
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
		const changeStatus = await queriesWordList.changeWordListStatus({
			listName: 'list01',
			owner: 'user',
			wordListIndex: 0,
			wordListStatusNew: 'current',
			wordListStatusOld: 'next',
		});

		const [error] = changeStatus.errors!;
		expect(error.message).toBe('List not found');
	});

	test('Change status', async () => {
		await queriesList.createList({ listName: 'list01', owner: 'user' });
		await queriesWordList.createWordList({ listName: 'list01', owner: 'user' });

		const changeStatus = await queriesWordList.changeWordListStatus({
			listName: 'list01',
			owner: 'user',
			wordListIndex: 0,
			wordListStatusOld: 'next',
			wordListStatusNew: 'current',
		});

		const message = changeStatus.data.changeWordListStatus.message;
		expect(message).toBe('Status updated');

		const getLists = await queriesWordList.getWordList({ listName: 'list01', owner: 'user' });
		const wordList = getLists.data.getWordLists.wordLists;
		expect(wordList.current.length).toBe(1);
	});
});
