# **SE 4458 GraphQL Prisma Presentation**
Basic sample project to showcase the features of GraphQL and Prisma together.

## **Tech Stack & Tools**

### Development Tools:
- **JetBrains WebStorm** – IDE for development
- **Prisma Studio** – GUI to manage database (`npx prisma studio`)
- **GraphQL Playground** – API testing interface

### Backend Technologies:
- **Node.js** – JavaScript runtime
- **GraphQL** – Query language for APIs
- **Apollo Server** – GraphQL server implementation
- **Prisma ORM** – Database management
- **SQLite** – Lightweight database for local development
- **WebSockets (`graphql-ws`)** – Real-time GraphQL subscriptions

### Libraries & Dependencies:
```json
"dependencies": {
    "@apollo/server": "^4.11.3",
    "@graphql-tools/schema": "^10.0.23",
    "@prisma/client": "^6.5.0",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "graphql": "^16.10.0",
    "graphql-tag": "^2.12.6",
    "graphql-ws": "^5.16.2",
    "prisma": "^6.5.0",
    "sqlite": "^5.1.1",
    "ws": "^8.18.1"
  }
```

---

## Project Structure
```
 graphql_presentation
│   .env
│   .gitignore
│   package-lock.json
│   package.json 
├───.idea ...
├───node_modules ...
├───prisma
│   │   dev.db
│   │   dev.db-journal
│   │   schema.prisma
│   └───migrations ...
└───src
		resolvers.js
		schema.js
		server.js
```
## Data Model

### **User Model**

| Field   | Type                  | Attributes       |
|---------|-----------------------|-----------------|
| `id`    | `Integer`             | `@id, @default(autoincrement())` |
| `name`  | `String`              | `Required`      |
| `email` | `String`              | `@unique`       |
| `posts` | `Post[]`              | `Relation`      |

---

### **Post Model**

| Field      | Type       | Attributes       |
|------------|-----------|-----------------|
| `id`       | `Integer`  | `@id, @default(autoincrement())` |
| `title`    | `String`   | `Required`      |
| `content`  | `String`   | `Required`      |
| `author`   | `User`     | `Relation`      |
| `authorId` | `Integer`  | `@relation(fields: [authorId], references: [id])` |

---
