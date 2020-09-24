const Fastify = require('fastify')
const GQL = require('fastify-gql')
const { usernames, reviews } = require('../../../data/reviews')

const app = Fastify()

const typeDefs = `
  type Review @key(fields: "id") {
    id: ID!
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String @external
    reviews: [Review]
    numberOfReviews: Int
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Review: {
    author: (review) => {
      return { __typename: "User", id: review.authorID };
    }
  },
  User: {
    reviews: (user) => {
      return reviews.filter(review => review.authorID === user.id);
    },
    numberOfReviews: (user) => {
      return reviews.filter(review => review.authorID === user.id).length;
    },
    username: (user) => {
      const found = usernames.find(username => username.id === user.id);
      return found ? found.username : null;
    }
  },
  Product: {
    reviews: (product) => {
      return reviews.filter(review => review.product.upc === product.upc);
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

app.listen(3002)

