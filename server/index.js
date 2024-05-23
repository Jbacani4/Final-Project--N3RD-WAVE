const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { nA, errHandler } = require('./errors/errorHandlers');
const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Romy here.');
});

// Use the route handlers
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

// Middleware for handling not found routes
app.use(nA);

// Middleware for handling errors
app.use(errHandler);

// Connect to MongoDB and then start the server
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');

    // Store the database instance in the app.locals
    const db = client.db('n3rd-wave');
    app.locals.db = db;

    // Start the server only after a successful database connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit the process with a failure code
  });
