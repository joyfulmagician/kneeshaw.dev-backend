import config from "config";
import { connect } from "mongoose";

const connectDB = () => {
  return connect(process.env.MONGODB_URI ?? config.get<string>("mongodb.uri"));
};

export default connectDB;
