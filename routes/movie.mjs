
import express from 'express';
import { ObjectId } from 'mongodb'; 
import connectDb from '../db/conn.mjs';


const router = express.Router();


router.post('/movies', async (req, res) => {
    try {
     
      const db = await connectDb(); 
      const movieData = req.body;
      const result = await db.collection('movies').insertOne(movieData);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error adding movie' });
    }
  });

  router.get('/movies', async (req, res) => {
    const db = await connectDb();
    const movies = await db.collection('movies').find().toArray();
    res.json(movies);
  });

  router.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    const db = await connectDb();
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
    res.json(movie);

});

 
router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const db = await connectDb();
      const movieData = req.body;
      const result = await db.collection('movies').updateOne({ _id: new ObjectId(id) }, { $set: movieData });
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error updating movie' });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const db = await connectDb();
      const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error deleting movie' });
    }
  });
  
export default router;
  