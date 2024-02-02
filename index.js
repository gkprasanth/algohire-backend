 
import express from "express"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import router from "./routes/api.js";
import cors from 'cors'


import helmet from "helmet";
import morgan from "morgan";
const app = express();
 
dotenv.config();

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
}));

app.use('/api', router)



 
mongoose.connect(process.env.MONGO_URI);

// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Your code here
});




cloudinary.config({
  cloud_name: 'algohire',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


//multer setup
const storage = multer.memoryStorage();
const upload = multer({storage: storage})


app.listen(5000, ()=>{
    console.log("Server started..")
})
