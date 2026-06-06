import express from "express";
import productRouter from "./routes/products.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/products", productRouter);

app.use(errorHandler);

export default app;
