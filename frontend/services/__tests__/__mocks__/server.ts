import { setupServer } from "msw/node";
import { handlers as graphqlHandlers } from "./graphqlHandlers";
import { handlers as restHandlers } from "./restHandlers";
import { handlersQueriesWords } from "./handlersQueriesWords";

export const server = setupServer(...graphqlHandlers, ...restHandlers, ...handlersQueriesWords);
