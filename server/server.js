// Imports
const express = require('express');
const path = require('path');

// Import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

// Declarations
const PORT = process.env.PORT || 3001;

// Create New Apollo Server and pass in our Schema Data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo Server w/ the GraphQL Schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // Integrate our Apollo Server w/ the Express app. as middleware
  server.applyMiddleware({ app });

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, ',,.client/build/index.html'))
  });

  // Server connection
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);

      // Log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the Async Function to start the Server
startApolloServer(typeDefs, resolvers);
