# CEDU

A simple project built with Apollo, GraphQL, and React with Typescript.

## Server setup

In the `/server` directory, create a `.env` file with the following content:

```
PRISMA_SECRET="YOUR SECRET"
APP_SECRET="YOUR SECRET"
```

```bash
npm install -g graphql-cli
yarn install
yarn start
```

Visit [http://localhost:4000/](http://localhost:4000/) and you should see the GraphQL Playground.

For more details, refer [prisma doc](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

## Client

In the root directory,

```bash
yarn install
yarn start
```

Visit [http://localhost:3001/login](http://localhost:3001/login) to login or register.

## Generate types

Update any queries/mutations/subscriptions at `src/queries.ts`, and run:

```bash
apollo codegen:generate --target=typescript --endpoint="http://localhost:4000"
```

You'll see the auto generated types at `src/__generated__/`
