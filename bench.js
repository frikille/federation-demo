const autocannon = require('autocannon')
const compare = require('autocannon-compare')

const complexQuery = `
query mainQuery {
  me {
    id
    name
    username
    reviews {
      id
      body
      author {
        id
        name
        username
        numberOfReviews
        id
      }
      product {
        upc
        name
        price
        weight
        reviews {
          id
          body
          author {
            id
            name
            numberOfReviews
            
          }
        }
        inStock
        shippingEstimate
      }
    }
    numberOfReviews
  }
  topProducts {
    upc
    name
    reviews {
      id
      author {
        id
        name
        numberOfReviews
      }
    }
  }
}`

const simpleQuery = `
query mainQuery {
  me {
    id
    name
    username
    numberOfReviews
    reviews {
      id
      body
      product {
        upc
        name
        price
        weight
        inStock
        shippingEstimate
      }
    }
  }
  topProducts {
    upc
    name
    reviews {
      id
      author {
        id
        name
        numberOfReviews
      }
    }
  }
}
`

const baseOpts = {
  connections: 5,
  pipelining: 1,
  duration: 5,
  headers: {
    'content-type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    query: complexQuery
  })
}

async function runBenchmarks() {
  const fastifyResults = await autocannon({
    url: 'http://localhost:3000/graphql',
    ...baseOpts
    
  })

  // console.log(fastifyResults)
  
  const apolloResults = await autocannon({
    url: 'http://localhost:4000/graphql',
    ...baseOpts
    
  })

  // console.log(apolloResults)

  console.log(compare(fastifyResults, apolloResults))

  const averages = {
    reqPerSec: [fastifyResults.requests.average, apolloResults.requests.average],
    latency: [fastifyResults.latency.average, apolloResults.latency.average],
    throughput: [fastifyResults.throughput.average, apolloResults.throughput.average]
  }

  console.log(averages)
}

runBenchmarks()