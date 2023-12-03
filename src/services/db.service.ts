import { connect } from "mongoose";
import defaultConfig from "../config/default.config";

const connectDB = () => {
  return connect(defaultConfig.mongodb.uri);
};

export default connectDB;
