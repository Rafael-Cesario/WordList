import { gql } from "graphql-tag";

export const typeUser = gql`
    type RCreateUser {
        message: String!
    }

    input ICreateUser {
        email: String!
        password: String!
    }

    type Mutation {
        createUser (createUser: ICreateUser): RCreateUser!
    }
`;
