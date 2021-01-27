import express from "express";
const app = express();
import { appController } from "../controllers/AppController";


app.get("/stats", (req, res) => {
  res.send('hujdfgas');
});

app.get("/status", (req, res) => {
  res.send('hujdfgas');
});
