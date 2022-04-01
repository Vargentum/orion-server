import { gql } from "apollo-server-express";

export default gql`
  enum TRANSACTION_TYPE {
    INCOME
    EXPENCE
    TRANSFER
    ADJUSTMENT
  }

  enum CATEGORY_TYPE {
    INCOME
    OUTCOME
  }

  type Query {
    me: User
  }
  # type Mutation { }

  type Account {
    id: ID
    name: String!
    currency: Currency!
    transactions: [Transaction!]!
  }

  type Category {
    id: ID
    name: String!
    type: CATEGORY_TYPE!
  }

  type Currency {
    id: ID
    name: String!
    ticker: String!
  }

  type Transaction {
    id: ID
    type: TRANSACTION_TYPE!
    amount: Float!
    currency: Currency!
    # createdAt: DateTime!,
    # updatedAt: DateTime!,
  }

  type User {
    id: ID
    avatar: String
    name: String
    email: String!
  }
`;
