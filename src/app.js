import "dotenv/config";

import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { auth, db } from "./utils";

import cors from "cors";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import depthLimit from "graphql-depth-limit";
import express from "express";
import helmet from "helmet";
import models from "./models";
import resolvers from "./resolvers";
import typeDefs from "./schema";

const { PORT, DB_HOST } = process.env;

(async function startGqlServer() {
  const app = express();

  app.use(cors());
  app.use(helmet());

  db.connect(DB_HOST);

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: async ({ req }) => {
      const user = await auth.verifyToken(req.headers.authorization);

      if (req.headers.authorization && !user) {
        throw new AuthenticationError("Invalid token");
      }

      return { models, user };
    },
  });

  await gqlServer.start();

  gqlServer.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () =>
    console.log(`GraphQL server is ready at ${gqlServer.graphqlPath}`)
  );
})();
