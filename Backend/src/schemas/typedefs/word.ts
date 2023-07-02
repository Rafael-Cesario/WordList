import gql from "graphql-tag";

export const typeWord = gql`
	type word {
		term: String!
		definitions: String!
		learned: Boolean!
		correctTimes: Int!
	}

	input IWord {
		term: String!
		definitions: String!
		learned: Boolean!
		correctTimes: Int!
	}

	input IAddWords {
		listID: String!
		words: [IWord!]!
	}

	type RAddWords {
		message: String!
	}

	input IRemoveWord {
		listID: String!
		wordIndex: Int!
	}

	type RRemoveWord {
		message: String!
	}

	input IUpdateWords {
		listID: String!
		firstWordIndex: Int!
		newWords: [IWord!]!
	}

	type RUpdateWords {
		message: String!
	}

	input IGetWords {
		userID: String!
		listID: String!
	}

	type RGetWords {
		listName: String!
		words: [word]!
	}

	type Query {
		getWords(getWords: IGetWords!): RGetWords!
	}

	type Mutation {
		addWords(addWords: IAddWords!): RAddWords!
		removeWord(removeWord: IRemoveWord!): RRemoveWord!
		updateWords(updateWords: IUpdateWords!): RUpdateWords!
	}
`;
