import { graphql } from "msw";
import { IChangeWordListStatus, ICreateWordList, IDeleteWordList, IGetWordLists } from "../../../../interfaces/interfaceWordList";

export const handlersQueriesWordList = [
	graphql.query("GetWordLists", (req, res, ctx) => {
		const { owner } = req.variables.getWordLists as IGetWordLists;
		if (!owner) throw new Error("Owner was not provided");
		return res(
			ctx.data({
				getWordLists: {
					owner: "user",
					listName: "list01",
					wordLists: {
						next: [],
						current: [],
						done: [],
					},
				},
			})
		);
	}),

	graphql.mutation("CreateWordList", (req, res, ctx) => {
		const { owner } = req.variables.wordList as ICreateWordList;
		if (!owner) throw new Error("Owner was not provided");
		return res(ctx.data({ createWordList: { message: "New wordList created" } }));
	}),

	graphql.mutation("DeleteWordList", (req, res, ctx) => {
		const { owner } = req.variables.deleteWordList as IDeleteWordList;
		if (!owner) throw new Error("Owner was not provided");
		return res(ctx.data({ deleteWordList: { message: "WordList deleted" } }));
	}),

	graphql.mutation("ChangeWordListStatus", (req, res, ctx) => {
		const { owner } = req.variables.changeWordListStatus as IChangeWordListStatus;
		if (!owner) throw new Error("Owner was not provided");
		return res(ctx.data({ changeWordListStatus: { message: "Status updated" } }));
	}),
];
