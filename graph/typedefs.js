import { gql } from 'apollo-server'
/*
    This is the schema file for the application
*/
const typeDefs = gql`
    type Query{
        greet:String
        users:[User]
        quotes:[Quote]
        user(id:ID!):User
        quotebyuser(by:ID!):[Quote]
    }
    type Mutation{
        CreateUser(
            NewUser:UserObj!
        ):User
        FuncCreateUser(
           firstName:String!
           lastName:String!
           email:String!
           password:String!
        ):User
        StoreCreateUser(
            NewUser:UserObj!
        ):User
    }
    type User{
        id:ID!
        firstName:String
        lastName:String
        email:String
        password:String
        quotes:[Quote]
    }
    type Quote{
        name:String
        by:ID
    }
    input UserObj{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    } 
`

export default typeDefs