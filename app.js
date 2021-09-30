import express from "express"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import router from "./router/router.mjs"
import dotenv from 'dotenv'
import errorController from "./controllers/error.controller.mjs";
import expressLayout from 'express-ejs-layouts'
import { Server } from 'socket.io'
import SocketioController from './controllers/socketio.controller.mjs'

const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressLayout)
app.use(router)

app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.get('*', errorController.error404)

const server = app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on http://127.0.0.1:${process.env.APP_PORT}`)
})

const io = new Server(server)
const socketioController = new SocketioController(io)
io.on('connection', async (socket) => {
  await socketioController.onConnection(socket)

  socket.on("send_message", (data) => socketioController.onSendMessage(socket, data))

})
