const express = require('express')
const routes = express.Router()
const elements = require('./controllers/elements')
const users = require('./controllers/users')

// rotas dos usuários
routes.post('/users/auth/register', users.register)
routes.post('/users/auth/login', users.login)

// rotas dos elementos
routes.post('/element/list', elements.list)
routes.post('/element/save', elements.save)
routes.post('/element/date-filter', elements.dateFilter)
routes.delete('/element/delete/:id_elemento', elements.delete)

module.exports = routes