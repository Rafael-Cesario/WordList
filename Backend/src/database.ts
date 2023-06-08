import "dotenv/config";
import mongoose from "mongoose";

let url = process.env.DATABASE || "mongodb://127.0.0.1:27017/WordList:";
const environment = process.env.NODE_ENV;

if (environment !== "") url += `-${environment}`;

export const startDatabase = async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect(url);
	console.log(`💾 \x1b[32mDatabase is running in ${environment} mode.\x1b[0m`);
};
