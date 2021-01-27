import express from "express";
const app = express();
import index from "./routes/index";

const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
