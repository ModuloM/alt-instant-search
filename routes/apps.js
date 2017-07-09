const express = require('express');
const router = express.Router();

const apps = require('../services/search.service');
const errorService = require('../services/error.service');

// GET apps
router.get('/:qry', (req, res, next) => {
  apps
    .search(req.param.qry)
    .then(result => {
      console.info('Search success', JSON.stringify(result, null, 2));
      res.status(200).json(result);
    });
});

// POST app
router.post('/', (req, res, next) => {
  const app = req.body.app;
  if (!app || Object.keys(app).length === 0) {
    const errorMessage = 'An app object must be provided';
    console.error(errorMessage);
    errorService.sendError(res, {
      status: 400,
      message: errorMessage
    });
  } else {
    apps
      .addApp(app)
      .then(result => {
        console.info('App is successfully added:', JSON.stringify(result, null, 2));
        res.status(201).json(result);
      })
      .catch(err => {
        console.info('App was not successfully added, error:', JSON.stringify(err, null, 2));
        errorService.sendError(res, err);
      });
  }
});

// DELETE app
router.delete('/:id', (req, res, next) => {
  const appId = req.params.id;
  apps
    .deleteApp(appId)
    .then(result => {
      console.info('App is successfully deleted:', JSON.stringify(result, null, 2));
      res.status(200).json(result);
    })
    .catch(err => {
      console.info('App was not successfully deleted, error:', JSON.stringify(err, null, 2));
      errorService.sendError(res, err);
    });
});

module.exports = router;
