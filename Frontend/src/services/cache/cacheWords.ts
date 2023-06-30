import { client } from "../client";
import { IGetWords, RGetWords } from "../interfaces/words";
import { QueriesWords } from "../queries/words";

export class CacheWords {
	private queriesWords = new QueriesWords();

	read(getWords: IGetWords) {
		const cacheList = client.readQuery<RGetWords, IGetWords>({
			query: this.queriesWords.GET_WORDS,
			variables: getWords,
		});

		return cacheList;
	}

	update(getWords: IGetWords, newCache: RGetWords) {
		client.writeQuery<RGetWords, IGetWords>({
			query: this.queriesWords.GET_WORDS,
			variables: getWords,
			data: newCache,
		});
	}
}
