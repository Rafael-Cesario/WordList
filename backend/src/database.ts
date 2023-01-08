import 'dotenv/config';
import mongoose from 'mongoose';

let url = process.env.DATABASE!;
const environment = process.env.NODE_ENV!;

if (environment === 'test') url += '-test';
if (environment === 'development ') url += '-development';

export const startDatabase = async () => {
	mongoose.set('strictQuery', true);
	await mongoose.connect(url);
	environment === 'test' || console.log('DB connected');
};
