const express = require('express');

const OngController = require('./controlers/OngController')

const connection = require('./database/connection');

const IncidentController = require('./controlers/incidentController');

const ProfileController = require('./controlers/ProfileController');

const SessionController = require('./controlers/SessionController');

const routes = express.Router();

routes.post('/sessions',SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;