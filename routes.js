const express = require('express')
const route = express.Router()
const home = require('./src/controllers/home')
const login = require('./src/controllers/login')
const chat = require('./src/controllers/chat')

const { loginRequired } = require('./src/middlewares/global')

//rotas da home
route.get('/', home.index)

//rotas do login
route.get('/signup', login.index)
route.post('/signup', login.signup)
route.post('/signin', login.signin)
route.get('/out', login.out)

// //rotas internas 
route.get('/chat', loginRequired, chat.index)
route.get('/chat/:id', loginRequired, chat.chatParams)

module.exports = route
