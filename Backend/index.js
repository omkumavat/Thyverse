import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./Database/MongoDBConnect.js";
import UserRoute from './Routes/UserRoute.js'
import DashBoardUserRoute from './Routes/DashBoardUserRoute.js'

const app = express();
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing these methods
    allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use('/server/user',UserRoute);
app.use('/server/dashuser',DashBoardUserRoute)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(4000, () => {
    console.log("app is listening on port 4000");
});
