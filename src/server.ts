require('dotenv').config({path:'../.env'});

import express, {Application} from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {json} from 'body-parser'
import mongoose from 'mongoose'
import { connectDB } from "./config/db.config";
import routes from "./routes"

const app: Application = express();

// Cors configuration
const corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions));

// Parse request of content type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT= process.env.PORT || 5000;
const server=app.listen(
    PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    }
)

process.on("unhandledRejection",(error,promise)=>{
    console.log(`Logged Error: ${error}`);
    server.close(()=>process.exit(1))
})


const errorHandler = require('./middleware/error')

//connect to db
connectDB()

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//ErrorHandler (Should be last piece of middleware)
app.use(errorHandler);


