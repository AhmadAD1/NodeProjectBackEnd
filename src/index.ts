import express, { json } from "express";
import usersRouter from "./routes/users";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { cardsRouter } from "./routes/cards";
import { Logger } from './logs/logger';
import cors from 'cors';
import logger from "./middleware/logger";
configDevEnv();


connect()
Logger.log("DataBase connected with port 8080.")
const app = express();

app.use(json());
app.use(logger);

app.use(cors({ origin: "*" }))
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(express.static("public"))

app.use(errorHandler);
app.use(notFound);

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080")
    console.log(`App is running in ${process.env.NODE_ENV} mode`);
});