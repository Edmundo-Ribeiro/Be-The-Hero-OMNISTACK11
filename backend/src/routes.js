const express = require('express');
const {Joi, celebrate, Segments} = require('celebrate'); 
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

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.post('/incidents',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.create);

routes.get('/incidents', celebrate({ 
    [Segments.QUERY]: Joi.object().keys( {
        page : Joi.number(),
    }), 
}), IncidentController.index);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/sessions', SessionController.create);

module.exports = routes;