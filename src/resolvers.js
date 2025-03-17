import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "events";

const prisma = new PrismaClient();
const eventEmitter = new EventEmitter();

export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany({ include: { posts: true } }),
        user: async (_, { id }) => await prisma.user.findUnique({ where: { id: Number(id) }, include: { posts: true } }),
        posts: async (_, { skip = 0, take = 10, search }) => {
            const filter = search ? { OR: [{ title: { contains: search } }, { content: { contains: search } }] } : {};
            return prisma.post.findMany({ where: filter, skip, take, include: { author: true } });
        },
        post: async (_, { id }) => await prisma.post.findUnique({ where: { id: Number(id) }, include: { author: true } }),
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            return await prisma.user.create({ data: { name, email } });
        },
        createPost: async (_, { title, content, authorId }) => {
            const newPost = await prisma.post.create({
                data: { title, content, author: { connect: { id: Number(authorId) } } },
            });

            eventEmitter.emit("POST_ADDED", newPost);

            return newPost;
        },
    },
    Subscription: {
        postAdded: {
            subscribe: () => {
                const asyncIterator = (async function* () {
                    while (true) {
                        yield new Promise((resolve) => {
                            eventEmitter.once("POST_ADDED", (data) => resolve({ postAdded: data }));
                        });
                    }
                })();
                return asyncIterator;
            },
        },
    },
};
