import { MongoClient } from "mongodb";

const connectDB = () => {
  const client: MongoClient = new MongoClient(process.env.MONGODB_URI ?? "");
  return client.connect();
};

export default connectDB;
