import { gql } from "apollo-server-express";

export default gql`
  scalar DateTime
  scalar EmailAddress
  scalar Currency
  scalar URL

  enum TRANSACTION_TYPE {
    INCOME
    EXPENCE
    TRANSFER
    # ADJUSTMENT
  }

  enum CATEGORY_TYPE {
    INCOME
    OUTCOME
  }

  type Query {
    me: User

    accounts: [Account]
    account(id: ID!): Account

    categories: [Category]
    category(id: ID!): Category

    transactions: [Transaction]
    transaction(id: ID!): Transaction
  }

  type Mutation {
    signUp(email: EmailAddress!, password: String!, name: String): String!
    signIn(email: EmailAddress!, password: String!): String!

    createAccount(
      name: String!
      currency: Currency!
      transactions: [ID!]
      description: String
    ): Account!
    deleteAccount(id: ID!): Account!
    updateAccount(
      id: ID!
      name: String
      currency: Currency
      transactions: [ID!]
      description: String
    ): Account!

    createCategory(
      name: String!
      type: CATEGORY_TYPE!
      description: String
    ): Category!
    deleteCategory(id: ID!): Category!
    updateCategory(
      id: ID!
      name: String
      type: CATEGORY_TYPE
      description: String
    ): Category!

    createTransaction(
      type: TRANSACTION_TYPE!
      amount: Float!
      date: DateTime!
      description: String
      account: ID!
      category: ID!
    ): Transaction!
    deleteTransaction(id: ID!): Transaction!
    updateTransaction(
      id: ID!
      type: TRANSACTION_TYPE
      amount: Float
      date: DateTime
      description: String
      account: ID!
      category: ID!
    ): Transaction!
  }

  type Account {
    author: User!
    amount: Float
    currency: Currency!
    description: String
    id: ID!
    name: String!
  }

  type Category {
    author: User!
    description: String
    id: ID!
    name: String!
    type: CATEGORY_TYPE!
  }

  type Transaction {
    account: Account!
    amount: Float!
    author: User!
    category: Category!
    date: DateTime
    description: String
    fromAccount: Account
    id: ID!
    name: String!
    type: TRANSACTION_TYPE!
  }

  type User {
    avatar: URL
    email: EmailAddress!
    id: ID!
    name: String
    password: String!
  }
`;
