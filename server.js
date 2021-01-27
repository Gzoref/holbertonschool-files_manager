import express from "express";
const app = express();
import { index } from "./routes/index";

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send(`Server running on port ${port}`);
});


app.listen(port);