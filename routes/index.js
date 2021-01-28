import express from 'express';
// import AppController, { getStats, getStatus } from '../controllers/AppController';
import AppController from '../controllers/AppController';

const getStats = AppController.getStats();
const getStatus = AppController.getStatus();

const router = express.Router();

const routeController = (app) => {
  app.use('/', router);

  // App Controller

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });
};

export default routeController;
