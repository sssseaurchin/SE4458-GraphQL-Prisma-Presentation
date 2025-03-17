import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});

useServer({ schema }, wsServer);

const server = new ApolloServer({ schema });

await server.start();
app.use("/graphql", expressMiddleware(server));

httpServer.listen(4001, () => {
    console.log(`🚀 Server ready at http://localhost:4001/graphql`);
    console.log(`📡 Subscriptions ready at ws://localhost:4001/graphql`);
});
