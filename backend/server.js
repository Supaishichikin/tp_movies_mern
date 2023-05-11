const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 8030;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'movie_database';
const collectionName = 'movies';
const cors = require('cors');
const corsOptions = {origin: 'http://localhost:3000'}

app.use(cors(corsOptions))

app.use(bodyParser.json());


async function connectDB() {
  const client = await MongoClient.connect(mongoUrl);
  return client.db(dbName).collection(collectionName);
}

app.post('/movies', async (req, res) => {
  try {
    const collection = await connectDB();
    const result = await collection.insertOne(req.body);
    res.json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const collection = await connectDB();
    const movies = await collection.find().toArray();
    console.log(movies)
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const collection = await connectDB();
    const movie = await collection.findOne({ _id: ObjectId(req.params.id) });
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});


app.put('/movies/:id', async (req, res) => {
  try {
    const collection = await connectDB();
    const result = await collection.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json({ message: 'Movie updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
});


app.delete('/movies/:id', async (req, res) => {
  try {
    const collection = await connectDB();
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});


app.get('/movies/search', async (req, res) => {
  try {
    const collection = await connectDB();
    const searchTerm = req.query.title;
    const movies = await collection.find({ title: { $regex: searchTerm, $options: 'i' } }).toArray();
    res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});
    

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});
