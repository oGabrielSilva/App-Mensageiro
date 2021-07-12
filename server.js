require('dotenv').config()
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTSTRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false }).then(() => {
        app.emit('connect')
    }).catch(e => console.log('------------ Deu erro => ', e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/global')

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionConfig = session({
    secret: 'Mensageiro',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionConfig)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
app.use(middlewareGlobal)
app.use(csrfMiddleware)
app.use(checkCsrfError)
app.use(routes)

//Socket io
const Message = require('./src/models/Message')
const messageError = { nick: 'Error', message: 'Algo deu errado' }
const rooms = [];

io.on("connection", socket => {
    socket.join('off topic')
    socket.broadcast.to('off topic').emit('newMsg', { nick: '', message: 'Algum ser se conectou.' })
    socket.on('msg', data => {
        const datas = new Message(data)
        if(datas.body.errors.length > 0) return socket.emit('errors', messageError)
        const postman = Message.validRoom(datas.body.room) 
        if(postman.length > 1) return socket.emit('errors', messageError)
        if(postman.length === 0) return socket.emit('create room', { nick: 'Uma mensagem do Dev', message: 'Esta sala não existe, dejesa criar?' })
        socket.broadcast.to(postman[0]).emit('newMsg', datas.body)
    })
})

app.on('connect', () => {
    http.listen(3000, () => {
        console.log('Servidor online.', 'http://127.0.0.1:3000')
    })
})
