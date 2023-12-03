import dotenv from "dotenv";

dotenv.config();

const defaultConfig = {
  app: {
    origin: "http://localhost:3000",
    port: Number(process.env.PORT) || 5000
  },

  bcrypt: {
    salt: Number(process.env.BCRYPT_SALT) || 10
  },

  jwt: {
    secret:
      process.env.JWT_SECRET ||
      "+rxh72KfR/Ocl8HEEwEWcsLL35fct04RXzGxLwTQkB1DPcaPKU0vcJfSe5KQsyo8JZ29JVlXSA6xkFdK"
  },

  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/kneeshaw"
  }
};

export default defaultConfig;
