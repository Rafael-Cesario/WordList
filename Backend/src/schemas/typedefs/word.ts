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
		updatedWords: [IWord!]!
	}

	type RUpdateWords {
		message: String!
	}

	type Mutation {
		addWords(addWords: IAddWords!): RAddWords!
		removeWord(removeWord: IRemoveWord!): RRemoveWord!
		updateWords(updateWords: IUpdateWords!): RUpdateWords!
	}
`;
