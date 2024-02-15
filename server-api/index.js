/** @format */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} successfully!!!!`);
});
