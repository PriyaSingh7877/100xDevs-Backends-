import express from "express";
import { NUMBER } from "@repo/common";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
    number: NUMBER
  });
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
  console.log("NUMBER from common:", NUMBER);
});