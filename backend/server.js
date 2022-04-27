import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Productrouter from './routes/ProdctRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
//All products
app.use('/api/products',Productrouter);
app.use('/api/users',userRouter)
app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

if(process.env.mode === 'production')
{
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}
const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server Running on ${port} in ${process.env.mode} mode`));