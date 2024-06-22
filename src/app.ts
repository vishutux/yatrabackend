import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
const app = express();

const allowedOrigins = ["http://localhost:4200"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: "*", 
  allowedHeaders: "*", 
  credentials: true,
  preflightContinue: false, 
};

app.use(cors(options));
app.use(express.json());
app.use("/api", userRoutes);

export default app;
