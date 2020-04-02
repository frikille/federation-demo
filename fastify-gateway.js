const Fastify = require('fastify')
const GQL = require('fastify-gql')

gateway.register(GQL, {
  gateway: {
    services: [{
      name: "accounts",
      url: "http://localhost:3001/graphql"
    }, {
      name: "reviews",
      url: "http://localhost:3002/graphql"
    }, {
      name: "products",
      url: "http://localhost:3003/graphql"
    }, {
      name: "inventory",
      url: "http://localhost:3004/graphql"
    }]
  }
})

gateway.listen(3000)