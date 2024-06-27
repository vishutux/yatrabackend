import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { requestResponseLogger } from "./utils/logger"; // Importing the logging middleware

const app = express();
const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: "*",
  allowedHeaders: "*",
  credentials: true,
  preflightContinue: false,
};

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(requestResponseLogger);

app.use(cors(options));
app.use("/api", userRoutes);

export default app;
