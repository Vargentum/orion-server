import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import typeDefs from "./schema";
import models from "./models";
import resolvers from "./resolvers";
import { db } from "./utils";

const { PORT, JWT_SECRET, DB_HOST } = process.env;

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      throw new Error("Can't verify JWT token");
    }
  }
};

(async function startGqlServer() {
  const app = express();

  app.use(cors());
  app.use(helmet());

  db.connect(DB_HOST);

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(100)],
    context: async ({ req }) => {
      const user = getUser(req.headers.authorization);

      return { models, user };
    },
  });

  await gqlServer.start();

  gqlServer.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () =>
    console.log(`GraphQL server is ready at ${gqlServer.graphqlPath}`)
  );
})();
