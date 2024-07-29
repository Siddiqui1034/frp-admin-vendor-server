// import { ApolloServer } from "@apollo/server";
// import {startStandaloneServer} from '@apollo/server/standalone';

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import { gql, ApolloServer} from 'apollo-server-express'
import express from 'express'
import { GraphQLUpload, graphqlUploadExpress} from 'graphql-upload'

import cors from 'cors'
// create a server by Apollo Server
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// })

const app = express();
app.use(cors())
app.use(graphqlUploadExpress())
const server = new ApolloServer({ typeDefs, resolvers })

await server.start()
server.applyMiddleware({app})
app.listen({port: 5000}, () =>
    console.log('Server ready at http://localhost:5000/graphql')
)
// now server should run on any port here port is my local machine port
// const {url} = await startStandaloneServer(server, {
//     listen: {port: 5000},
// })

// console.log(`server ready at : ${url}`);
