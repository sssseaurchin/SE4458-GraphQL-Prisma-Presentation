import { gql } from "graphql-tag";

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        createdAt: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        posts(skip: Int, take: Int, search: String): [Post!]!
        post(id: ID!): Post
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
        createPost(title: String!, content: String!, authorId: ID!): Post!
    }
    
    type Subscription {
        postAdded: Post!
    }
`;
