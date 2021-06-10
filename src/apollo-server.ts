import { ApolloServer } from 'apollo-server-lambda';
import { createConnection } from 'typeorm';
import { Tenant } from './entity/Tenant';
import { Users } from './entity/User';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

export const connection =  createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "",   // Enter your username of postgres
        password: "",   // Enter your password of postgres
        database: "",   // Enter your database name
        entities: [Tenant,Users],
        synchronize: true,
        logging: false,
});



const apolloServer = new ApolloServer({ resolvers , typeDefs });
export const graphqlHandler = apolloServer.createHandler();


// TESTING CODE
// testQuery
// testMutation
