import "dotenv/config";
import express from "express";
import cors from "cors";
// import helmet from 'helmet'
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import models from "./models";
import resolvers from "./resolvers";

const { PORT } = process.env;

(async function startGqlServer() {
  const app = express();

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (/* {req, res} */) => {
      return { models };
    },
  });

  app.use(cors());
  // app.use(helmet())

  await gqlServer.start();

  gqlServer.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () =>
    console.log(`GraphQL server is ready at ${gqlServer.graphqlPath}`)
  );
})();
