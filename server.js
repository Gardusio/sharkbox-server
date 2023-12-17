import { app, port } from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'sharkbox'
    });

    app.listen(port, () => {
      console.log(`app listening on port ${port}!`);
    });

  } catch (error) {
    console.log(error);
  }
};

startServer();