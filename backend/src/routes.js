const { Router } = require('express');
const { getVersion, getHomeMessage } = require('./controllers/OmnistackController');
const DevController = require('./controllers/DevController');


var packageJson = require('../package.json');

const routes = Router();

routes.get('/version', getVersion);

routes.get('/', getHomeMessage);

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/devs/search', DevController.search);

module.exports = routes;