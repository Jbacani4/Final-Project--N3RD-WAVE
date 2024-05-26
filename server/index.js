const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { nA, errHandler } = require('./errors/errorHandlers');
const userRoutes = require('./routes/userRoutes');
const postsRoutes = require('./routes/postsRoutes');

dotenv.config();
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({ credentials: true, origin: "https://n3rdwave.vercel.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, Romy here.');
});

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('n3rd-wave');
    app.locals.db = db;

    app.use('/api/users', userRoutes);
    app.use('/api/posts', postsRoutes);

    app.use(nA);
    app.use(errHandler);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });