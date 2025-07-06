import mongoose from 'mongoose';

const connectDB = async () => {
 try {

    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
