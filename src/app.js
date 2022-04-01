import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import models from "./models";
import resolvers from "./resolvers";

(async function startGqlServer() {
  const app = express();

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (/* {req, res} */) => {
      return { models };
    },
  });

  await gqlServer.start();

  gqlServer.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT, () =>
    console.log(`GraphQL server is ready at ${gqlServer.graphqlPath}`)
  );
})();
