const express = require('express');
const db = require('./config/connection');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

//import apollo server
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');



const app = express();
const PORT = process.env.PORT || 3030;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
