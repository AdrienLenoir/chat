import express from "express"
import bodyParser from "body-parser"
import router from "./router/router.mjs"
import dotenv from 'dotenv'
import errorController from "./controllers/error.controller.mjs";

const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.get('*', errorController.error404)

app.listen(process.env.APP_PORT, () => {
  console.log(`App listening on http://127.0.0.1:${process.env.APP_PORT}`)
})
