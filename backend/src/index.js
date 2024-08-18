import express from "express";
import { ConnectDb } from "./db/db.js";
import registerUser  from "./routes/UserRoutes.js";
import dishRoutes from "./routes/DishesRoutes.js"
import cors from "cors"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import 'dotenv/config';

const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description: "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Ensure this path matches your route files
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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