import express from 'express';
// import AppController, { getStats, getStatus } from '../controllers/AppController';
import AppController from '../controllers/AppController';
// const getStats = AppController.getStats(); /* eslint-disable-line no-unused-vars */
// const getStatus = AppController.getStatus(); /* eslint-disable-line no-unused-vars */

import UsersController from '../controllers/UsersController';

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

  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  router.get('/connect', (req, res) => {
    AppController.getConnect(req, res);
  });

  router.get('/disconnect', (req, res) => {
    AppController.getDisconnect(req, res);
  });

  router.get('/users/me', (req, res) => {
    UserController.getMe(req, res);
  });
};

export default routeController;
