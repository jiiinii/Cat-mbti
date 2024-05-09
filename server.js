const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다`));
require("dotenv").config({ path: "variable.env" });

app.use(bodyParser.urlencoded({extended: true}))

const MONGODB_URL =
  "mongodb+srv://jiiinhuiii0104:niD4HQXWphfczZOl@cluster0.cnekfui.mongodb.net/";

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Successfully connect."))
  .catch((e) => console.log(e));

// API 라우트 생성
const Item = require("./src/Models/Item");

app.get("/api/items", async (req, res) => {
  console.log(`server.js >>>`);
  try {
    const items = await Item.find();
    res.json("text text text");
    console.log(`server.js items>>>`, items);
  } catch (error) {
    console.log(error);
    res.status(500).send("서버 오류");
  }
});

app.post("/api/items", async (req, res) => {
  console.log("Content-Type", req.headers["content-type"]);
  console.log("req.body", req.body);

  res.send(req.body);
});
