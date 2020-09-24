const Fastify = require('fastify')
const GQL = require('fastify-gql')
const { inventory } = require('../../../data/inventory')

const app = Fastify()

const typeDefs = `
  extend type Product @key(fields: "upc") {
    upc: String! @external
    weight: Int @external
    price: Int @external
    inStock: Boolean
    shippingEstimate: Int @requires(fields: "price weight")
  }
`;

const resolvers = {
  Product: {
    __resolveReference: (object) => {
      return {
        ...object,
        ...inventory.find(product => product.upc === object.upc)
      };
    },
    shippingEstimate: (object) => {
      // free for expensive items
      if (object.price > 1000) return 0;
      // estimate is based on weight
      return object.weight * 0.5;
    }
  }
};

app.register(GQL, {
  schema: typeDefs,
  resolvers,
  federationMetadata: true,
  graphiql: true,
  jit: 1
})

app.listen(3004)
