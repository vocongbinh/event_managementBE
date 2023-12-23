import express, { Application, Request, Response } from "express";
import serverless from 'serverless-http';
const app: Application = express();
import dotenv from "dotenv";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../src/routes");
dotenv.config();
app.options('*', cors());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/your-endpoint', (req, res) => {
  const token = req.headers.authorization;
  console.log('Token:', token);

  // Your logic here
  res.json({ message: 'Success' });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((db: any) => {
    console.log("Database is connected");
  })
  .catch((err: Error) => {
    console.log(err);
  });

routes(app);
export const handler = serverless(app);