import { setupServer } from 'msw/node';
import { handlers as graphqlHandlers } from './handlers/list';
import { handlers as restHandlers } from './handlers/cookies';
import { handlersQueriesWords } from './handlers/words';
import { handlersQueriesWordList } from './handlers/wordList';
import { handlersUser } from './handlers/user';

const handlers = [...graphqlHandlers, ...restHandlers, ...handlersQueriesWords, ...handlersQueriesWordList, ...handlersUser];

export const server = setupServer(...handlers);
