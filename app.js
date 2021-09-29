import express from "express"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import router from "./router/router.mjs"
import dotenv from 'dotenv'
import errorController from "./controllers/error.controller.mjs";
import expressLayout from 'express-ejs-layouts'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"]
  }
})
dotenv.config()

io.on('connection', (socket) => {
  console.log('a user connected');
})

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressLayout)
app.use(router)

app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.get('*', errorController.error404)

app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on http://127.0.0.1:${process.env.APP_PORT}`)
})

