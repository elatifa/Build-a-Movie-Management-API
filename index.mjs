import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/conn.mjs'
import users from './routes/users.mjs';
import movie from './routes/movie.mjs';


dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API.');
});

app.use('/api/users', users);
app.use('/api/movies', movie);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'MongoError') {

    return res.status(500).json({ message: 'MongoDB Error', error: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
});

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
})();