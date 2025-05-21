import express from 'express';
import dotenv from 'dotenv';
import {dbConnect} from './config/dbConnect';

dotenv.config();

const app = express();
const port = process.env.PORT;

// DB Connection
dbConnect();

app.listen(port, () =>{
    console.log(`Server is running at port: ${port}`);
});
