# Federation demo with Apollo and Fastify

This repository is a demo of using GraphQL Gateway to build a single schema on top of multiple services. The microservices are located under the [`./services`](./services/) folder and the gateway that composes the overall schema is in the root. The repository contains the original Apollo Federation example and also a [Fastify-GQL](https://github.com/mcollina/fastify-gql) example for comparison.

## What is this?

This demo showcases four partial schemas running as federated microservices. Each of these schemas can be accessed on their own and form a partial shape of an overall schema. The gateway fetches the service capabilities from the running services to create an overall composed schema which can be queried. 

To learn more about Apollo Federation, check out the [docs](https://www.apollographql.com/docs/apollo-server/federation/introduction)

## Installation

To run this demo locally, pull down the repository then run `npm install` in the root and in the `apollo` and `fastify` folders.

This will install all of the dependencies for the gateway and each underlying service.

## Running the demo

### Apollo 

For running the demo for Apollo, first go the `apollo` folder and run the following commands

```sh
npm run start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:4001, http://localhost:4002, http://localhost:4003, and http://localhost:4004.

In another terminal window, run the gateway by running this command:

```sh
npm run start-gateway
```

This will start up the gateway and serve it at http://localhost:4000

### Fastify

For running the demo for Fastify, first go the `fastify` folder and run the following commands

```sh
npm run fastify:start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:3001/graphiql, http://localhost:3002/graphiql, http://localhost:3003/graphiql, and http://localhost:3004/graphiql.

In another terminal window, run the gateway by running this command:

```sh
npm run fastify:start-gateway
```

This will start up the gateway and serve it at http://localhost:3000/graphiql

## Benchmark

For running the benchmark, first run both demo apps and then run the following command in the root:

```sh
node bench.js
```

It will run the benchmark for 5 seconds for each demo. It wil print the results to the console.