const Fastify = require('fastify')
const GQL = require('fastify-gql')
const { users } = require('../../../data/accounts')

const app = Fastify()

const typeDefs = `
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
    friends: [User]
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return users[0];
    }
  },
  User: {
    friends: (user) => {
      return users.filter(u => u.id !== user.id)
    }
  }
};

const loaders = {
  User: {
    __resolveReference: {
      async loader (query, { reply }) {
        return query.map(({ obj }) => users.find(user => user.id === obj.id))
      },
      opts: {
        cache: true
      }
    }
  }
}

app.register(GQL, {
  schema: typeDefs,
  resolvers,
  federationMetadata: true,
  loaders,
  graphiql: true,
  jit: 1
})

app.listen(3001)
