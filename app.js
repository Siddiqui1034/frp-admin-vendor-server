import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

// create a server by Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// now server should run on any port here port is my local machine port
const {url} = await startStandaloneServer(server, {
    listen: {port: 5000},
})

console.log(`server ready at : ${url}`);
