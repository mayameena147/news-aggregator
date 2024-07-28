const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const newsRouter = require("./routes/newsRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/users", userRouter);
app.use("/news", newsRouter);

const connectionString = process.env.CONNECTION_STRING;
const databaseName = process.env.DATABASE_NAME;

mongoose.connect(connectionString + databaseName)
    .then(() => {
        console.log("db connected successfully");
    })
    .catch((error) => {
        console.log("db not connected");
    });

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;