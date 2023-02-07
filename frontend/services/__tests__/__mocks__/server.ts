import { setupServer } from 'msw/node';
import { handlers as graphqlHandlers } from './graphqlHandlers';
import { handlers as restHandlers } from './restHandlers';

export const server = setupServer(...graphqlHandlers, ...restHandlers);
