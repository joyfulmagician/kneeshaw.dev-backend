import { connect } from "mongoose";

const connectDB = () => {
  return connect(process.env.MONGODB_URI ?? "");
};

export default connectDB;
