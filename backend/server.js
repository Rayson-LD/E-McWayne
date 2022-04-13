import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Productrouter from './routes/ProdctRoutes.js';

const app = express();
dotenv.config();
connectDB();
//All products
app.use('/api/products',Productrouter);
const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server Running on ${port} in ${process.env.mode} mode`));