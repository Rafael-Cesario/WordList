import mongoose from 'mongoose';
import { describe, beforeAll, afterAll, afterEach } from 'vitest';
import { startServer } from '../app';
import { startDatabase } from '../database';
import { ListModel } from '../models/listModel';
import { QueriesList } from './utils/queriesList';

const queriesList = new QueriesList();

describe('Get lists query', () => {
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
});
