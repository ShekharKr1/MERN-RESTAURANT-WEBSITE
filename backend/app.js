import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from './error/error.js';
import reservationRouter from "./routes/reservationRoute.js";
import path from 'path';
const app = express();
dotenv.config({ path: "./config/.env" })


app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(errorMiddleware)
app.use("/api/v1/reservation", reservationRouter)
export default app;


//-----------------------------------------Deployement----------------------------------------------

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === "productions") {
    app.use(express.static(path.join(__dirname1, "../frontend/dist")));


    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
    });


} else {
    app.get("/", (req, res) => {
        res.send("API Running Succesfully......")
    })
}


//-----------------------------------------Deployement----------------------------------------------


