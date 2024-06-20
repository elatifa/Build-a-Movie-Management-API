import express from 'express';
import { ObjectId } from 'mongodb';
import connectDb from '../db/conn.mjs';



const router = express.Router();

(async () => {
  const db = await connectDb();



  router.get('/', async (req, res) => {
    try {
      const users = await db.collection('users').find().toArray();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;