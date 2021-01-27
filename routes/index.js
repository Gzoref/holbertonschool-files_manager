import express from "express";
import { getStats, getStatus } from "../controllers/AppController";
import AppController from "../controllers/AppController";

const app = express();
const router = express.Router();

function routeController() {
  router.get("/status", getStatus);

  router.get("/stats", getStats);
}

export default routeController;
