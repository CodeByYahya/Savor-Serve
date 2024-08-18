import express from "express";
import { ConnectDb } from "./db/db.js";
import registerUser  from "./routes/UserRoutes.js";
import dishRoutes from "./routes/DishesRoutes.js"
import cors from "cors"
import 'dotenv/config';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }));
app.use(express.json());

ConnectDb(process.env.MONGO_URL)
const port= process.env.PORT;

app.use('/api/dishes', dishRoutes);
app.use('/api/users', registerUser);

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})