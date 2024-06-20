import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || '';

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectDb() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db('sample_mflix'); 
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB Atlas', err);
    throw err;
  }
}

export default connectDb;