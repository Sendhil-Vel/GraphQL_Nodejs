import { createRequire } from 'node:module';
import { randomBytes } from "crypto"
'use strict';
const require = createRequire(import.meta.url);
const { writeFile, readFile } = require("fs");
const users = require("../database/dbuser.json")
const quotes = require("../database/dbquote.json")
const resolvers = {
    Query: {
        greet: () => {
            return "This is a demo"
        },
        users: () => {
            console.log("test")
            return users
        },
        quotes: () => {
            return quotes
        },
        user: (_, args) => users.find(user => user.id == args.id),
        quotebyuser: (_, args) => quotes.filter(quote => quote.by == args.by)
    },
    User: {
        quotes: (userobj) => {
            return quotes.filter(quote => quote.by == userobj.id)
        }
    },
    Mutation: {
        CreateUser: (_, { NewUser }) => {
            const ID = randomBytes(5).toString("hex")
            users.push({
                id: ID,
                ...NewUser
            })
            return users.find(user => user.id == ID)
        },
        FuncCreateUser: (_, Refs) => {
            const ID = randomBytes(5).toString("hex")
            users.push({
                id: ID,
                firstName: Refs.firstName,
                lastName: Refs.lastName,
                email: Refs.email,
                password: Refs.password
            })
            return users.find(user => user.id == ID)
        },
        StoreCreateUser: (_, { NewUser }) => {
            const ID = randomBytes(5).toString("hex")
            users.push({
                id: ID,
                ...NewUser
            })
            //Mention you path
            writeFile("D:/graph/projectDB/database/dbuser.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(err);
                    console.log("Failed to write updated data to file");
                    return;
                }
                console.log("Updated file successfully");
            });
            return users.find(user => user.id == ID)
        }
    }
}

export default resolvers
