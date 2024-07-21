import { ApolloServer} from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import typeDefs from "./graph/typedefs.js"
import resolvers from "./graph/resolvers.js"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
});