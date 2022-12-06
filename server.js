const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();
const path = require("path");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const corsOptions = {
    origin: '*',
    methods: ['GET','POST',],
    allowedHeaders: ['Content-Type'],
  }
app.use(cors(corsOptions))

// constants
const DB_PATH = path.resolve("db.json");
const PORT = process.env.PORT
// middlewares
app.use(express.json());
// routes
app.get("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let values = JSON.parse(jsonString);
    res.status(200)
    res.json({
      totalValues: values.length,
      values,
    });
  });
});
app.post("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let body = req.body;
    let dt = new Date()
    let date = dt.getDate() +"/"+ dt.getMonth() +"/"+ dt.getFullYear()
    let time = dt.getHours() +":"+ dt.getMinutes() +":"+ dt.getSeconds()
    console.log(req.body)
    let valuesArr = JSON.parse(jsonString);
    let obj = {
      weight: body.weight,
      timestamp: date+" "+time 
    };
    valuesArr.push(obj);
    fs.writeFile(DB_PATH, JSON.stringify(valuesArr), (err) => {
      if (err) return console.log("Error in updating db");
      res.status(200).json({
        message: "Values saved",
        value: valuesArr[valuesArr.length - 1],
      });
    });
  });
});
app.listen(PORT, () => console.log("Listening on port", PORT));