const express = require('express');
const OngController = require('./controllers/ongController');
const IncidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/profileController');
const SessionController = require('./controllers/sessionController');
const routes = express.Router();

/*
 GET: buscar info
 POST: Criar info
 PUT: alterando info
 DELETE: Removendo info
*/

/**
 * Tipos de parâmetros:
 * 
 * Query Params: usado para filtros, paginação, etc. São parâmetros nomeados enviados na rota após "?"
 *      /users?name=edmundo&idade=21
 *  acesso-> request.query
 * 
 * Route Params: Parãmetros utilizados para identificar recursos
 * /users/:id
 *  acesso-> request.params
 * 
 * Request Body: Corpo da requisição usado para criar e aterar recursos
 *  acesso-> request.body
 * 
 */


routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/sessions', SessionController.create);

module.exports = routes;